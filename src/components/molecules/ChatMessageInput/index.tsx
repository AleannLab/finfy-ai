"use client";

import { Button, Icon, Modal, Textarea } from "@/components/atoms";
import { useAutoResizeTextArea, useChat, useUser } from "@/hooks";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FC, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn, detectPhoneAgents } from "@/lib/utils";
import { ActionButton, ConnectBankAction, FileUploader, FocusAssistantPopover, QuestionScanner } from "@/components/molecules";
import { ActionButtonsGroupMobile } from "@/components/organisms/ActionButtonsGroup";
import { useDispatch } from "react-redux";
import { addMessage, fetchChatByTread, setMessages } from "@/lib/store/features/chat/chatSlice";
import { SpeakerModerateIcon } from "@radix-ui/react-icons";
import { AudioChat } from "../AudioChat";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AssistActions } from "@/components/organisms";
import { AssistAction } from "@/layout/LayoutDashboard";

interface ChatMessageInputProps {
  handleClose?: () => void;
  isDark?: boolean;
  assistActionOpenState: AssistAction | null;
  setAssistActionOpenState: (value: AssistAction | null) => void;
}

const ChatMessageInput: FC<ChatMessageInputProps> = ({ handleClose, isDark = false, assistActionOpenState, setAssistActionOpenState }) => {
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
    submitChat,
    fetchMessagesForChat
  } = useChat();

  const [message, setMessage] = useState("");
  const [files, setFiles] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage Popover
  const textareaRef = useAutoResizeTextArea();
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const dispatch = useDispatch();
  const [shouldFocus, setShouldFocus] = useState(true);
  const [closeAudioChat, setCloseAudioChat] = useState<boolean>(false);
  const [isUserUsingMobile, setIsUserUsingMobile] = useState<boolean>(false);
  const audioChatRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isTutor = pathname.includes('/tutor')
  const isCareerCoach = pathname.includes('/career-coach')

  useEffect(() => {
    const detectMobile = detectPhoneAgents();
    setIsUserUsingMobile(detectMobile);
  }, []);

  useEffect(() => {
    if (assistActionOpenState !== null && audioChatRef.current && !isUserUsingMobile) {
      audioChatRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [assistActionOpenState]);

  const openAssistAction = (actionType: AssistAction) => {
    setShouldFocus(false);
    setAssistActionOpenState(actionType);
    if (actionType === AssistAction.AUDIO_CHAT) {
      setCloseAudioChat(false);
    }
  }

  const closeAssistAction = async () => {
    const currentPath = window.location.href;
    const match = currentPath.match(/\/dashboard\/career-coach\/chat\/(thread_[\w\d]+)/);
    const matchCareerCoach = currentPath.match(/\/dashboard\/tutor\/chat\/(thread_[\w\d]+)/);
    const threadIdFromURL = match ? match[1] : matchCareerCoach ? matchCareerCoach[1] : null;
    if (assistActionOpenState === AssistAction.AUDIO_CHAT) {
      setCloseAudioChat(true);
      setTimeout(() => {
        setAssistActionOpenState(null);
      }, 200)
    } else {
      setAssistActionOpenState(null);
      if (threadIdFromURL) {
        fetchMessagesForChat(threadIdFromURL)
      }
    }
  }

  useEffect(() => {
    if (!assistActionOpenState) {
      setShouldFocus(true);
    }
  }, [assistActionOpenState]);

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

  const onSubmitFile = (file: any) => {
    setFiles(file);
  }

  const onSubmit = async (formData: FormData) => {
    setMessage("");
    if (assistActionOpenState === AssistAction.UPLOAD_FILE) {
      setAssistActionOpenState(null);
    };
    const inValue = formData.get("message") as string;
    const userId = user?.id;

    if (!inValue || !userId) {
      console.error("Missing message or userId");
      return;
    }

    const currentPath = window.location.href;
    const match = currentPath.match(/\/dashboard\/career-coach\/chat\/(thread_[\w\d]+)/);
    const matchCareerCoach = currentPath.match(/\/dashboard\/tutor\/chat\/(thread_[\w\d]+)/);
    const matchTeacher = currentPath.match(/\/dashboard\/teacher\/chat\/(thread_[\w\d]+)/);
    const threadIdFromURL = match ? match[1] : matchCareerCoach ? matchCareerCoach[1] : matchTeacher ? matchTeacher[1] : null;

    const assistantId = suggest?.assistantId;
    let assistantIdFromDB = assistantId;

    if (threadIdFromURL) {
      const tread: any = await fetchChatByTread(threadIdFromURL);
      assistantIdFromDB = tread?.[0]?.assistantId;
    }

    if (handleClose) {
      handleClose();
      handleResetChat();
    }

    // Calling `submitChat` from `useChat` hook
    await submitChat({
      message: inValue,
      userId,
      assistantId: assistantId || assistantIdFromDB,
      threadIdFromURL,
      files
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
  }, [messages]);

  return (
    <>
      <form
        action={onSubmit}
        className="rounded-[50px] md:max-h-16 mx-2  min-h-16  justify-between items-center lg:bg-navy-15 relative lg:border-t lg:border-t-grey-15 md:border-none flex flex-col"
      >
        <div className="relative hidden">
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
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2 items-center justify-center">
          <Icon type='Photogragph' className="w-6 h-6 cursor-pointer" onClick={() => openAssistAction(AssistAction.UPLOAD_FILE)} />
          <Icon type='Camera' className="w-6 h-6 cursor-pointer" onClick={() => openAssistAction(AssistAction.QUESTION_SCANNER)} />
        </div>
        <Textarea
          ref={setTextareaRef}
          value={message}
          // style={{
          //   padding: "20px 16px"
          // }}
          onChange={handleChange}
          className={cn(
            "pl-20 min-h-16 md:max-h-16 rounded-[50px] pt-5 md:py-5 focus:outline-none text-sm md:text-base overflow-hidden border-[1px] resize-none text-[#272E48] pr-16 lg:pr-48",
            isDark ? "lg:bg-[#F3F9ED]" : "lg:bg-navy-15"
          )}
          placeholder={isTutor ? "Ask any subject question..." : isCareerCoach ? "Ask any subject question..." : "Ask any subject question..."}
          name="message"
          onKeyDown={handleEnter}
        />
        <div className="flex items-center md:gap-3 py-3 absolute right-4 top-1/2 -translate-y-1/2">
          <Button variant="transparent" size="xl" type="submit" className="w-10 h-10 p-2 disabled:opacity-30 disabled:pointer-events-none" onClick={() => openAssistAction(AssistAction.AUDIO_CHAT)} disabled={assistActionOpenState === AssistAction.AUDIO_CHAT}>
            <Icon width="24" height="24" className="w-6 h-6" type="MicIcon" />
          </Button>
          <Button size="xl" type="submit" className="w-10 h-10 p-3 disabled:opacity-30 disabled:pointer-events-none" disabled={assistActionOpenState === AssistAction.AUDIO_CHAT}>
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Icon type="ArrowRightIcon" className="size-4 text-[#272E48]" />
            )}
          </Button>
        </div>
      </form>
      {!isUserUsingMobile && assistActionOpenState && <div ref={audioChatRef} className="w-full py-6">
        <AssistActions
          onClose={closeAssistAction}
        >
          {assistActionOpenState === AssistAction.AUDIO_CHAT && <AudioChat isClosed={closeAudioChat} chatContext={chatContext} onClose={closeAssistAction} />}
          {assistActionOpenState === AssistAction.UPLOAD_FILE && <FileUploader onSubmit={onSubmitFile} />}
          {assistActionOpenState === AssistAction.QUESTION_SCANNER && <QuestionScanner />}
        </AssistActions>
      </div>}
      {isUserUsingMobile && <Modal
        open={assistActionOpenState !== null}
        onClose={closeAssistAction}
        classes={{
          container: "!p-2 !w-[90%] md:w-[50%] flex items-center justify-center",
          background: "backdrop-blur-none",
          wrapper: "!w-[98%] md:!w-[40%] md:h-[50%] backdrop-blur-none bg-white rounded-xl",
        }}
      >
        {assistActionOpenState === AssistAction.AUDIO_CHAT && <AudioChat isClosed={closeAudioChat} chatContext={chatContext} onClose={closeAssistAction} />}
        {assistActionOpenState === AssistAction.UPLOAD_FILE && <FileUploader onSubmit={onSubmitFile} />}
        {assistActionOpenState === AssistAction.QUESTION_SCANNER && <QuestionScanner />}
      </Modal>}
    </>
  );
};

export { ChatMessageInput };
