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
import { careerCoach, careerCoachAssistantSuggestionData, defaultCareerCoachAssistant, defaultTeacher, defaultTutor, setFocusSuggests, setSuggest, setSuggests, teacher, teacherSuggestionData, tutor, tutorSuggestionData } from "@/lib/store/features/suggest/suggestSlice";

interface ChatMessageInputProps {
  handleClose?: () => void;
  isDark?: boolean;
  assistActionOpenState: AssistAction | null;
  setAssistActionOpenState: (value: AssistAction | null) => void;
  disable?: any
}

const ChatMessageInput: FC<ChatMessageInputProps> = ({ handleClose, isDark = false, assistActionOpenState, setAssistActionOpenState, disable }) => {
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
      setShouldFocus(true && window.innerWidth > 1024);
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

  const fetchDataBasedOnRole = async (role: string, threadMatchPattern: RegExp, dataSet: any[], defaultSuggest: { label: string; content: string; icon: string; category: string; assistantId: string; instructions: string; }) => {
    const currentPath = window.location.href;
    const match = currentPath.match(threadMatchPattern);
    const threadIdFromURL = match ? match[1] : null;
    let assistantIdFromDB = null;

    if (threadIdFromURL) {
      const tread: any = await fetchChatByTread(threadIdFromURL);
      assistantIdFromDB = tread?.[0]?.assistantId;
    }

    const currentAssistant = dataSet.filter((item: { assistantId: any; }) => item?.assistantId === assistantIdFromDB)?.[0];
    dispatch(setSuggest(currentAssistant || defaultSuggest));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (pathname.includes('tutor')) {
        await fetchDataBasedOnRole(
          'tutor',
          /\/dashboard\/tutor\/chat\/(thread_[\w\d]+)/,
          tutor,
          defaultTutor
        );
      }

      if (pathname.includes('career-coach')) {
        await fetchDataBasedOnRole(
          'career-coach',
          /\/dashboard\/career-coach\/chat\/(thread_[\w\d]+)/,
          careerCoach,
          defaultCareerCoachAssistant
        );
      }

      if (pathname.includes('teacher')) {
        await fetchDataBasedOnRole(
          'teacher',
          /\/dashboard\/teacher\/chat\/(thread_[\w\d]+)/, // Adjust the pattern if needed
          teacher,
          defaultTeacher
        );
      }
    };

    fetchData();
  }, [pathname]);

  const onSubmit = async (formData: FormData) => {
    const inValue = formData.get("message") as string;
    const userId = user?.id;
    if (!inValue || !userId) {
      console.error("Missing message or userId");
      toast.error("You can't send message without any text")
      return;
    }
    setMessage("");
    if (assistActionOpenState === AssistAction.UPLOAD_FILE) {
      setAssistActionOpenState(null);
    };


    //TODO do

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
    setFiles(null);
  };



  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(disable) {
      return
    }
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
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const SubmitButton = ({ isLoading, disable }: any) => {
    return (
      <button
        disabled={disable || isLoading}
        type="submit"
        className={cn("h-[40px] w-[40px] flex items-center justify-center rounded-full transition-all", disable ? "bg-[#666]" : "bg-black")}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          <Icon type="ArrowRightIcon" className="size-4 text-[#272E48]" />
        )}
      </button>
    );
  };

  const cutIcon = (title: any) => {
    const arr = title?.split(" ")
    return arr?.slice(1, arr?.length)?.join(" ")
  }

  return (
    <>
      <form
        action={onSubmit}
        className={cn("flex flex-col items-center overflow-hidden p-4 text-base text-[#666] font-medium rounded-3xl border border-[#e9e9e9] shadow-[0px_0px_30px_0px_rgba(38,38,38,0.04)] relative w-full min-h-[80px]", disable ? "bg-[#EFEFEF4D]" : "bg-white")}
        style={{ height: textareaHeight }}
      >
        <textarea
          disabled={disable}
          value={message}
          onChange={(e) => {
            handleChange(e);

            e.target.style.height = "auto";

            const baseHeight = Math.min(Math.max(e.target.scrollHeight, 48), 200);
            const adjustedHeight = window.innerWidth <= 768 ? baseHeight * 0.8 : baseHeight;

            if (window.innerWidth <= 768) {
              e.target.style.height = `${adjustedHeight}px`;
              e.target.style.overflowY = "auto";
              e.target.style.scrollbarWidth = "thin";
            } else {
              e.target.style.height = `${adjustedHeight}px`;
            }

            setTextareaHeight(`${adjustedHeight + 90}px`);
          }}

          className="w-full resize-none min-h-[40px] max-h-[200px] outline-none overflow-y-auto"
          placeholder={suggest?.title ? `Ask me any ${cutIcon(suggest?.title)} question...` : "Ask follow-up question..."}
          name="message"
          onKeyDown={handleEnter}
        />
        <div className="flex w-full justify-between mt-2">
          <div className="relative flex items-center">
            {isPopupOpen && (
              <div className="absolute left-0 bottom-12 bg-white p-2 rounded-md border shadow-md z-50 flex gap-2">
                <Icon type='Photogragph' className="w-6 h-6 cursor-pointer" onClick={() => openAssistAction(AssistAction.UPLOAD_FILE)} />
                <Icon type='Camera' className="w-6 h-6 cursor-pointer" onClick={() => openAssistAction(AssistAction.QUESTION_SCANNER)} />
              </div>
            )}
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 p-2 rounded-full border border-gray-300 "
              onClick={() => setIsPopupOpen(!isPopupOpen)}
            >
              <div data-svg-wrapper>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#E9E9E9" />
                  <path
                    d="M19.9987 13.3335V26.6668M26.6654 20.0002L13.332 20.0002"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
          <div className="flex items-center ml-3">
            <button
              type="button"
              className="h-[40px] w-[40px] flex items-center justify-center mr-2"
              onClick={() => openAssistAction(AssistAction.AUDIO_CHAT)}
            >
              <Icon width="24" height="24" className="w-6 h-6" type="MicIcon" />
            </button>
            <SubmitButton disable={disable} isLoading={isLoading} />
          </div>
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
