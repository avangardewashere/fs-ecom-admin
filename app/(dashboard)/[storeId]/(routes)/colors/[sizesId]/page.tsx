import prismadb from "@/lib/prismadb";
import BillboardForm from "./_components/BillboardForm";

const SizesSinglePage = async ({
  params,
}: {
  params: { sizesId: string };
}) => {
  const { sizesId } = await params;
  const sizes= await prismadb.size.findUnique({
    where: {
      id: sizesId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-col space-y-4 p-8 pt-6">
        <BillboardForm  initialData={sizes}/>
      </div>
    </div>
  );
};

export default SizesSinglePage;
