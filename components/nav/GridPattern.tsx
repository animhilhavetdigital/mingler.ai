import React from "react";

export function GridPattern({ className }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full stroke-neutral-900/[0.04] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] ${className || ""}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="nav-grid-pattern"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          x="-1"
          y="-1"
        >
          <path d="M.5 20V.5H20" fill="none" strokeDasharray="0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#nav-grid-pattern)" />
    </svg>
  );
}
