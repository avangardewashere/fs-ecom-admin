"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoryColumn, columns } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/ApiList";
interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/categories/new`);
          }}
        >
          <Plus className="h-4 w-4 ">Add new</Plus>
        </Button>
        CAtegory client
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories"></Heading>
      <Separator />
      <ApiList entityIDName="categoryId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
