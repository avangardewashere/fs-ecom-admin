"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
 
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { BillboardColumn } from "./column";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
          }}
        >
          <Plus className="h-4 w-4 ">Add new</Plus>
        </Button>
        Billboard client
      </div>
    </>
  );
};

export default BillboardClient;
