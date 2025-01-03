"use client"

import * as z from "zod"
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal"
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"

 const formSchema = z.object({
    name:z.string().min(1),

 })

export const StoreModal = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
        }
    })

    //on submit funciton
    const onSubmit =  async(values:z.infer<typeof formSchema>)=>{
        console.log(values)
        // Todo Create Store
    }

    const {isOpen,onClose} = useStoreModal();
   return(
    <Modal title="Create store " description="Add a new store" isOpen={isOpen} onClose={onClose}>
    Future Create store form
</Modal>
   )   
}