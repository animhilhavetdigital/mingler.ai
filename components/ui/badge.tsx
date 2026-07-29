import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-[#ff4b0b] text-white hover:bg-[#a62800]",
    secondary: "border-transparent bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
    outline: "text-neutral-300 border-neutral-700",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}

export { Badge };
