import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const salesCount = await prismadb.product.count({
    where: {
      isArchived: false,
      storeId,
    },
  });
  return salesCount;
};
