import { stackCategories } from "@/content/stack";
import type { PortfolioVariant } from "@/content/portfolio-variant";
import { JVM_SECONDARY_TECH } from "@/content/portfolio-variant";
import { StackCard } from "@/components/ui/StackCard";

const JVM_ML_ITEMS = new Set([
  "Python",
  "pandas",
  "NumPy",
  "scikit-learn",
  "XGBoost",
  "Jupyter",
  "FastAPI",
  "pytest",
]);

export function Stack({ variant }: { variant: PortfolioVariant }) {
  const shapedCategories =
    variant === "jvm"
      ? stackCategories.map((category) => ({
          ...category,
          items: category.items
            .filter((item) => item.name !== "TypeScript")
            .filter((item) => category.slug !== "ml-python" || JVM_ML_ITEMS.has(item.name))
            .map((item) => ({ ...item, muted: JVM_SECONDARY_TECH.has(item.name) })),
        }))
      : stackCategories;

  const categoryPriority: Record<PortfolioVariant, string[]> = {
    default: ["backend", "ml-python", "infrastructure", "tools"],
    jvm: ["backend", "infrastructure", "tools", "ml-python"],
    backend: ["backend", "infrastructure", "tools", "ml-python"],
    ml: ["ml-python", "backend", "infrastructure", "tools"],
    devops: ["backend", "ml-python", "infrastructure", "tools"],
  };
  const categories = [...shapedCategories].sort(
    (a, b) => categoryPriority[variant].indexOf(a.slug) - categoryPriority[variant].indexOf(b.slug)
  );

  const descriptions: Partial<Record<PortfolioVariant, string>> = {
    backend: "Backend-first профиль: языки, API, базы данных и инфраструктура показаны раньше ML-инструментов.",
    ml: "ML-first профиль: Python, данные и модели показаны раньше backend- и инфраструктурного стека.",
  };

  return (
    <section id="stack" aria-labelledby="stack-heading" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="stack-heading" className="text-h2 text-text-primary">
          Стек
        </h2>
        {descriptions[variant] ? (
          <p className="mt-2 max-w-2xl text-body text-text-secondary">{descriptions[variant]}</p>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {categories.map((category) => (
            <StackCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
