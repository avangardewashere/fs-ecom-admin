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
import { Image, Product } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

interface ProductFormProps {
  initialData?:
    | (Product & {
        images: Image[];
      })
    | null;
}

type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Product" : "Create Product";

  const description = initialData
    ? "Edit existing Product"
    : "Create a new Product";

  const toastMessage = initialData
    ? "Product Update successfully"
    : "Product create successfully";

  const actionMessage = initialData ? "Save Changes" : "Add New Product";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeId}/products`);
    } catch (error) {
      console.log(error);
      toast.error("[Products Form]: encountered an error");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/stores/${params.storeId}/products/${params.productId}`
      );
      router.refresh();
      router.push("/");

      toast.success("products has been deleted");
    } catch (error) {
      toast.error(
        "Make sure you remove all categories using this products first."
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
        <span>Product Form</span>
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
            name="images"
            render={({ field }) => {
              // console.log("Rendering FormField for imageUrl:", field);
              return (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) => {
                        field.onChange([...field.value, { url }]);
                      }}
                      onRemove={(url) => {
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ]);
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
              name="name"
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

export default ProductForm;
