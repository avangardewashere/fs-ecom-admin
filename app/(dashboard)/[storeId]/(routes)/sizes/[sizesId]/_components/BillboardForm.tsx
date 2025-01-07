"use client";

import ApiAlert from "@/components/ui/ApiAlert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/ui/modal/alert-modal";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

interface SizesFormProps {
  initialData?: Size | null;
}

type SizesFormValues = z.infer<typeof formSchema>;

const SizesForm: React.FC<SizesFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Sizes" : "Create Sizes";

  const description = initialData
    ? "Edit existing Sizes"
    : "Create a new Sizes";

  const toastMessage = initialData
    ? "Sizes Update successfully"
    : "Sizes create successfully";

  const actionMessage = initialData ? "Save Changes" : "Add New Sizes";

  const form = useForm<SizesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizesId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }

      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeId}/sizes`);
    } catch (error) {
      console.log(error);
      toast.error("[sizes Form]: encountered an error");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/stores/${params.storeId}/sizes/${params.sizesId}`
      );
      router.refresh();
      router.push("/");

      toast.success("Sizes has been deleted");
    } catch (error) {
      toast.error(
        "Make sure you remove all categories using this Sizes first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        <span>Billboard Form</span>
        {initialData && (
          <Button
            variant={"destructive"}
            size="icon"
            disabled={loading}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-4">
          {/* <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => {
              // console.log("Rendering FormField for imageUrl:", field);
              return (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => {
                        console.log(url);
                        field.onChange(url);
                      }}
                      onRemove={() => {
                        field.onChange("");
                      }}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          /> */}
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="sizes label"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className=" my-6" type="submit">
            {actionMessage}
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC-API_URL"
        description={`${origin}/api${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SizesForm;
