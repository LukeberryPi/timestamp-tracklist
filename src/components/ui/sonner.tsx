import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      className="toaster group bg-red-500"
      style={{ backgroundColor: "red" }}
      {...props}
    />
  );
};

export { Toaster };
