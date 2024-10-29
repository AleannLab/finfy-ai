"use client";
import { SuggestedBox } from "@/components/atoms";
import { useAppSelector } from "@/lib/store/hooks";

const HomeSuggestBoxes = () => {
  const suggest = useAppSelector((state) => state.suggest.suggests);
  return (
    <div className="w-full max-w-[500px] mt-3 p-1 flex flex-wrap overflow-hidden gap-3">
      {suggest.map((item: any) => (
        <SuggestedBox
          key={item.label}
          content={item.content}
          icon={item.icon}
          label={item.label}
          item={item}
        />
      ))}
    </div>
  );
};

export { HomeSuggestBoxes };
