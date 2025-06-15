import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm ring ring-black font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-blue-500 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 aria-invalid:border-red-500 rounded-full cursor-pointer shadow-[3px_3px_#000000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-600/90",
        destructive:
          "bg-red-500 text-white hover:bg-red-500/90 focus-visible:ring-blue-500",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  IconLeft,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    IconLeft?: React.ReactNode;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        ""
      )}
      {...props}
    >
      {!!IconLeft && IconLeft}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
