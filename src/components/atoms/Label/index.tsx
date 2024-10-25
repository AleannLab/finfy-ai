import cx from "clsx";
import { FC } from "react";

import { LabelProps } from "./index.type";

const Label: FC<LabelProps> = ({ children, isRequired, ...props }) => {
  return (
    <label
      {...props}
      className={cx("text-sm font-semibold text-[#473513]", props.className)}
    >
      {children}
      {isRequired && "*"}
    </label>
  );
};

export { Label };
