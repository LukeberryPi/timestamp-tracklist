import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center px-4 py-2 hover:[&>svg]:-rotate-15 hover:[&>svg]:transition-all [&>svg]:size-4 justify-center gap-2 whitespace-nowrap rounded-full ring ring-black transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none focus-visible:ring-blue-500 focus-visible:ring-[3px] aria-invalid:ring-red-200 aria-invalid:border-red-500 rounded-full cursor-pointer shadow-[2px_2px_#000000]  hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_#000000] active:ring-0 active:translate-x-0.5 active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Button({
  className,
  variant,
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
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {!!IconLeft && IconLeft}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
