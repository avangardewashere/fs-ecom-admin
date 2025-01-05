import prismadb from "@/lib/prismadb";

const BillBoardsSinglePage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const { billboardId } = await params;
  const billbaoard = await prismadb.billBoard.findUnique({
    where: {
      id: billboardId,
    },
  });
  return <div>This is fa form for billboards {billbaoard.label}</div>;
};

export default BillBoardsSinglePage;
