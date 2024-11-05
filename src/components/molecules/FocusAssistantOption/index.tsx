"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import { FC } from "react";
import { setSuggest, setSuggests } from "@/lib/store/features/suggest/suggestSlice";
import { cn } from "@/lib/utils";
interface FocusAssistantOptionProps {
  title: string;
  text: string;
  suggest: any;
  item: any;
}

const FocusAssistantOption: FC<FocusAssistantOptionProps> = ({
  title,
  text,
  suggest,
  item
}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setSuggests(suggest));
    dispatch(setSuggest(item))
  };
  return (
    <button
      onClick={handleClick}
      className={cn("flex flex-col gap-2 items-start hover:bg-navy-5 p-2 rounded-md", item?.assistantId ? "opacity-100" : " opacity-20")}
    >
      <h3 className="text-[#473513] font-semibold text-sm text-start">{title}</h3>
      <p className="text-grey-5 font-medium text-xs text-start">{text}</p>
    </button>
  );
};

export { FocusAssistantOption };
