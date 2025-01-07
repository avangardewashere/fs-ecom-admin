import prismadb from "@/lib/prismadb";
import BillboardForm from "./_components/BillboardForm";

const ColorSinglePage = async ({
  params,
}: {
  params: { colorsId: string };
}) => {
  const { colorsId } = await params;
  const color= await prismadb.color.findUnique({
    where: {
      id: colorsId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-col space-y-4 p-8 pt-6">
        <BillboardForm  initialData={color}/>
      </div>
    </div>
  );
};

export default ColorSinglePage;
