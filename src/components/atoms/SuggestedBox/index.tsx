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
  const prompt = useAppSelector((state) => state.suggest.prompt);


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
      prompt
    });
  };

  const pathname = usePathname();
  const isTeacher = pathname.includes("teacher")
  const isCareerCoach = pathname.includes("career-coach")

  return (
    <>
      <button onClick={handleClick} className="max-w-[266px] w-full h-28 p-3 bg-white flex rounded-lg border border-[#e9e9e9] flex-col justify-start items-start gap-2">
        {!!label?.length && <div className={cn("self-stretch text-black text-sm font-semibold  leading-tight", (isTeacher || isCareerCoach) ? "min-h-[38px] max-h-[38px] overflow-hidden text-ellipsis line-clamp-2" : "")}>{icon} {label}</div>}
        <p className={cn("text-[#666666] text-[14px] font-medium overflow-hidden leading-5", (isTeacher || isCareerCoach) ? "text-ellipsis max-h-[42px] line-clamp-2" : "text-ellipsis line-clamp-5")}>
          &quot;{content}&quot;
        </p>
      </button>

      {/* <button onClick={handleClick} className={cn(" max-h-[44px] md:hidden transition-all duration-200 border  px-4 py-2 rounded-lg max-w-[230px] lg:max-w-[100%] w-full overflow-hidden lg:min-h-[116px] lg:max-h-[116px] flex-grow bg-white border-[#e9e9e9] hover:border-black flex flex-col items-start block-suggest", item?.assistantId === suggest?.assistantId ? "" : "", (pathname.includes("teacher") && suggests?.length > 4) ? "" : "")}>
        <p className="mb-1 hidden lg:block text-start  !text-[#272e48] text-sm font-semibold leading-tight">
          {icon} {label}
        </p>
        <div className="relative !text-[#547a91]">
          <p className="pr-6 text-start text-[#666666] !text-[11px] font-medium  overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] line-clamp-2  lg:hidden">
            &quot;{content}&quot;
          </p>
          <p className="text-[#666666] text-[11px] font-medium leading-tight overflow-hidden text-ellipsis line-clamp-5">
            &quot;{content}&quot;
          </p>
        </div>
      </button> */}
    </>
  );
};

export { SuggestedBox };
