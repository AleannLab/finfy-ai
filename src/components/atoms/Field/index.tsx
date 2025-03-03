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
                className={cn("text-[#666666] text-sm font-semibold", classes?.label)}
                htmlFor={id}
              >
                {label}
              </Label>
            )}
            {!isRequired && (
              <span className="text-gray-400 font-medium text-sm">(Optional)</span>
            )}
          </div>
          <div
            className={cn(
              "px-3 py-1.5 bg-white rounded-lg shadow-sm border border-[#e9e9e9] flex items-center relative overflow-hidden",
              classes?.containerInput,
              full ? "w-full" : "w-fit"
            )}
          >
            {left}
            <input
              id={id}
              {...props}
              ref={ref}
              className={cn(
                "text-gray-400 h-6 text-base font-medium outline-none bg-transparent w-full placeholder:text-base placeholder:font-light",
                props?.className
              )}
            />
            {/* Якщо `right` передано — рендеримо його в абсолютному контейнері */}
            {right && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {right}
              </div>
            )}
          </div>
          {helperText && (
            <span className={cn("text-zinc-400 text-sm font-medium", classes?.helperText)}>
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
