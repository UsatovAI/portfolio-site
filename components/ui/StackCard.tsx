import type { StackCategory } from "@/content/stack";
import { StackIcon } from "@/components/ui/StackIcon";
import { StackTag } from "@/components/ui/StackTag";

// Icon-topped card + pill tags — layout pattern adapted from amidat.tech's stack
// section, rebuilt with our own palette/fonts (design-system.md), not their
// orange/serif treatment.
export function StackCard({ category }: { category: StackCategory }) {
  return (
    <div className="selection-card stack-border-card rounded-sm border border-border bg-surface/90 p-6 backdrop-blur-sm">
      <span className="stack-border-runner" aria-hidden="true" />
      <div className="relative z-[2]">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-terminal/30 bg-terminal/10 text-terminal">
          <StackIcon slug={category.slug} />
        </div>
        <h3 className="mt-4 text-h3 text-text-primary">{category.title}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {category.items.map((item) => (
            <StackTag key={item.name} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
