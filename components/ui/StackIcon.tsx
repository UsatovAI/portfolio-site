// Minimal inline stroke icons for the Stack card grid — no icon-library dependency,
// keeps the performance budget clean (design-system.md §1 font/asset discipline).
const commonProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
  "aria-hidden": true,
};

function BackendIcon() {
  return (
    <svg {...commonProps}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <circle cx="7" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MlPythonIcon() {
  return (
    <svg {...commonProps}>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  );
}

function InfraIcon() {
  return (
    <svg {...commonProps}>
      <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a3.5 3.5 0 0 1 .5 6.98A2 2 0 0 1 17 18H7z" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg {...commonProps}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-2-2z" />
    </svg>
  );
}

const icons: Record<string, () => JSX.Element> = {
  backend: BackendIcon,
  "ml-python": MlPythonIcon,
  infrastructure: InfraIcon,
  tools: ToolsIcon,
};

export function StackIcon({ slug }: { slug: string }) {
  const Icon = icons[slug] ?? BackendIcon;
  return <Icon />;
}
