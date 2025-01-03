"use client";
import { Store } from "@prisma/client";
import { Popover, PopoverTrigger } from "../ui/popover";
import { useParams, useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store as StoreIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopOverTriggerProps {
  items?: Store[];
}
const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();

  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
        variant={"outline"}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};

export default StoreSwitcher;
