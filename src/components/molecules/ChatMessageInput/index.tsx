"use client";

import { Button, Icon, Textarea } from "@/components/atoms";
import { useAutoResizeTextArea, useChat, useUser } from "@/hooks";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FC, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ActionButton, ConnectBankAction, FocusAssistantPopover } from "@/components/molecules";
import { ActionButtonsGroupMobile } from "@/components/organisms/ActionButtonsGroup";
import { useDispatch } from "react-redux";
import { addMessage, setMessages } from "@/lib/store/features/chat/chatSlice";
import { useAppSelector } from "@/lib/store/hooks";

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
    messages
  } = useChat();

  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage Popover
  const textareaRef = useAutoResizeTextArea();
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const suggest = useAppSelector((state) => state.suggest.suggest);

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
    setIsLoadingSendQuery(true);
    const savedInput = message;
    setMessage("")
  
    const inValue = formData.get("message") as string;
    const userId = user?.id;
  
    if (!inValue || !userId) {
      console.error("Missing message or userId");
      setIsLoadingSendQuery(false);
      return;
    }
  
    try {
      const assistantId =  suggest?.assistantId;
      let threadId: string | null = null;

      const currentPath = window.location.href;
      const match = currentPath.match(/\/dashboard\/chat\/(thread_[\w\d]+)/);
      if (match) {
        threadId = match[1]; // Зберігаємо threadId
        console.log("Found threadId from URL:", threadId);
      }      let accumulatedResponse = "";
  
      if (handleClose) {
        handleClose();
        handleResetChat();
      }
  
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `${inValue}`,
          assistantId,
          chatId: threadId,
        }),
      });
  
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
  
      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
  
          const chunk = decoder.decode(value, { stream: true }).trim();
  
          const cleanChunk = chunk.startsWith("data:")
            ? chunk.slice(5).trim()
            : chunk;
  
          try {
            const json = JSON.parse(cleanChunk);
  
            if (json.threadId) {
              threadId = json.threadId;
  
              router.push(`/dashboard/chat/${threadId}`, undefined);
  
              await createChat(userId, inValue.slice(0, 30) + "...", threadId);
            }
  
            if (json.message) {
              console.log("Accumulated Message:", json.message);
              accumulatedResponse += json.message + " ";
            }
          } catch (error) {
            console.error("Error parsing chunk:", error);
            accumulatedResponse += cleanChunk + " ";
          }
        }
      }
  
      accumulatedResponse = accumulatedResponse.trim();
      console.log("Final Response:", accumulatedResponse);
  
      if (threadId) {
        await createMessage({
          chat_id: threadId,
          user_id: userId,
          content: savedInput,
          message_type: "user",
          is_processed: true,
        });

        await createMessage({
          chat_id: threadId,
          user_id: userId,
          content: accumulatedResponse,
          message_type: "assistant",
          is_processed: true,
        });
        console.log("Message saved successfully");
      } else {
        console.error("Thread ID not found");
        toast.error("Thread ID not received. Please try again.");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
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
    if (element) {
      element.focus();
      (textareaRef.current as any) = element;
    }
  };

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
        <Button size="xl" type="submit" className="w-10 h-10 p-3">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Icon type="ArrowRightIcon" className="size-4 text-[#473513]" />
          )}
        </Button>
      </div>
    </form>
  );
};

export { ChatMessageInput };
