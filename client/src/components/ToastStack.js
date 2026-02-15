import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
export const ToastStack = ({ toasts, onDismiss }) => {
    return (_jsx("div", { className: "pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:right-4 sm:w-full sm:max-w-sm", children: toasts.map((toast) => (_jsx("div", { className: cn("pointer-events-auto animate-riseIn rounded-xl border px-4 py-3 shadow-card", toast.tone === "success"
                ? "border-emerald-400/50 bg-emerald-50"
                : "border-red-400/50 bg-red-50"), children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-ink-950", children: toast.title }), toast.message ? _jsx("p", { className: "mt-1 text-xs text-ink-700", children: toast.message }) : null] }), _jsx("button", { type: "button", className: "rounded-md px-1 text-xs font-medium text-ink-700 transition hover:bg-ink-950/10", onClick: () => onDismiss(toast.id), children: "Close" })] }) }, toast.id))) }));
};
