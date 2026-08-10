import type { StackItem } from "@/content/stack";

// A plain pill for items with no note; a hover/focus-only custom tooltip
// (not the native `title` attribute) for items that have one — appears only
// while the cursor is on the word, or while it's keyboard-focused.
export function StackTag({ item }: { item: StackItem }) {
  const pill = (
    <span
      className={
        "inline-flex items-center rounded-sm border border-terminal/30 bg-bg px-3 py-1 font-mono text-caption text-terminal outline-none transition-[color,opacity] focus-visible:outline focus-visible:outline-2 focus-visible:outline-terminal focus-visible:outline-offset-2 " +
        (item.muted ? "opacity-40 hover:opacity-100 focus-visible:opacity-100" : "")
      }
    >
      {item.name}
    </span>
  );

  if (!item.note) {
    return <li>{pill}</li>;
  }

  return (
    <li className="group relative inline-flex">
      <span tabIndex={0}>{pill}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[16rem] -translate-x-1/2 rounded-sm border border-border bg-surface px-3 py-2 text-caption text-text-secondary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {item.note}
      </span>
    </li>
  );
}
