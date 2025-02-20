"use client";

import { ChatMessageInput } from "@/components/molecules";
import { ActionButtonsGroup, SuggestedQuestions } from "@/components/organisms";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface AssistInputProps {
  classes?: {
    container?: string;
    wrapper?: string;
  };
  handleClose?: () => void;
  isDark?: boolean;
  category?: string
  assistantKey?: string;
}

const AssistInput: FC<AssistInputProps> = ({ classes, handleClose, isDark = false, category, assistantKey }) => {
  return (
    // <div
    //   className={cn(
    //     "flex flex-col absolute left-0 rounded-full w-full"
    //   )}
    // >
   <div
      className={cn(
        classes?.wrapper,
      )}
    > 
      <div
        className={cn(
          "w-full",
          classes?.container
        )}
      >
        <SuggestedQuestions />
        {/* <ActionButtonsGroup /> */}
        <ChatMessageInput isDark={isDark} assistantKey={assistantKey} handleClose={handleClose} category={category} />
      </div>
    </div>
  );
};

export { AssistInput };
