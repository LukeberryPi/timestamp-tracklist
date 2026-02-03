import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-accent text-neutral-950 border border-transparent hover:bg-accent/90",
        ghost: "text-neutral-400 border border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100 hover:border-neutral-600",
        destructive: "bg-red-500 text-white border border-transparent hover:bg-red-600",
        outline: "border border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-100",
      },
      size: {
        default: "px-3 py-1.5 text-sm",
        lg: "px-5 py-2.5 text-base",
        sm: "px-2 py-1 text-xs",
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
  const content = asChild ? (
    children
  ) : (
    <>
      {!!IconLeft && IconLeft}
      {children}
    </>
  );

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {content}
    </Comp>
  );
}

export { Button, buttonVariants };
