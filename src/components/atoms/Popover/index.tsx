"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const PopoverRoot = PopoverPrimitive.Root;

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    className={cn("cursor-pointer", className)}
    {...props}
  />
));
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

const PopoverPortal = PopoverPrimitive.Portal;

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={cn("absolute right-2 top-2", className)}
    {...props}
  />
));
PopoverClose.displayName = PopoverPrimitive.Close.displayName;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <PopoverPortal>
    <PopoverPrimitive.Content
      ref={ref}
      className={cn(
        "!z-[502] pt-2 mx-4 !max-h-[70vh] overflow-auto px-3 !max-w-[90vw] pb-6 border-[#e9e9e9] bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-[#e9e9e9]",
        "data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out",
        className
      )}
      {...props}
    >
      {children}
      <PopoverClose className="rounded-sm opacity-70 transition-opacity hover:opacity-100">
        <span className="sr-only">Close</span>
      </PopoverClose>
    </PopoverPrimitive.Content>
  </PopoverPortal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("font-medium text-xs text-grey-15 pb-2 border-b border-b-[#e9e9e9]", className)} {...props} />
);
PopoverHeader.displayName = "PopoverHeader";

const PopoverFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-4 flex justify-end space-x-2", className)}
    {...props}
  />
);
PopoverFooter.displayName = "PopoverFooter";

const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Close: PopoverClose,
  Content: PopoverContent,
  Header: PopoverHeader,
  Footer: PopoverFooter,
});

export { Popover };
