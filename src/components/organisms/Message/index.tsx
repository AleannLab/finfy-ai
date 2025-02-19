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
  detailed?: any;
  calculations?: any;
  showHideDetailed?: any;
  showHideCalculation?: any;
  showDetailed?: any;
}

const recursive = (text: string) => {
  try {


    const json = JSON.parse(text as string)

    if (json.text) {
      text = json.text
    }

    return  recursive(text)


  } catch (err) {
    // do nothing
  }

  return text
}
const Message: FC<MessageProps> = (props) => {
  const { text, isUser, isLoading, isLastMessage, detailed, calculations, showHideDetailed, showHideCalculation, showDetailed } = props;

  const messageText = recursive(text as string)

  return (
    <>
      <article className="w-full relative">
        <div className={cn(
          "flex gap-2.5 select-none w-full",
          isUser ? "justify-end" : "justify-start"
        )}>
          <div
            className={cn(
              "message relative inline-block  w-full rounded-md px-4 py-1 md:px-5 md:py-2",
              "md:w-auto"
            )}
          >
            <ContentMessage
              text={messageText}
              isUser={isUser}
              isLoading={isLoading}
              isLastMessage={isLastMessage}
            />
            <div className="flex w-full gap-3">
              {!!detailed && <div onClick={() => showHideDetailed()} className=" hover:cursor-pointer text-[#525ED1]">Detailed Breakdown</div>}
              {calculations && <div onClick={() => showHideCalculation()} className=" hover:cursor-pointer text-[#525ED1]" >Visualise Breakdown</div>}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export { Message };
