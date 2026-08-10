export function AmbientBackground() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <div className="site-backdrop__grid" />
      <div className="site-backdrop__glow site-backdrop__glow--top" />
      <div className="site-backdrop__glow site-backdrop__glow--bottom" />

      <svg
        className="site-backdrop__network"
        viewBox="0 0 1440 960"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="network-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgb(var(--color-terminal))" stopOpacity="0" />
            <stop offset="0.45" stopColor="rgb(var(--color-terminal))" stopOpacity="0.62" />
            <stop offset="1" stopColor="rgb(var(--color-accent))" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="network-node">
            <stop offset="0" stopColor="rgb(var(--color-terminal-bright))" stopOpacity="0.9" />
            <stop offset="1" stopColor="rgb(var(--color-terminal))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="site-backdrop__routes" fill="none" vectorEffect="non-scaling-stroke">
          <path d="M-80 210 C180 90 310 360 530 238 S910 96 1120 220 1410 286 1520 154" />
          <path d="M-40 735 C190 590 365 820 590 685 S940 490 1160 670 1390 792 1510 710" />
          <path d="M250 -70 C155 155 445 280 338 500 S190 780 330 1030" />
          <path d="M1080 -90 C952 128 1218 310 1085 505 S900 760 1055 1035" />
        </g>

        <g className="site-backdrop__nodes">
          <circle cx="198" cy="173" r="28" />
          <circle cx="530" cy="238" r="24" />
          <circle cx="866" cy="133" r="20" />
          <circle cx="1120" cy="220" r="25" />
          <circle cx="338" cy="500" r="22" />
          <circle cx="590" cy="685" r="27" />
          <circle cx="1085" cy="505" r="22" />
          <circle cx="1160" cy="670" r="26" />
        </g>
      </svg>

      <div className="site-backdrop__vignette" />
    </div>
  );
}
