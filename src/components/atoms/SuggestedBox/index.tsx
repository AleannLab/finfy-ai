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
    submitChat
  } = useChat();

  const handleClick = async () => {
    // Set the selected suggestion in the state
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
  return (
    <button onClick={handleClick} className={cn("suggest-box flex-grow !border-opacity-15 bg-[#F3F9ED] flex flex-col items-start block-suggest", item?.assistantId === suggest?.assistantId ? "" : "")}>
      <p className="text-[#547a91] mb-1 text-start">
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
