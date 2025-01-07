"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SizesColumn, columns } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/ApiList";
interface SizesClientProps {
  data: SizesColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage Sizes for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/sizes/new`);
          }}
        >
          <Plus className="h-4 w-4 ">Add new</Plus>
        </Button>
        Sizes Client
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Billboard"></Heading>
      <Separator />
      <ApiList entityIDName="billboardsId" entityName="billboards" />
    </>
  );
};

export default SizesClient;
