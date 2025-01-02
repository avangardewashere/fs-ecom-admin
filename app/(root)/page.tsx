"use client"
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";
 

export default function SetupPage() {
  return <div className="p-3">

    <span><Button>Meow</Button>
    <UserButton/>

    {/* <Modal title="test" description="sa"isOpen onClose={()=>{}}>
      Children
    </Modal> */}
    </span>  
  </div>;
}
