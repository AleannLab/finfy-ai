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
}

const FocusAssistantOption: FC<FocusAssistantOptionProps> = ({
  title,
  text,
  suggest,
  item
}) => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  const basePath = path.split("chat")?.[0]
  const handleClick = () => {
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
      className={cn("flex flex-col gap-2 items-start hover:bg-navy-5 p-2 rounded-md", item?.assistantId ? "opacity-100" : " opacity-20")}
    >
      <h3 className="text-[#272e48] font-semibold text-sm text-start">{title}</h3>
      <p className="text-[#547a91] font-medium text-xs text-start">&quot;{text}&quot;</p>
    </button>
  );
};

export { FocusAssistantOption };
