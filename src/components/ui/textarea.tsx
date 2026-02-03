import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full bg-neutral-900 px-3 py-2 text-sm border border-neutral-700 rounded-none resize-y min-h-[120px] text-neutral-100",
        "placeholder:text-neutral-500",
        "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-800",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
