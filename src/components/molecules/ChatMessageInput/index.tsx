"use client";

import { Button, Icon, Textarea } from "@/components/atoms";
import { useAutoResizeTextArea, useChat, useUser } from "@/hooks";
import { useState } from "react";

const ChatMessageInput = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { createChat, sendChatQuery, createMessage, chatId, history } =
    useChat();
  const textareaRef = useAutoResizeTextArea();

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const value = formData.get("message") as string;
    const userId = user?.id;
    if (value && userId) {
      let currentChatId = chatId;
      if (!currentChatId) {
        const chat = await createChat(userId);
        currentChatId = chat.payload.id;
      }
      console.log(currentChatId, "currentChatId");
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
        console.log(data, "data");
      }
    }
    setIsLoading(false);
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
      className="rounded-md flex justify-between items-center border-navy-5 bg-navy-15 relative"
    >
      <Textarea
        ref={setTextareaRef}
        className="bg-navy-15 pl-4 h-16 focus:outline-none text-base border-none resize-none text-white py-5 pr-24 lg:pr-48"
        placeholder="Ask anything..."
        name="message"
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
          <Icon type="ArrowRightIcon" className="size-4 text-white" />
        </Button>
      </div>
    </form>
  );
};

export { ChatMessageInput };
