"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  return (
    <>
    <div className="flex items-center justify-between">
      <Heading title="Settings" description="Manage store preferences" />
      <span>Settings Form</span>
      <Button variant={"destructive"} size="sm" onClick={() => {}}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
    <Separator/>
     
    </>

  );
};

export default SettingsForm;
