import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import { UserAvatar } from "../UserAvatar";
import Markdown from "react-markdown";
interface ContentMessageProps {
  text: ReactNode;
  isUser: boolean;
  isLoading?: boolean;
}

const ContentMessage: FC<ContentMessageProps> = ({
  text,
  isUser,
  isLoading,
}) => {
  if (!text) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <p
        className={cn(
          "whitespace-pre-line text-white font-normal leading-[14px] md:leading-8",
          isUser ? "text-4xl font-bold flex gap-2.5 items-center" : "text-base"
        )}
      >
        {isUser && <UserAvatar />}
        {isUser || isLoading ? text : <Markdown>{text as string}</Markdown>}
      </p>
    </div>
  );
};

export { ContentMessage };
