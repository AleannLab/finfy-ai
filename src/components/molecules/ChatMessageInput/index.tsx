"use client";

import { Button, Icon, Textarea } from "@/components/atoms";
import { useAutoResizeTextArea, useCategory, useChat, useUser } from "@/hooks";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FC, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ActionButton, ConnectBankAction, FocusAssistantPopover } from "@/components/molecules";
import { ActionButtonsGroupMobile } from "@/components/organisms/ActionButtonsGroup";
import { Category } from "@/lib/store/features/category/categorySlice";
import clsx from "clsx";
import {MOCK_USER_ID} from "@/lib/store/features/chat/chatSlice";

interface ChatMessageInputProps {
  handleClose?: () => void;
  isDark?: boolean;
  category?: string;
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
    chatCategory,
      ...rest
  } = useChat();
  const { category } = useCategory();

  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage Popover
  const textareaRef = useAutoResizeTextArea();
  const popoverRef = useRef<HTMLDivElement | null>(null);

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

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const onSubmit = async (formData: FormData) => {
    if (!isLoading) {
      setIsLoadingSendQuery(true);
      const value = formData.get("message") as string;
      setMessage("");
      handleClose && handleClose();
      const userId = user?.id || MOCK_USER_ID;
      if (value && userId) {
        let currentChatId = chatId;
        let currentChatCategory = chatCategory;
        if (handleClose) {
          handleResetChat();
        }
        if (!currentChatId || handleClose) {
          const chat = await createChat(userId, value, category ? category : Category.ASSISTANT);
          currentChatId = chat.payload.id;
          router.push(`/dashboard/chat/${currentChatId}`, undefined);
        }
        if (currentChatId) {
          createMessage({
            chat_id: currentChatId,
            user_id: userId,
            content: value,
            message_type: "user",
            is_processed: true,
          });
          const data: any = await sendChatQuery(
            `${userId}`,
            currentChatId,
            history,
            value,
            user?.selected_country === "ZA" ? "yodlee" : "plaid",
            category ? category : Category.ASSISTANT
          );
          if (data?.error) {
            toast.error(data.error.message);
          } else {
            createMessage({
              chat_id: currentChatId,
              user_id: userId,
              // content: data.payload.output.text || data.payload.output,
              content: JSON.stringify(data.payload.output),
              message_type: "bot",
              is_processed: true,
              calculations: JSON.stringify(data.payload.calculations),
            });
          }
        }
      }
      setIsLoadingSendQuery(false);
    }
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
    if (element && window.innerWidth > 1024) {
      element.focus();
      (textareaRef.current as any) = element;
    }
  };

  return (
    <form
      action={onSubmit}
      className="rounded-full flex justify-between border-2 items-center bg-transparent  relative"
    >
      <div className="absolute">
        <button
          type="button"
          className="w-10 h-10 pl-3 pt-2.5 pb-3 -mr-2 flex"
        >
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1.67188V7.67188M7 7.67188V13.6719M7 7.67188H13M7 7.67188L1 7.67187"
                  stroke="#515AD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

      </div>

      <Textarea
        ref={setTextareaRef}
        value={message}
        onChange={handleChange}
        className={cn(
          "lg:pl-4 h-16 focus:outline-none justify-center text-base border-none resize-none  py-5 pr-16 !pl-10",
        )}
        placeholder="Ask anything..."
        name="message"
        onKeyDown={handleEnter}
      />
      <div className="flex items-center justify-center gap-3 py-3 absolute right-4 top-1/2 -translate-y-1/2">
        <Button size="xl" type="submit" className="w-10 h-10 p-3">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Icon type="ArrowRightIcon" className="size-4 text-white" />
          )}
        </Button>
      </div>
    </form>
  );
};

export { ChatMessageInput };
