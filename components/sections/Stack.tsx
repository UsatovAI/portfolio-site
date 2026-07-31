import { stackCategories } from "@/content/stack";
import { StackCard } from "@/components/ui/StackCard";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="stack-heading" className="text-h2 text-text-primary">
          Стек
        </h2>
        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          Сгруппировано по направлению, а не единым облаком тегов. Go входит в Backend, а не
          выделен отдельно.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stackCategories.map((category) => (
            <StackCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
