"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const TabComponent = TabsPrimitive.Root;

const TabList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg p-1",
      className
    )}
    {...props}
  />
));
TabList.displayName = TabsPrimitive.List.displayName;

const TabTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center border border-navy-25 justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 stroke-grey-15 fill-grey-15 hover:text-[#473513] data-[state=active]:fill-white data-[state=active]:stroke-white data-[state=active]:border-purple-15 data-[state=active]:text-[#473513] data-[state=active]:shadow",
      className
    )}
    {...props}
  />
));
TabTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabContent.displayName = TabsPrimitive.Content.displayName;

TabComponent.displayName = "Tab";
TabList.displayName = "Tab.List";
TabTrigger.displayName = "Tab.Trigger";
TabContent.displayName = "Tab.Content";

export const Tab = Object.assign(TabComponent, {
  List: TabList,
  Trigger: TabTrigger,
  Content: TabContent,
});
