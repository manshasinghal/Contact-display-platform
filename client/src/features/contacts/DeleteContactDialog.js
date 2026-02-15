import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
export const DeleteContactDialog = ({ isOpen, contactName, isDeleting, onConfirm, onClose, }) => {
    return (_jsx(Modal, { title: "Delete Contact", subtitle: `This will permanently remove ${contactName ?? "this contact"}.`, isOpen: isOpen, onClose: onClose, footer: _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx(Button, { variant: "ghost", onClick: onClose, disabled: isDeleting, children: "Cancel" }), _jsx(Button, { variant: "danger", onClick: onConfirm, disabled: isDeleting, children: isDeleting ? "Deleting..." : "Delete" })] }), children: _jsx("div", { className: "rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700", children: "Please confirm to continue. This action cannot be undone." }) }));
};
