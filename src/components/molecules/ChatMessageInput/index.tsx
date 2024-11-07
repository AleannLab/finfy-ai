"use client";

import { Button, Icon, Modal, Textarea } from "@/components/atoms";
import { useAutoResizeTextArea, useChat, useUser } from "@/hooks";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FC, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ActionButton, ConnectBankAction, FocusAssistantPopover } from "@/components/molecules";
import { ActionButtonsGroupMobile } from "@/components/organisms/ActionButtonsGroup";
import { useDispatch } from "react-redux";
import { addMessage, setMessages } from "@/lib/store/features/chat/chatSlice";
import { SpeakerModerateIcon } from "@radix-ui/react-icons";
import { AudioChat } from "../AudioChat";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

interface ChatMessageInputProps {
  handleClose?: () => void;
  isDark?: boolean;
}

const ChatMessageInput: FC<ChatMessageInputProps> = ({ handleClose, isDark = false }) => {
  const { user } = useUser();
  const router = useRouter();
  const {
    createChat,
    sendChatQuery,
    createMessage,
    handleResetChat,
    chatId,
    history,
    isLoading,
    setIsLoadingSendQuery,
    messages,
    submitChat
  } = useChat();

  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage Popover
  const textareaRef = useAutoResizeTextArea();
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const [isVoiceChatModalOpen, setIsVoiceChatModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [shouldFocus, setShouldFocus] = useState(true);
  const [closeAudioChat, setCloseAudioChat] = useState<boolean>(false);

  const openVoiceChatModal = () => {
    setShouldFocus(false);
    setCloseAudioChat(false);
    setIsVoiceChatModalOpen(true);
  };

  useEffect(() => {
    if (!isVoiceChatModalOpen) {
      setShouldFocus(true);
    }
  }, [isVoiceChatModalOpen]);

  const handleOpenPopup = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsPopupOpen(true);
  };

  const handleClosePopup = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsPopupOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
      setIsPopupOpen(false);
  };

  const onSubmit = async (formData: FormData) => {
    setMessage("");
    const inValue = formData.get("message") as string;
    const userId = user?.id;

    if (!inValue || !userId) {
      console.error("Missing message or userId");
      return;
    }

    const assistantId = suggest?.assistantId;
    const currentPath = window.location.href;
    const match = currentPath.match(/\/dashboard\/career-coach\/chat\/(thread_[\w\d]+)/);
    const matchCareerCoach = currentPath.match(/\/dashboard\/tutor\/chat\/(thread_[\w\d]+)/);
    const threadIdFromURL = match ? match[1] : matchCareerCoach ? matchCareerCoach[1] : null;

    if (handleClose) {
      handleClose();
      handleResetChat();
    }

    // Calling `submitChat` from `useChat` hook
    await submitChat({
      message: inValue,
      userId,
      assistantId: assistantId || "",
      threadIdFromURL,
    });

    // Reset the input field after submission
    setMessage("");
  };

  
  
  

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (window.innerWidth > 768) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if (form) {
          const formData = new FormData(form);
          onSubmit(formData);
        }
      }
    }
  };

  const setTextareaRef = (element: HTMLTextAreaElement) => {
    if (element && shouldFocus) {
      element.focus();
      (textareaRef.current as any) = element;
    }
  };

  const chatContext = useMemo(() => {
    if (messages && messages.length > 0) {
      const dialogText = `Here is the context of your dialog with the client:\n${messages
        .map(item => `${item.message_type}: ${item.content}`)
        .join(",\n")}`;
  
      return dialogText;
    }

    return "";
  },[messages]);

  return (
    <form
      action={onSubmit}
      className="md:rounded-md mx-2 flex justify-between items-center lg:bg-navy-15 relative lg:border-t lg:border-t-grey-15 md:border-none"
    >
      <div className="relative">
        <button
          type="button"
          className="w-10 h-10 pl-3 pt-2.5 pb-3 -mr-2 flex lg:hidden"
          onClick={isPopupOpen ? handleClosePopup : handleOpenPopup}
        >
          <Icon type="PlusIcon" className={cn("w-5 h-5", isPopupOpen ? "stroke-purple-15" : " stroke-slate-400")} />
        </button>

        {isPopupOpen && (
          <div
            ref={popoverRef}
            className="absolute lg:hidden w-max bg-[#272E48] rounded-md px-4 border-[#374061] border-[1px] py-2 bottom-16 left-0 z-50"
          >
            <ActionButtonsGroupMobile />
          </div>
        )}
      </div>

      <Textarea
        ref={setTextareaRef}
        value={message}
        onChange={handleChange}
        className={cn(
          "lg:pl-4 h-16 focus:outline-none text-base overflow-hidden border-[1px] resize-none text-[#473513] py-5 pr-24 lg:pr-48",
          isDark ? "lg:bg-[#F3F9ED]" : "lg:bg-navy-15"
        )}
        placeholder="Ask anything..."
        name="message"
        onKeyDown={handleEnter}
      />
      <div className="flex items-center gap-3 py-3 absolute right-4 top-1/2 -translate-y-1/2">
        <Button size="xl" type="submit" className="w-10 h-10 p-3" onClick={openVoiceChatModal}>
          <SpeakerModerateIcon className="size-4" color='white'/>
        </Button>
        <Button size="xl" type="submit" className="w-10 h-10 p-3">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Icon type="ArrowRightIcon" className="size-4 text-[#473513]" />
          )}
        </Button>
      </div>
      <Modal
        open={isVoiceChatModalOpen}
        onClose={() => {
          setCloseAudioChat(true);
          setTimeout(() => {
            setIsVoiceChatModalOpen(false)
          }, 200)
        }}
        classes={{
          container: "!w-[90%] md:w-[50%] flex items-center justify-center",
          background: "backdrop-blur-none",
          wrapper: "!p-2 !w-[98%] md:!w-[40%] md:h-[50%] backdrop-blur-none bg-white rounded-xl",
        }}
      >
        <AudioChat isClosed={closeAudioChat} chatContext={chatContext} onClose={() => setIsVoiceChatModalOpen(false)}/>
      </Modal>
    </form>
  );
};

export { ChatMessageInput };
