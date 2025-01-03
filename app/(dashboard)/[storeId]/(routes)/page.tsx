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
    <div>
      Active store <span>{store?.name}</span>
    </div>
  );
};

export default DashboardPage;
