import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SettingsForm from "./_components/SettingsForm";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { storeId } = await params;

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId: userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <SettingsForm initialData={store}/> 
      </div>
    </div>
  );
};

export default SettingsPage;
