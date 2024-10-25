"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { useUser } from "@/hooks";
import { saveTransactionsAndAccounts } from "@/lib/supabase/actions";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/helpers";

const AccordionComponent = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    isHideChevron?: boolean;
  }
>(({ className, children, isHideChevron, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex items-center">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {!isHideChevron && (
        <ChevronDownIcon
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
          aria-hidden
        />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent: any = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { user } = useUser();
  const fetchTransactions = async (token: string) => {
    try {
      const response = await fetch("/api/plaid/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: token }),
      });
      const { transactions } = await response.json();
      console.log("transactions", transactions)
      if (user?.id) {
        await saveTransactionsAndAccounts(transactions, user.id);
      }
    } catch (error) {
      toast.error(`Error fetching transactions: ${getErrorMessage(error)}`);
    }
  };
  const onHandleClick = async () => {
    console.log("click", user)
    if (user?.plaid_access_token) {
      console.log("click inside")

      await fetchTransactions(user?.plaid_access_token)
    }
  }
  return (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
    <Button onClick={onHandleClick} type="button">Fetch</Button>
  </AccordionPrimitive.Content>
)});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

AccordionComponent.displayName = "Accordion";
AccordionContent.displayName = "Accordion.Content";
AccordionTrigger.displayName = "Accordion.Trigger";
AccordionItem.displayName = "Accordion.Item";

export const Accordion = Object.assign(AccordionComponent, {
  Content: AccordionContent,
  Trigger: AccordionTrigger,
  Item: AccordionItem,
});
