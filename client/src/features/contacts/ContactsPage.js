import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ToastStack } from "../../components/ToastStack";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useContactsQuery, useCreateContactMutation, useDeleteContactMutation, } from "../../hooks/useContacts";
import { AddContactModal } from "./AddContactModal";
import { DeleteContactDialog } from "./DeleteContactDialog";
const PAGE_SIZE = 8;
const formatDate = (value) => {
    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
const getInitials = (name) => {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
};
const getErrorMessage = (error) => {
    if (error instanceof AxiosError) {
        return error.response?.data?.message ?? error.message;
    }
    return "Something went wrong";
};
const TableSkeleton = () => {
    return (_jsx("div", { className: "p-4", children: _jsx("div", { className: "grid gap-3", children: Array.from({ length: 6 }).map((_, index) => (_jsx("div", { className: "h-12 animate-pulse rounded-xl bg-surf-200" }, index))) }) }));
};
export const ContactsPage = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const [toasts, setToasts] = useState([]);
    const [contactToDelete, setContactToDelete] = useState(null);
    const debouncedSearch = useDebouncedValue(searchInput.trim(), 450);
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);
    const params = useMemo(() => ({
        search: debouncedSearch,
        page,
        pageSize: PAGE_SIZE,
    }), [debouncedSearch, page]);
    const contactsQuery = useContactsQuery(params);
    const addMutation = useCreateContactMutation();
    const deleteMutation = useDeleteContactMutation();
    const addToast = (toast) => {
        const id = Date.now() + Math.round(Math.random() * 1000);
        setToasts((current) => [...current, { ...toast, id }]);
        window.setTimeout(() => {
            setToasts((current) => current.filter((item) => item.id !== id));
        }, 3500);
    };
    const removeToast = (id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    };
    const handleAddContact = async (values) => {
        try {
            await addMutation.mutateAsync(values);
            addToast({
                tone: "success",
                title: "Contact saved",
                message: `${values.name} has been added to your list.`,
            });
            setAddModalOpen(false);
        }
        catch (error) {
            addToast({
                tone: "error",
                title: "Could not save contact",
                message: getErrorMessage(error),
            });
        }
    };
    const handleConfirmDelete = async () => {
        if (!contactToDelete)
            return;
        try {
            await deleteMutation.mutateAsync(contactToDelete.id);
            addToast({
                tone: "success",
                title: "Contact deleted",
                message: `${contactToDelete.name} has been removed.`,
            });
            setContactToDelete(null);
        }
        catch (error) {
            addToast({
                tone: "error",
                title: "Delete failed",
                message: getErrorMessage(error),
            });
        }
    };
    const response = contactsQuery.data;
    const contacts = response?.items ?? [];
    const meta = response?.meta;
    const hasPrevious = Boolean(meta && meta.page > 1);
    const hasNext = Boolean(meta && meta.page < meta.totalPages);
    const total = meta?.total ?? 0;
    const currentPage = meta?.page ?? page;
    const pageSize = meta?.pageSize ?? PAGE_SIZE;
    const firstVisible = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const lastVisible = total === 0 ? 0 : Math.min(currentPage * pageSize, total);
    return (_jsxs(_Fragment, { children: [_jsx("main", { className: "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6", children: _jsx("section", { className: "animate-riseIn overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5 shadow-panel backdrop-blur-md sm:p-8", children: _jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("header", { className: "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "mb-2 inline-flex rounded-full bg-aqua-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900", children: "Contact Management" }), _jsx("h1", { className: "font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl", children: "Saved Contacts" }), _jsx("p", { className: "mt-2 max-w-2xl text-sm text-ink-700 sm:text-base", children: "Keep your network organized with quick search, clean records, and fast edits." })] }), _jsx(Button, { variant: "secondary", className: "h-11 rounded-xl px-5", onClick: () => setAddModalOpen(true), children: "Add Contact" })] }), _jsxs("div", { className: "rounded-2xl border border-aqua-200 bg-gradient-to-r from-aqua-100/80 to-white p-4", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.1em] text-ink-700", children: "Total Contacts" }), _jsx("p", { className: "mt-1 font-display text-2xl font-semibold text-ink-950", children: contactsQuery.isLoading ? "..." : total })] }), _jsx("div", { className: "grid gap-3", children: _jsxs("div", { className: "relative", children: [_jsx("svg", { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/70", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: "M14.167 14.167L18 18M16.333 9.167a7.167 7.167 0 11-14.334 0 7.167 7.167 0 0114.334 0z", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }) }), _jsx(Input, { value: searchInput, onChange: (event) => setSearchInput(event.target.value), placeholder: "Search by name or company", className: "h-11 pl-10 pr-20" }), searchInput ? (_jsx("button", { type: "button", className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-ink-700 hover:bg-surf-200", onClick: () => setSearchInput(""), children: "Clear" })) : null] }) }), contactsQuery.isError ? (_jsx("div", { className: "rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: getErrorMessage(contactsQuery.error) })) : null, _jsxs("div", { className: "overflow-hidden rounded-2xl border border-surf-300 bg-white shadow-card", children: [contactsQuery.isLoading ? (_jsx(TableSkeleton, {})) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "hidden overflow-x-auto md:block", children: _jsxs("table", { className: "min-w-full text-left text-sm", children: [_jsx("thead", { className: "bg-surf-200 text-ink-900", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 font-semibold", children: "Name" }), _jsx("th", { className: "px-4 py-3 font-semibold", children: "Company" }), _jsx("th", { className: "px-4 py-3 font-semibold", children: "Email" }), _jsx("th", { className: "px-4 py-3 font-semibold", children: "Phone" }), _jsx("th", { className: "px-4 py-3 font-semibold", children: "Created" }), _jsx("th", { className: "px-4 py-3 font-semibold", children: "Actions" })] }) }), _jsx("tbody", { children: contacts.map((contact) => (_jsxs("tr", { className: "border-t border-surf-300 transition hover:bg-surf-100/70", children: [_jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded-full border border-aqua-300 bg-gradient-to-br from-aqua-100 to-aqua-300 text-xs font-semibold text-ink-950", children: getInitials(contact.name) }), _jsx("p", { className: "font-semibold text-ink-950", children: contact.name })] }) }), _jsx("td", { className: "px-4 py-3 text-ink-700", children: contact.company ? (_jsx("span", { className: "inline-flex rounded-full bg-aqua-100 px-2.5 py-1 text-xs font-semibold text-ink-900", children: contact.company })) : ("-") }), _jsx("td", { className: "px-4 py-3 text-ink-700", children: contact.email ?? "-" }), _jsx("td", { className: "px-4 py-3 text-ink-700", children: contact.phone ?? "-" }), _jsx("td", { className: "px-4 py-3 text-ink-700", children: formatDate(contact.createdAt) }), _jsx("td", { className: "px-4 py-3", children: _jsx(Button, { variant: "danger", className: "px-3 py-2 text-xs", onClick: () => setContactToDelete(contact), children: "Delete" }) })] }, contact.id))) })] }) }), _jsx("div", { className: "grid gap-3 p-3 md:hidden", children: contacts.map((contact) => (_jsxs("article", { className: "rounded-xl border border-surf-300 bg-white p-4 shadow-sm", children: [_jsxs("div", { className: "mb-3 flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-aqua-300 bg-gradient-to-br from-aqua-100 to-aqua-300 text-xs font-semibold text-ink-950", children: getInitials(contact.name) }), _jsxs("div", { children: [_jsx("p", { className: "text-base font-semibold text-ink-950", children: contact.name }), _jsx("p", { className: "text-xs text-ink-700", children: contact.company ?? "No company" })] })] }), _jsx(Button, { variant: "danger", className: "px-2 py-1.5 text-xs", onClick: () => setContactToDelete(contact), children: "Delete" })] }), _jsxs("div", { className: "grid gap-1 text-sm text-ink-700", children: [_jsxs("p", { children: ["Email: ", contact.email ?? "-"] }), _jsxs("p", { children: ["Phone: ", contact.phone ?? "-"] })] }), _jsxs("p", { className: "mt-2 text-xs font-medium text-ink-700/90", children: ["Added on ", formatDate(contact.createdAt)] })] }, contact.id))) })] })), !contactsQuery.isLoading && contacts.length === 0 ? (_jsxs("div", { className: "border-t border-surf-300 p-10 text-center", children: [_jsx("p", { className: "font-display text-lg font-semibold text-ink-900", children: "No contacts found" }), _jsx("p", { className: "mt-1 text-sm text-ink-700", children: "Try a different search or add a new contact to get started." }), _jsx(Button, { variant: "secondary", className: "mt-4", onClick: () => setAddModalOpen(true), children: "Add your first contact" })] })) : null] }), _jsxs("div", { className: "flex flex-col items-start justify-between gap-3 rounded-xl border border-surf-300 bg-white p-3 sm:flex-row sm:items-center", children: [_jsx("p", { className: "text-sm text-ink-700", children: total === 0 ? "No contacts yet" : `Showing ${firstVisible}-${lastVisible} of ${total}` }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", disabled: !hasPrevious || contactsQuery.isFetching || total === 0, onClick: () => setPage((current) => Math.max(1, current - 1)), children: "Previous" }), _jsx(Button, { variant: "ghost", disabled: !hasNext || contactsQuery.isFetching || total === 0, onClick: () => setPage((current) => current + 1), children: "Next" })] })] })] }) }) }), _jsx(AddContactModal, { isOpen: isAddModalOpen, onClose: () => setAddModalOpen(false), onSubmit: handleAddContact, isSubmitting: addMutation.isPending }), _jsx(DeleteContactDialog, { isOpen: Boolean(contactToDelete), contactName: contactToDelete?.name, onClose: () => setContactToDelete(null), onConfirm: handleConfirmDelete, isDeleting: deleteMutation.isPending }), _jsx(ToastStack, { toasts: toasts, onDismiss: removeToast })] }));
};
