"use client";

import * as z from "zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../form";
import { Input } from "../input";
import { Button } from "../button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
    const { isOpen, onClose } = useStoreModal();

    const [loading, setLoading] = useState(false)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  //on submit funciton
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Todo Create Store

    try {
        setLoading(true);
        const response = await axios.post('api/stores',values);
        
        console.log(response.data)
        toast.success("Submission Success")
    } catch (error) {
        console.log('[FORM_SUBMIT]', error);
        toast.error("something went wrong! "+ error as string )
    } finally{
        setLoading(false)
    }
  };


  return (
    <Modal
      title="Create store "
      description="Add a new store"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="e-commerce" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant={"outline"} onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
