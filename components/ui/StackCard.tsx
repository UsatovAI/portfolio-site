import type { StackCategory } from "@/content/stack";
import { StackIcon } from "@/components/ui/StackIcon";

// Icon-topped card + pill tags — layout pattern adapted from amidat.tech's stack
// section, rebuilt with our own palette/fonts (design-system.md), not their
// orange/serif treatment.
export function StackCard({ category }: { category: StackCategory }) {
  return (
    <div className="rounded-sm border border-border bg-surface p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-terminal/30 bg-terminal/10 text-terminal">
        <StackIcon slug={category.slug} />
      </div>
      <h3 className="mt-4 text-h3 text-text-primary">{category.title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {category.items.map((item) => (
          <li key={item.name}>
            <span
              title={item.note}
              className="inline-flex items-center rounded-sm border border-terminal/30 bg-bg px-3 py-1 font-mono text-caption text-terminal"
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
