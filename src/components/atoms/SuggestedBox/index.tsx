import { useChat, useUser } from "@/hooks";
import { setSuggest, setSuggests } from "@/lib/store/features/suggest/suggestSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
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
  const suggests = useAppSelector((state) => state.suggest.suggests);


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
    submitChat
  } = useChat();

  const handleClick = async () => {

    if (item?.isDefault) {
      dispatch(setSuggests(item?.suggest))
      dispatch(setSuggest(item))
      return null;
    }
    // Set the selected suggestion in the state ...
    dispatch(setSuggest(item));

    // Get user ID and validate it
    const userId = user?.id;
    const inValue = content; // Use `content` as the message input
    if (!inValue || !userId) {
      console.error("Missing message or userId");
      return;
    }

    // Retrieve assistant ID and chat thread ID from URL
    const assistantId = item?.assistantId || suggest?.assistantId;
    const currentPath = window.location.href;
    const match = currentPath.match(/\/dashboard\/chat\/(thread_[\w\d]+)/);
    const threadIdFromURL = match ? match[1] : null;

    // Call `submitChat` to handle message submission
    await submitChat({
      message: inValue,
      userId,
      assistantId,
      threadIdFromURL,
    });
  };

  const pathname = usePathname();

  return (
    <button onClick={handleClick} className={cn("suggest-box max-h-[44px] max-w-[230px] lg:max-w-[100%] w-full overflow-hidden lg:min-h-[112px] lg:max-h-[112px] flex-grow !border-opacity-15 bg-[#f3f9ed] border-[#74bbc9]/20 flex flex-col items-start block-suggest", item?.assistantId === suggest?.assistantId ? "" : "", (pathname.includes("teacher") && suggests?.length > 4) ? "" : "")}>
      <p className="mb-1 hidden lg:block text-start  !text-[#272e48] text-sm font-semibold leading-tight">
        {icon} {label}
      </p>
      <div className="relative !text-[#547a91]">
        <p className="pr-6 text-start !text-[#547a91] overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] line-clamp-2  lg:hidden">
          &quot;{content}&quot; ↗
        </p>
        <p className="pr-6 text-start !text-[#547a91] max-h-[56px] overflow-hidden text-ellipsis whitespace-pre-line line-clamp-2 hidden lg:block">
          &quot;{content}&quot; ↗
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
