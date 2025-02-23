import prismadb from "@/lib/prismadb";

import { ProductColumn } from "./_components/column";
import { format } from "date-fns";
import ProductClient from "./_components/ProductClient";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: Promise<{ storeId: string } >}) => {
  const { storeId } = await params;
  const products = await prismadb.product.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(Number(item.price)),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formatProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
