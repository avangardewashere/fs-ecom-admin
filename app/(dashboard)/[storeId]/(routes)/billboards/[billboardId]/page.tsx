import prismadb from "@/lib/prismadb";
import BillboardForm from "./_components/BillboardForm";

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
  return (
    <div className="flex-col">
      <div className="flex-col space-y-4 p-8 pt-6">
        <BillboardForm />
      </div>
    </div>
  );
};

export default BillBoardsSinglePage;
