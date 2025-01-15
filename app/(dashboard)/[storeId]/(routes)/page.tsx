import Heading from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";

interface DashboardPage {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPage> = async ({ params }) => {

  const {storeId} = await params

  const store = await prismadb.store.findFirst({
    where: {
      id:  storeId,
    },
  });


  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description=""/> 
      </div>
    </div>
  );
};

export default DashboardPage;
