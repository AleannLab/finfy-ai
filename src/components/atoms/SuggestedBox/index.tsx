import { useChat, useUser } from "@/hooks";
import { setSuggest } from "@/lib/store/features/suggest/suggestSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface SuggestBoxProps {
  label: string;
  content: string;
  icon: string;
  item: any;
}

const SuggestedBox: FC<SuggestBoxProps> = ({ content, label, icon, item }) => {
  const suggest = useAppSelector((state) => state.suggest.suggest);

  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch()
  const {
    createChat,
    sendChatQuery,
    createMessage,
    chatId,
    history,
    isLoading,
    setIsLoadingSendQuery,
  } = useChat();

  const handleClick = async () => {
    dispatch(setSuggest(item))
  };
  return (
    <button onClick={handleClick} className={cn("suggest-box flex flex-col items-start block-suggest", item?.assistantId === suggest?.assistantId ? "!border-black" : "")}>
      <p className="text-[#473513] mb-1 text-start">
        {icon} {label}
      </p>
      <div className="relative text-grey-15">
        <p className="pr-6 text-start">
          {content}
        </p>
        {/* <Icon
          type={"UpArrowIcon"}
          className="size-3 rotate-45 absolute bottom-0 right-0"
        /> */}
      </div>
    </button>
  );
};

export { SuggestedBox };
