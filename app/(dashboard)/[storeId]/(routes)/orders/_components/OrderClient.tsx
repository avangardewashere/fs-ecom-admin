"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { OrdersColumn, columns } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/ApiList";
interface OrderClientProps {
  data: OrdersColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage Orders for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/orders/new`);
          }}
        >
          <Plus className="h-4 w-4 ">Add new</Plus>
        </Button>
       Order client
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Orders"></Heading>
      <Separator />
      <ApiList entityIDName="ordersId" entityName="orders" />
    </>
  );
};

export default OrderClient;
