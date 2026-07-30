#!/usr/bin/env python3
"""Generate report.md from research results JSON + fields.yaml."""
import json
import re
from pathlib import Path

import yaml

BASE = Path(__file__).parent
OUTLINE = yaml.safe_load((BASE / "outline.yaml").read_text())
FIELDS = yaml.safe_load((BASE / "fields.yaml").read_text())
RESULTS_DIR = BASE / OUTLINE["execution"]["output_dir"].replace("./", "")

TOC_SUMMARY_FIELDS = ["object_type", "format_genre"]

INTERNAL_KEYS = {"_source_file", "uncertain", "id", "researched_at", "name"}

CATEGORY_MAPPING = {
    "Taxonomy": ["taxonomy"],
    "Basic Info": ["basic_info"],
    "Structure": ["structure"],
    "Design": ["design"],
    "Tech Stack": ["tech_stack"],
    "Content Strategy": ["content_strategy"],
    "Differentiators": ["differentiators"],
    "Contact & CTA": ["contact_cta"],
}


def slugify(text):
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s


def is_uncertain(field_name, value, uncertain_list):
    if field_name in uncertain_list:
        return True
    if value is None or value == "":
        return True
    if isinstance(value, str) and "[uncertain]" in value:
        return True
    return False


def find_field(data, field_name, category_keys):
    if field_name in data:
        return data[field_name]
    for key in category_keys:
        sub = data.get(key)
        if isinstance(sub, dict) and field_name in sub:
            return sub[field_name]
    for v in data.values():
        if isinstance(v, dict) and field_name in v:
            return v[field_name]
    return None


def format_value(value):
    if isinstance(value, list):
        if all(isinstance(x, dict) for x in value) and value:
            lines = []
            for item in value:
                lines.append(" | ".join(f"{k}: {v}" for k, v in item.items()))
            return "\n".join(f"- {line}" for line in lines)
        if len(value) <= 4 and all(isinstance(x, str) and len(x) < 40 for x in value):
            return ", ".join(str(x) for x in value)
        return "\n".join(f"- {x}" for x in value)
    if isinstance(value, dict):
        return "; ".join(f"**{k}**: {v}" for k, v in value.items())
    text = str(value)
    if len(text) > 100:
        return text
    return text


def truncate(text, n=80):
    text = str(text)
    return text if len(text) <= n else text[: n - 1] + "…"


def main():
    items = OUTLINE["items"]
    all_data = []
    for item in items:
        # find matching json file by id
        json_path = RESULTS_DIR / f"{item['id']}.json"
        if not json_path.exists():
            continue
        data = json.loads(json_path.read_text())
        data["_source_file"] = json_path.name
        data["_outline"] = item
        all_data.append(data)

    lines = []
    lines.append(f"# {OUTLINE['topic']}\n")
    lines.append(f"_Generated from {len(all_data)} researched items. Jira: {OUTLINE.get('jira', '')}_\n")

    lines.append("## Table of Contents\n")
    for i, data in enumerate(all_data, 1):
        name = data.get("name", data["_outline"]["name"])
        anchor = slugify(name)
        summary_bits = []
        for f in TOC_SUMMARY_FIELDS:
            val = data.get(f)
            if val and "[uncertain]" not in str(val):
                summary_bits.append(f"{f}: {truncate(val, 60)}")
        summary = " | ".join(summary_bits)
        cohort = data["_outline"].get("cohort", "")
        line = f"{i}. [{name}](#{anchor})"
        if cohort:
            line += f" _{cohort}_"
        if summary:
            line += f" — {summary}"
        lines.append(line)
    lines.append("")

    for data in all_data:
        name = data.get("name", data["_outline"]["name"])
        anchor = slugify(name)
        lines.append(f"## {name}\n")
        lines.append(f"<a id=\"{anchor}\"></a>\n")
        lines.append(f"**URL:** {data['_outline']['url']}  ")
        lines.append(f"**Note:** {data['_outline'].get('note', '')}\n")

        uncertain_list = data.get("uncertain", [])
        used_keys = set()

        for cat in FIELDS.get("field_categories", []):
            cat_name = cat["category"]
            display_name = cat_name.replace("_", " ").title()
            field_lines = []
            for field_def in cat["fields"]:
                fname = field_def["name"]
                value = find_field(data, fname, [cat_name])
                if value is None:
                    continue
                if is_uncertain(fname, value, uncertain_list):
                    continue
                used_keys.add(fname)
                formatted = format_value(value)
                fdisplay = fname.replace("_", " ").title()
                if "\n" in formatted:
                    field_lines.append(f"- **{fdisplay}:**\n{formatted}")
                else:
                    field_lines.append(f"- **{fdisplay}:** {formatted}")
            if field_lines:
                lines.append(f"### {display_name}\n")
                lines.extend(field_lines)
                lines.append("")

        # Other Info: fields in JSON not covered by fields.yaml
        known_field_names = {f["name"] for cat in FIELDS.get("field_categories", []) for f in cat["fields"]}
        extra_lines = []
        for k, v in data.items():
            if k in INTERNAL_KEYS or k in known_field_names or k == "_outline":
                continue
            if is_uncertain(k, v, uncertain_list):
                continue
            formatted = format_value(v)
            fdisplay = k.replace("_", " ").title()
            if "\n" in formatted:
                extra_lines.append(f"- **{fdisplay}:**\n{formatted}")
            else:
                extra_lines.append(f"- **{fdisplay}:** {formatted}")
        if extra_lines:
            lines.append("### Other Info\n")
            lines.extend(extra_lines)
            lines.append("")

        if uncertain_list:
            lines.append("### Uncertain Fields\n")
            for u in uncertain_list:
                lines.append(f"- {u}")
            lines.append("")

        lines.append("---\n")

    report = "\n".join(lines)
    out_path = BASE / "report.md"
    out_path.write_text(report)
    print(f"Wrote {out_path} ({len(report)} chars, {len(all_data)} items)")


if __name__ == "__main__":
    main()
