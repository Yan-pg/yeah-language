"use client";

import { Power } from "@phosphor-icons/react";
import { Modal } from "../Modal";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../Button";

export function LogOutButton() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Modal isOpen={openModal} onOpenChange={(isOpen) => setOpenModal(isOpen)}>
      <Modal.Button asChild>
        <Power size={24} weight="bold" className="text-red-400" />
      </Modal.Button>
      <Modal.Content>
        <div className="flex flex-col items-center w-full gap-4">
          <Image src="/bird.svg" alt="bird" height={120} width={120} />
          <span className="text-center font-bold text-xl text-gray-800">
            Are you sure you want to leave?
          </span>

          <Button onClick={() => setOpenModal(false)} variant="primary">
            Learn more!
          </Button>
          <Button variant="error" typeButton="outline">
            <a href="/api/auth/logout">leave</a>
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
