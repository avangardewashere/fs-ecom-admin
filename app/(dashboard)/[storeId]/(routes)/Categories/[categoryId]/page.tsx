import prismadb from "@/lib/prismadb";
import CategoryForm from "./_components/CategoryForm";

interface CategorySinglePageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

const CategorySinglePage: React.FC<CategorySinglePageProps> = async ({
  params,
}) => {
  // const { categoryId, storeId } = params;
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-col space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategorySinglePage;
