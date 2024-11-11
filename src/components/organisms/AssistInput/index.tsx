"use client";

import { ChatMessageInput } from "@/components/molecules";
import { ActionButtonsGroup, SuggestedQuestions } from "@/components/organisms";
import { AssistAction } from "@/layout/LayoutDashboard";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";

interface AssistInputProps {
  classes?: {
    container?: string;
    wrapper?: string;
  };
  handleClose?: () => void;
  isDark?: boolean;
  assistActionOpenState: AssistAction | null;
  setAssistActionOpenState: (value: AssistAction | null) => void;
}

const AssistInput: FC<AssistInputProps> = ({ classes, handleClose, isDark = false, assistActionOpenState, setAssistActionOpenState }) => {
  const [] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "flex flex-col fixed lg:left-0 right-2 left-2 lg:right-0 bottom-2 lg:bottom-0 md:left-auto md:right-auto md:bottom-auto md:relative rounded-full lg:rounded-none",
        classes?.wrapper
      )}
    >
      <div
        className={cn(
          "w-full md:p-2 top-[-112px] absolute bg-navy-15 lg:bg-transparent rounded-full lg:rounded-none",
          classes?.container
        )}
      >
        <SuggestedQuestions />
        <ActionButtonsGroup />
        <ChatMessageInput isDark={isDark} handleClose={handleClose} assistActionOpenState={assistActionOpenState} setAssistActionOpenState={setAssistActionOpenState}/>
      </div>
    </div>
  );
};

export { AssistInput };
