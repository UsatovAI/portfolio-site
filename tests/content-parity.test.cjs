const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function loadContentModule(relativePath) {
  const filename = path.join(process.cwd(), relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  });
  const module = { exports: {} };
  const evaluate = new Function("module", "exports", "require", outputText);
  evaluate(module, module.exports, require);
  return module.exports;
}

const { experience } = loadContentModule("content/experience.ts");
const { experienceEn } = loadContentModule("content/en/experience.ts");
const { projects } = loadContentModule("content/projects.ts");
const { projectsEn } = loadContentModule("content/en/projects.ts");
const { stackCategories } = loadContentModule("content/stack.ts");
const { stackCategoriesEn } = loadContentModule("content/en/stack.ts");

test("RU and EN experience sections expose the same employment entries", () => {
  const expectedSlugs = ["yandex-ads", "t-bank", "riid"];

  assert.deepEqual(experience.map(({ slug }) => slug), expectedSlugs);
  assert.deepEqual(experienceEn.map(({ slug }) => slug), expectedSlugs);
});

test("RU and EN project sections expose the same portfolio entries", () => {
  const expectedSlugs = [
    "moscollector",
    "scanovich-webui",
    "prassign",
    "timetamer",
    "population-forecast",
    "voevoda",
    "ansible-deploy",
  ];

  assert.deepEqual(projects.map(({ slug }) => slug), expectedSlugs);
  assert.deepEqual(projectsEn.map(({ slug }) => slug), expectedSlugs);
});

test("Moscollector project has the same complete media set in RU and EN", () => {
  const expectedMedia = [
    ["video", "/projects/moscollector/demo.mp4"],
    ["image", "/projects/moscollector/analytics-dashboard.webp"],
    ["image", "/projects/moscollector/high-risk-incidents.webp"],
    ["image", "/projects/moscollector/technician-tree.webp"],
    ["image", "/projects/moscollector/technician-equipment.webp"],
    ["image", "/projects/moscollector/admin-settings.webp"],
    ["image", "/projects/moscollector/admin-audit.webp"],
  ];

  for (const entries of [projects, projectsEn]) {
    const project = entries.find(({ slug }) => slug === "moscollector");
    assert.ok(project, "Moscollector must be present in Projects");
    assert.deepEqual(
      project.media.map(({ type, src }) => [type, src]),
      expectedMedia,
    );
  }
});

test("RU and EN stack sections expose the same technologies", () => {
  const namesByCategory = (categories) =>
    Object.fromEntries(
      categories.map(({ slug, items }) => [slug, items.map(({ name }) => name)]),
    );

  assert.deepEqual(namesByCategory(stackCategories), namesByCategory(stackCategoriesEn));
});
