// Terminal-motif Stack category header — a shell comment line, e.g. `# backend`.
// Spec: docs/design-system.md §4 "Stack category header".
export function StackCategoryHeader({ label }: { label: string }) {
  return (
    <h3 className="border-b border-border pb-2 font-mono text-h3">
      <span className="text-terminal">#</span> <span className="text-text-primary">{label}</span>
    </h3>
  );
}
