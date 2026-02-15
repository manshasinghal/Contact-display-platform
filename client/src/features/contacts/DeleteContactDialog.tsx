import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

interface DeleteContactDialogProps {
  isOpen: boolean;
  contactName?: string;
  isDeleting: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export const DeleteContactDialog = ({
  isOpen,
  contactName,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteContactDialogProps) => {
  return (
    <Modal
      title="Delete Contact"
      subtitle={`This will permanently remove ${contactName ?? "this contact"}.`}
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      }
    >
      <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        Please confirm to continue. This action cannot be undone.
      </div>
    </Modal>
  );
};
