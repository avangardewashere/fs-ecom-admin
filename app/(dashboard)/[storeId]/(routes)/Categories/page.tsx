import prismadb from "@/lib/prismadb";
import CategoryClient from "./_components/CategoryClient";
import { StringMappingType } from "typescript";
import {  CategoryColumn } from "./_components/column";
import { format } from "date-fns";

const BillBoardsPage = async ({
  params,
}: {
  params: { storeId: string  };
}) => {
  const { storeId } = await params;
  const categories = await prismadb.category.findMany({
    where: {
      storeId:storeId,
    },include:{
      billboard:true
    },
    orderBy: {
      createdAt: "desc", 
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item)=>({
    id:item.id,
    name:item.name,
    billboardLabel:item.billboard.label,
    createdAt:format(item.createdAt,"MMM do, yyyy")
  }))

   
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories}/>
      </div>
    </div>
  );
};

export default BillBoardsPage;
