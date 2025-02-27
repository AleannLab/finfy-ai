import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

  export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

  const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
      <textarea
        onInput={(event) => {
          const target = event.target as HTMLTextAreaElement;
          target.style.height = `${target.scrollHeight}px`;
        }}
        className={cn(
          "w-full h-auto placeholder:text-muted-foreground focus:outline-none resize-none",
          className
        )}
        autoFocus={false}
        ref={ref}
        {...props}
      />
    );
  });
  Textarea.displayName = "Textarea";
  
export { Textarea };
