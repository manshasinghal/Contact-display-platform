import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { contactFormSchema, } from "./contact-form.schema";
export const AddContactModal = ({ isOpen, onClose, onSubmit, isSubmitting, }) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            company: "",
        },
    });
    const closeAndReset = () => {
        reset();
        onClose();
    };
    const submit = handleSubmit(async (values) => {
        await onSubmit(values);
        reset();
    });
    return (_jsx(Modal, { title: "Add Contact", subtitle: "Save a new person to your contact list", isOpen: isOpen, onClose: closeAndReset, footer: _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx(Button, { variant: "ghost", onClick: closeAndReset, disabled: isSubmitting, children: "Cancel" }), _jsx(Button, { onClick: submit, disabled: isSubmitting, children: isSubmitting ? "Saving..." : "Save Contact" })] }), children: _jsxs("form", { className: "grid gap-3 sm:grid-cols-2", onSubmit: submit, children: [_jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-700", children: "Name" }), _jsx(Input, { placeholder: "Jane Doe", ...register("name") }), errors.name ? _jsx("p", { className: "mt-1 text-xs text-red-600", children: errors.name.message }) : null] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-700", children: "Email" }), _jsx(Input, { placeholder: "jane@example.com", ...register("email") }), errors.email ? _jsx("p", { className: "mt-1 text-xs text-red-600", children: errors.email.message }) : null] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-700", children: "Phone" }), _jsx(Input, { placeholder: "(555) 123-4567", ...register("phone") }), errors.phone ? _jsx("p", { className: "mt-1 text-xs text-red-600", children: errors.phone.message }) : null] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-700", children: "Company" }), _jsx(Input, { placeholder: "Acme Inc.", ...register("company") }), errors.company ? (_jsx("p", { className: "mt-1 text-xs text-red-600", children: errors.company.message })) : null] })] }) }));
};
