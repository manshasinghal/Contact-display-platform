import { cn } from "../lib/cn";

export interface Toast {
  id: number;
  title: string;
  message?: string;
  tone: "success" | "error";
}

interface ToastStackProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

export const ToastStack = ({ toasts, onDismiss }: ToastStackProps) => {
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:right-4 sm:w-full sm:max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto animate-riseIn rounded-xl border px-4 py-3 shadow-card",
            toast.tone === "success"
              ? "border-emerald-400/50 bg-emerald-50"
              : "border-red-400/50 bg-red-50",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink-950">{toast.title}</p>
              {toast.message ? <p className="mt-1 text-xs text-ink-700">{toast.message}</p> : null}
            </div>
            <button
              type="button"
              className="rounded-md px-1 text-xs font-medium text-ink-700 transition hover:bg-ink-950/10"
              onClick={() => onDismiss(toast.id)}
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
