import type { ComponentProps, ReactNode } from "react";

import { Classes } from "@/types";

export type FieldProps = ComponentProps<"input"> & {
  classes?: Classes & {
    label?: string;
    helperText?: string;
    containerInput?: string;
  };
  label?: string | ReactNode;
  helperText?: string | boolean;
  isRequired?: boolean;
  full?: boolean;
  sideElements?: {
    right?: ReactNode;
    left?: ReactNode;
  };
};

export type TypeField = "main";

