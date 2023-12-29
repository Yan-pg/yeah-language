import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Slottable } from "@radix-ui/react-slot";
import { X } from "@phosphor-icons/react/dist/ssr";

interface ContentModalProps {
  title?: string;
  children: ReactNode;
  slotHeader?: JSX.Element;
}

const contentModal = tv({
  slots: {
    overlay: [
      "bg-black opacity-80",
      "transition-opacity data-[state=open]:animate-overlay-show",
      "data-[state=closed]:animate-overlay-hide",
      "fixed inset-0 z-0",
    ],
    content: [
      "data-[state=open]:animate-modal-content",
      "data-[state=closed]:animate-modal-content-out",
      "fixed max-h-[85vh]",
      "top-[50%] bottom-auto left-[50%] right-auto translate-x-[-50%] translate-y-[-50%]",
      "rounded-2xl bg-white p-6",
      "w-[90vw] md:max-w-md",
    ],
  },
});

export function ContentModal({ children }: ContentModalProps) {
  const { overlay, content } = contentModal();

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={overlay()} />
      <Dialog.Content className={content()}>{children}</Dialog.Content>
    </Dialog.Portal>
  );
}
