import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./Button";
export const Modal = ({ title, subtitle, isOpen, onClose, footer, children, }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-ink-950/45 p-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg animate-riseIn rounded-2xl border border-white/70 bg-white p-6 shadow-panel", children: [_jsxs("div", { className: "mb-4 flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-display text-xl font-semibold text-ink-950", children: title }), subtitle ? _jsx("p", { className: "mt-1 text-sm text-ink-700", children: subtitle }) : null] }), _jsx(Button, { variant: "ghost", onClick: onClose, className: "h-9 w-9 rounded-full p-0", children: "x" })] }), _jsx("div", { children: children }), footer ? _jsx("div", { className: "mt-5 border-t border-surf-300 pt-4", children: footer }) : null] }) }));
};
