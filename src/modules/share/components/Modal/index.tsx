"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ContentModal } from "./ModalContent";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export function Modal({ children, isOpen, onOpenChange }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ContentModal;
