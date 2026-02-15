import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-ink-950 to-ink-900 text-white shadow-card hover:from-ink-900 hover:to-ink-800 focus-visible:ring-ink-900/30",
  secondary:
    "bg-aqua-300 text-ink-950 shadow-card hover:bg-aqua-400 focus-visible:ring-aqua-400/35",
  danger:
    "bg-red-600 text-white shadow-card hover:bg-red-700 focus-visible:ring-red-500/30",
  ghost:
    "bg-white text-ink-900 hover:bg-surf-200 focus-visible:ring-ink-900/15",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-150 focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
};
