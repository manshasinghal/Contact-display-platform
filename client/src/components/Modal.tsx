import type { PropsWithChildren, ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  footer?: ReactNode;
}

export const Modal = ({
  title,
  subtitle,
  isOpen,
  onClose,
  footer,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg animate-riseIn rounded-2xl border border-white/70 bg-white p-6 shadow-panel">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink-950">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-ink-700">{subtitle}</p> : null}
          </div>
          <Button variant="ghost" onClick={onClose} className="h-9 w-9 rounded-full p-0">
            x
          </Button>
        </div>

        <div>{children}</div>

        {footer ? <div className="mt-5 border-t border-surf-300 pt-4">{footer}</div> : null}
      </div>
    </div>
  );
};
