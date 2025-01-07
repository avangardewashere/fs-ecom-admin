import prismadb from "@/lib/prismadb";
import CategoryForm from "./_components/CategoryForm";

const CategorySinglePage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const { categoryId, storeId } = await params;
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });


  console.log("stid",storeId)
  const billboards = await prismadb.billBoard.findMany({
    where: {
      storeId: storeId,
    },
  });

  console.log("outside",billboards)
  return (
    <div className="flex-col">
      <div className="flex-col space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategorySinglePage;
