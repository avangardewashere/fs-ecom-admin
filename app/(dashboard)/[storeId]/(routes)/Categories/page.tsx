import prismadb from "@/lib/prismadb";
import BillboardClient from "./_components/BillboardClient";
import { StringMappingType } from "typescript";
import { BillboardColumn } from "./_components/column";
import { format } from "date-fns";

const BillBoardsPage = async ({
  params,
}: {
  params: { storeId: string  };
}) => {
  const { storeId } = await params;
  const billboards = await prismadb.billBoard.findMany({
    where: {
      storeId:storeId,
    },
    orderBy: {
      createAt: "desc", 
    },
  });

  const formattedBillboards: BillboardColumn [] = billboards.map((item)=>({
    id:item.id,
    label:item.label,
    createdAt:format(item.createAt,"MMM do, yyyy")
  }))

   
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards}/>
      </div>
    </div>
  );
};

export default BillBoardsPage;
