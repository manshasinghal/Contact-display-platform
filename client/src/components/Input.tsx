import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-surf-300 bg-white px-3.5 py-2.5 text-sm text-ink-950 shadow-sm outline-none transition placeholder:text-ink-700/50 focus:border-aqua-400 focus:ring-4 focus:ring-aqua-200/60",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
