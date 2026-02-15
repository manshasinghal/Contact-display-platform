import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ToastStack, type Toast } from "../../components/ToastStack";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import {
  useContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} from "../../hooks/useContacts";
import type { Contact, CreateContactPayload } from "../../types/contact";
import { AddContactModal } from "./AddContactModal";
import type { ContactFormValues } from "./contact-form.schema";
import { DeleteContactDialog } from "./DeleteContactDialog";

const PAGE_SIZE = 8;

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return (error.response?.data?.message as string | undefined) ?? error.message;
  }
  return "Something went wrong";
};

const TableSkeleton = () => {
  return (
    <div className="p-4">
      <div className="grid gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-12 animate-pulse rounded-xl bg-surf-200" />
        ))}
      </div>
    </div>
  );
};

export const ContactsPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const debouncedSearch = useDebouncedValue(searchInput.trim(), 450);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const params = useMemo(
    () => ({
      search: debouncedSearch,
      page,
      pageSize: PAGE_SIZE,
    }),
    [debouncedSearch, page],
  );

  const contactsQuery = useContactsQuery(params);
  const addMutation = useCreateContactMutation();
  const deleteMutation = useDeleteContactMutation();

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now() + Math.round(Math.random() * 1000);
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const handleAddContact = async (values: ContactFormValues) => {
    try {
      await addMutation.mutateAsync(values as CreateContactPayload);
      addToast({
        tone: "success",
        title: "Contact saved",
        message: `${values.name} has been added to your list.`,
      });
      setAddModalOpen(false);
    } catch (error) {
      addToast({
        tone: "error",
        title: "Could not save contact",
        message: getErrorMessage(error),
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;

    try {
      await deleteMutation.mutateAsync(contactToDelete.id);
      addToast({
        tone: "success",
        title: "Contact deleted",
        message: `${contactToDelete.name} has been removed.`,
      });
      setContactToDelete(null);
    } catch (error) {
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

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <section className="animate-riseIn overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5 shadow-panel backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-aqua-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900">
                  Contact Management
                </p>
                <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
                  Saved Contacts
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-ink-700 sm:text-base">
                  Keep your network organized with quick search, clean records, and fast edits.
                </p>
              </div>

              <Button
                variant="secondary"
                className="h-11 rounded-xl px-5"
                onClick={() => setAddModalOpen(true)}
              >
                Add Contact
              </Button>
            </header>

            <div className="rounded-2xl border border-aqua-200 bg-gradient-to-r from-aqua-100/80 to-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-700">
                Total Contacts
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink-950">
                {contactsQuery.isLoading ? "..." : total}
              </p>
            </div>

            <div className="grid gap-3">
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/70"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14.167 14.167L18 18M16.333 9.167a7.167 7.167 0 11-14.334 0 7.167 7.167 0 0114.334 0z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Input
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search by name or company"
                  className="h-11 pl-10 pr-20"
                />
                {searchInput ? (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-ink-700 hover:bg-surf-200"
                    onClick={() => setSearchInput("")}
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>

            {contactsQuery.isError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {getErrorMessage(contactsQuery.error)}
              </div>
            ) : null}

            <div className="overflow-hidden rounded-2xl border border-surf-300 bg-white shadow-card">
              {contactsQuery.isLoading ? (
                <TableSkeleton />
              ) : (
                <>
                  <div className="hidden overflow-x-auto md:block">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-surf-200 text-ink-900">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Name</th>
                          <th className="px-4 py-3 font-semibold">Company</th>
                          <th className="px-4 py-3 font-semibold">Email</th>
                          <th className="px-4 py-3 font-semibold">Phone</th>
                          <th className="px-4 py-3 font-semibold">Created</th>
                          <th className="px-4 py-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact) => (
                          <tr
                            key={contact.id}
                            className="border-t border-surf-300 transition hover:bg-surf-100/70"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-aqua-300 bg-gradient-to-br from-aqua-100 to-aqua-300 text-xs font-semibold text-ink-950">
                                  {getInitials(contact.name)}
                                </span>
                                <p className="font-semibold text-ink-950">{contact.name}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-ink-700">
                              {contact.company ? (
                                <span className="inline-flex rounded-full bg-aqua-100 px-2.5 py-1 text-xs font-semibold text-ink-900">
                                  {contact.company}
                                </span>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="px-4 py-3 text-ink-700">{contact.email ?? "-"}</td>
                            <td className="px-4 py-3 text-ink-700">{contact.phone ?? "-"}</td>
                            <td className="px-4 py-3 text-ink-700">{formatDate(contact.createdAt)}</td>
                            <td className="px-4 py-3">
                              <Button
                                variant="danger"
                                className="px-3 py-2 text-xs"
                                onClick={() => setContactToDelete(contact)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid gap-3 p-3 md:hidden">
                    {contacts.map((contact) => (
                      <article
                        key={contact.id}
                        className="rounded-xl border border-surf-300 bg-white p-4 shadow-sm"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-aqua-300 bg-gradient-to-br from-aqua-100 to-aqua-300 text-xs font-semibold text-ink-950">
                              {getInitials(contact.name)}
                            </span>
                            <div>
                              <p className="text-base font-semibold text-ink-950">{contact.name}</p>
                              <p className="text-xs text-ink-700">{contact.company ?? "No company"}</p>
                            </div>
                          </div>
                          <Button
                            variant="danger"
                            className="px-2 py-1.5 text-xs"
                            onClick={() => setContactToDelete(contact)}
                          >
                            Delete
                          </Button>
                        </div>
                        <div className="grid gap-1 text-sm text-ink-700">
                          <p>Email: {contact.email ?? "-"}</p>
                          <p>Phone: {contact.phone ?? "-"}</p>
                        </div>
                        <p className="mt-2 text-xs font-medium text-ink-700/90">
                          Added on {formatDate(contact.createdAt)}
                        </p>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {!contactsQuery.isLoading && contacts.length === 0 ? (
                <div className="border-t border-surf-300 p-10 text-center">
                  <p className="font-display text-lg font-semibold text-ink-900">No contacts found</p>
                  <p className="mt-1 text-sm text-ink-700">
                    Try a different search or add a new contact to get started.
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => setAddModalOpen(true)}
                  >
                    Add your first contact
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-surf-300 bg-white p-3 sm:flex-row sm:items-center">
              <p className="text-sm text-ink-700">
                {total === 0 ? "No contacts yet" : `Showing ${firstVisible}-${lastVisible} of ${total}`}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  disabled={!hasPrevious || contactsQuery.isFetching || total === 0}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  disabled={!hasNext || contactsQuery.isFetching || total === 0}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddContact}
        isSubmitting={addMutation.isPending}
      />

      <DeleteContactDialog
        isOpen={Boolean(contactToDelete)}
        contactName={contactToDelete?.name}
        onClose={() => setContactToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />

      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </>
  );
};
