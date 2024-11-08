"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { FC, ReactNode } from "react";

interface AssistActionsProps {
  children: ReactNode;
  onClose: () => void;
}

const AssistActions: FC<AssistActionsProps> = ({ children, onClose }) => {
  return (
    <div className="relative p-12 rounded-[24px] border border-[#E2EAFB] bg-gradient-to-r from-[rgba(255,255,255,0.3)] via-[rgba(255,255,255,0.3)] to-[rgba(247,248,252,0.3)] shadow-[inset_4px_4px_40px_0px_#FFF,0px_4px_30px_0px_rgba(54,80,127,0.1)] backdrop-blur-[7.5px]">
      {
        <div
          className="z-[999] top-4 right-2 md:top-6 md:right-6 cursor-pointer"
          onClick={onClose}
        >
          <Cross2Icon className="size-4 text-[#547A91]" color="#547A91" />
        </div>
      }
      {children}
    </div>
  );
};

export { AssistActions };
