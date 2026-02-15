import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import {
  contactFormSchema,
  type ContactFormValues,
} from "./contact-form.schema";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ContactFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const AddContactModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: AddContactModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
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

  return (
    <Modal
      title="Add Contact"
      subtitle="Save a new person to your contact list"
      isOpen={isOpen}
      onClose={closeAndReset}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={closeAndReset} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Contact"}
          </Button>
        </div>
      }
    >
      <form className="grid gap-3 sm:grid-cols-2" onSubmit={submit}>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-700">
            Name
          </label>
          <Input placeholder="Jane Doe" {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-700">
            Email
          </label>
          <Input placeholder="jane@example.com" {...register("email")} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-700">
            Phone
          </label>
          <Input placeholder="(555) 123-4567" {...register("phone")} />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-ink-700">
            Company
          </label>
          <Input placeholder="Acme Inc." {...register("company")} />
          {errors.company ? (
            <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>
          ) : null}
        </div>
      </form>
    </Modal>
  );
};
