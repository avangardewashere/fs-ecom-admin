import prismadb from "@/lib/prismadb";
import BillboardClient from "./_components/BillboardClient";
import { StringMappingType } from "typescript";

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
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards}/>
      </div>
    </div>
  );
};

export default BillBoardsPage;
