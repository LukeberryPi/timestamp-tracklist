import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full min-w-0 bg-transparent px-4 py-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ring ring-black/20",
        "aria-invalid:ring-red-200 aria-invalid:border-red-500",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:ring-2",
        className
      )}
      {...props}
    />
  );
}

export { Input };
