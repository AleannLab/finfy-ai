"use client";

import { ComponentProps, FC, useState } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  Icon: JSX.Element;
  IconAfter?: JSX.Element;
  text: string;
  onClick?: any;
}

const ActionButton: FC<ButtonProps> = ({ Icon, text, IconAfter = null, onClick = () => {}, ...props }) => {
  return (
    <button
      onClick={onClick}
      className="home-assist-btn group gap-1 items-center flex text-sm text-normal py-0.5 px-1.5"
      {...props}
    >
      {Icon}
      {text}
      {IconAfter ? IconAfter : <></>}
    </button>
  );
};

export { ActionButton };
