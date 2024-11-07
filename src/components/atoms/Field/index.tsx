import { Label } from "@/components/atoms";
import { FC, forwardRef } from "react";

import { FieldProps } from "./index.types";
import { cn } from "@/lib/utils";

const Field: FC<FieldProps> = forwardRef(
  (
    {
      classes,
      label,
      helperText,
      id,
      full,
      isRequired = true,
      sideElements = {},
      ...props
    },
    ref
  ) => {
    const { left, right } = sideElements;
    return (
      <div className={cn(classes?.wrapper, full ? "w-full" : "w-fit")}>
        <div
          className={cn(
            "flex flex-col w-auto gap-2 relative",
            full ? "w-full" : "w-fit",
            classes?.container
          )}
        >
          <div className="flex justify-between items-center">
            {label && (
              <Label
                className={cn(classes?.label, {
                  "!text-accent-content": Boolean(helperText),
                })}
                htmlFor={id}
              >
                {label}
              </Label>
            )}
            {!isRequired && (
              <span className="text-grey-15 font-semibold text-sm">
                (Optional)
              </span>
            )}
          </div>
          <div
            className={cn(
              "rounded-lg overflow-hidden px-3 py-2 text-base font-medium bg-navy-15 border flex items-center shadow-sm border-deep-slate",
              classes?.containerInput,
              full ? "w-full" : "w-fit",
              { "border-accent-content": helperText }
            )}
          >
            {left}
            <input
              id={id}
              {...props}
              ref={ref}
              className={cn(
                "text-[#547a91] outline-none bg-transparent h-full w-full placeholder:text-base placeholder:font-light",
                props?.className
              )}
            />
            {right}
          </div>
          {helperText && (
            <span
              className={cn(
                "text-accent-content text-xs font-light absolute top-full",
                classes?.helperText
              )}
            >
              {helperText}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Field.displayName = "Field";
export { Field };
export type { FieldProps };
