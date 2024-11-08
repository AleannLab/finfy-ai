"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks";
import { useAppDispatch } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";
import { careerCoach, careerCoachAssistantSuggestionData, defaultCareerCoachAssistant, defaultTutor, setFocusSuggests, setSuggest, setSuggests, tutor, tutorSuggestionData } from "@/lib/store/features/suggest/suggestSlice";

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
    isOpen?: boolean;
  }
>(({ className, children, isHideChevron, ...props }, ref) => {
  const { open } = useSidebar();
  const dispatch = useAppDispatch();
  const pathname = usePathname();


  const onClick = () => {

    if (pathname.includes('tutor')) {
      dispatch(setFocusSuggests(tutor))
      dispatch(setSuggest(defaultTutor))
      dispatch(setSuggests(tutorSuggestionData))
    }
    if (pathname.includes('career-coach')) {
      dispatch(setFocusSuggests(careerCoach))
      dispatch(setSuggest(defaultCareerCoachAssistant))
      dispatch(setSuggests(careerCoachAssistantSuggestionData))

    }
  }
  //TODO
  return (
  <AccordionPrimitive.Header onClick={onClick} className="flex items-center max-w-full ">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between !max-h-10 text-sm font-medium transition-all max-w-full [&[data-state=open]>svg]:rotate-180",
        className, open ? "" : "!max-w-10" 
      )}
      {...props}
    >
      {children}
      {!isHideChevron && open && (
        <ChevronDownIcon
          // color={props?.isOpen ? "#f3f9fd" : "#272E48"}
          className={cn("h-4 w-4 shrink-0 transition-transform duration-200")}
          aria-hidden
        />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
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
