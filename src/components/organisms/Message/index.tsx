"use client";

import { ContentMessage } from "@/components/molecules";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { FC, ReactNode } from "react";

interface MessageProps {
  text: ReactNode;
  isUser: boolean;
  date?: string;
  isLoading?: boolean;
  isLastMessage?: boolean;
}

const Message: FC<MessageProps> = (props) => {
  const { text, isUser, isLoading, isLastMessage } = props;

  return (
    <>
      <article className="w-full relative">
        <div className={cn("flex gap-2.5 select-none w-full ", isUser ? "justify-end items-end" : "justify-start items-start")}>
          <div
            className={cn(
              "message relative flex text-[#547a91] w-full rounded-md px-4 py-1 md:px-5 md:py-2", isUser ? "justify-end items-end" : "justify-start items-start"
            )}
          >
            <ContentMessage
              text={text}
              isUser={isUser}
              isLoading={isLoading}
              isLastMessage={isLastMessage}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export { Message };
