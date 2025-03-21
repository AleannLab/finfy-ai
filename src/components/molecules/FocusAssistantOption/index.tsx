"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import { FC, useEffect } from "react";
import { careerCoach, setFocusSuggests, setSuggest, setSuggests, tutor } from "@/lib/store/features/suggest/suggestSlice";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
interface FocusAssistantOptionProps {
  title: string;
  text: string;
  suggest: any;
  item: any;
  onOpenChange: any;
}

const FocusAssistantOption: FC<FocusAssistantOptionProps> = ({
  title,
  text,
  suggest,
  item,
  onOpenChange
}) => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  const basePath = path.split("chat")?.[0]
  const handleClick = () => {
    onOpenChange()
    dispatch(setSuggests(suggest));
    dispatch(setSuggest(item))
    if (path.includes("chat")) {
      const query = new URLSearchParams({ assistantId: item?.assistantId }).toString();
      router.push(`${basePath}?${query}`);
      
    }
  }; 
  return (
    <button
      onClick={handleClick}
      className={cn("flex flex-col gap-2 max-w-[230px] p-2 items-start hover:bg-[#ECECEC] rounded-md", item?.assistantId ? "opacity-100" : " opacity-20")}
    >
      <h3 className="text-[#000] font-semibold text-sm text-start">{title}</h3>
      <p className=" text-[#666666] overflow-hidden max-h-[32px] text-ellipsis line-clamp-2 text-xs font-medium text-start">&quot;{text}&quot;</p>
    </button>
  );
};

export { FocusAssistantOption };
