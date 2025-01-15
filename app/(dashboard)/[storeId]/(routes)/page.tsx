import { Card, CardHeader } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
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
        <Heading title="Dashboard" description="Overview of your store"/>
        <Separator />  
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader></CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
