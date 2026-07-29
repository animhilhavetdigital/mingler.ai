import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "brand" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-bold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-98 cursor-pointer";

    const variantStyles = {
      default: "bg-[#090909] text-white hover:bg-[#ff4b0b] hover:shadow-lg hover:shadow-[#ff4b0b]/20",
      brand: "bg-[#ff4b0b] text-white hover:bg-[#a62800] hover:shadow-lg hover:shadow-[#ff4b0b]/30",
      outline: "border border-neutral-300 bg-white text-neutral-800 hover:border-[#ff4b0b] hover:bg-neutral-50 hover:text-[#ff4b0b]",
      ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-[11px]",
      lg: "h-12 rounded-xl px-6 text-sm",
      icon: "h-9 w-9 p-0",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
