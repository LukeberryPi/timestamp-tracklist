import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group bg-red-500"
      style={{ backgroundColor: "red" }}
      {...props}
    />
  );
};

export { Toaster };
