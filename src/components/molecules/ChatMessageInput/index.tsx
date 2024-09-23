"use client";

import { Button, Icon, Textarea } from "@/components/atoms";
import { useAutoResizeTextArea, useChat, useUser } from "@/hooks";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const ChatMessageInput = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    createChat,
    sendChatQuery,
    createMessage,
    chatId,
    history,
    isLoading,
    setIsLoading,
    chats
  } = useChat();

  const [message, setMessage] = useState("");
  const textareaRef = useAutoResizeTextArea();

  const onSubmit = async (formData: FormData) => {
    if (!isLoading) {
      setIsLoading(true);
      const value = formData.get("message") as string;
      setMessage("");
      const userId = user?.id;
      if (value && userId) {
        let currentChatId = chatId;
        if (!currentChatId) {
          const chat = await createChat(userId);
          currentChatId = chat.payload.id;
          router.push(`dashboard/chat/${currentChatId}`, undefined);
        }
        if (currentChatId) {
          createMessage({
            chat_id: currentChatId,
            user_id: userId,
            content: value,
            message_type: "user",
            is_processed: true,
          });
          const data = await sendChatQuery(
            `${userId}`,
            currentChatId,
            history,
            value
          );
          createMessage({
            chat_id: currentChatId,
            user_id: userId,
            content: data.payload.output.text,
            message_type: "bot",
            is_processed: true,
          });
        }
      }
      setIsLoading(false);
    }
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
      className="md:rounded-md flex justify-between items-center bg-navy-15 relative shadow md:shadow-none shadow-grey-15"
    >
      <Textarea
        ref={setTextareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-navy-15 pl-4 h-16 focus:outline-none text-base border-none resize-none text-white py-5 pr-24 lg:pr-48"
        placeholder="Ask anything..."
        name="message"
        onKeyDown={handleEnter}
      />
      <div className="flex items-center gap-3 py-3 absolute right-4 top-1/2 -translate-y-1/2">
        <Button
          variant="ghost"
          type="button"
          className="co-pilot-btn !p-0 lg:!p-1 !w-6 lg:!w-28"
        >
          <Icon type="BsStarsIcon" />
          <span className="hidden lg:flex gap-1 items-center">
            Co-pilot
            <div className="p-2 bg-navy-25 rounded-full" />
          </span>
        </Button>

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
