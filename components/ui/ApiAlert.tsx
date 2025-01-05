"use client"
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant }) => {
    const onCopy = (description: string) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(description)
            .then(() => {
              toast.success("API Route Copied Successfully");
            })
            .catch(err => {
              console.error("Failed to copy text: ", err);
            });
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = description;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          toast.success("API Route Copied Successfully (Fallback)");
        }
      };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="t-4 flex items-center justify-between">
        <code className="relative rounded bf-muted px-18 font-mono px-[0.3rem] py-[02rem] text-sm font-semibold">
          {description}
        </code>
        <Button onClick={()=>onCopy(description)} variant={"outline"} size="icon">
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
