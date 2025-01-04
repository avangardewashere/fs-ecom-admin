interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], string> = {
  public: "secondaryc",
  admin: "desctructive",
};

const ApiAlert = () => {
  return <div></div>;
};

export default ApiAlert;
