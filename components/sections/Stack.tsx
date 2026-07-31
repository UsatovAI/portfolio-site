import { stackCategories } from "@/content/stack";
import { StackCategoryHeader } from "@/components/ui/StackCategoryHeader";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 id="stack-heading" className="text-h2 text-text-primary">
          Стек
        </h2>
        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          Сгруппировано по направлению, а не единым облаком тегов. Go входит в Backend, а не
          выделен отдельно.
        </p>

        <div className="mt-10 space-y-12">
          {stackCategories.map((category) => (
            <div key={category.slug}>
              <StackCategoryHeader label={category.label} />
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {category.items.map((item) => (
                  <li key={item.name} className="font-mono text-body text-text-primary">
                    {item.name}
                    {item.note ? (
                      <span className="ml-2 font-sans text-caption text-text-secondary">
                        {item.note}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
