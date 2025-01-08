import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        style={{
          fontSize: "16px"
        }}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base lg:text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none md:focus-visible:ring-1 md:focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
