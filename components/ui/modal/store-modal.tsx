"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal"

 

export const StoreModal = () => {

    const {isOpen,onClose} = useStoreModal();
   return(
    <Modal title="Create store " description="Add a new store" isOpen={isOpen} onClose={onClose}>
    Future Create store form
</Modal>
   )
}