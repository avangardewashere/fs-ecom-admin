import prismadb from "@/lib/prismadb";

interface GraphDataTypes {
  name: string;
  total: number;
}

export const getSGraphRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true,
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();

    let RevenueForOrder = 0;

    for (const item of order.orderItems) {
      RevenueForOrder += item.product.price;
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + RevenueForOrder;
  }

  const graphData: GraphDataTypes[] = [
    { name: "Jan", total: 0 },

    { name: "Feb", total: 0 },

    { name: "Mar", total: 0 },

    { name: "Apr", total: 0 },

    { name: "May", total: 0 },

    { name: "Jun", total: 0 },

    { name: "Jul", total: 0 },

    { name: "Aug", total: 0 },

    { name: "Sep", total: 0 },

    { name: "Oct", total: 0 },

    { name: "Nov", total: 0 },

    { name: "Dec", total: 0 },
  ];
};
