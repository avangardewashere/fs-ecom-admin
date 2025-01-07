import prismadb from "@/lib/prismadb";
import CategoryForm from "./_components/CategoryForm";
 

const CategorySinglePage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const {categoryId } = await params;
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId 
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-col space-y-4 p-8 pt-6">
        <CategoryForm  initialData={category}/>
      </div>
    </div>
  );
};

export default CategorySinglePage