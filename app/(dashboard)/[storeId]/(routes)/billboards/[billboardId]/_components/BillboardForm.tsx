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
import { BillBoard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

interface BillboardFormProps {
  initialData?: BillBoard | null;
}

type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Billboard" : "Create Billboard";

  const description = initialData
    ? "Edit existing Billboard"
    : "Create a new Billboard";

  const toastMessage = initialData
    ? "Billboard Update successfully"
    : "Billboard create successfully";

  const actionMessage = initialData ? "Save Changes" : "Add New Billboard";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeId}/billboards`);
    } catch (error) {
      console.log(error);
      toast.error("[Billboard Form]: encountered an error");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/stores/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push("/");

      toast.success("Billboard has been deleted");
    } catch (error) {
      toast.error(
        "Make sure you remove all categories using this billboard first."
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
          <FormField
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
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Billboard label"
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

export default BillboardForm;
