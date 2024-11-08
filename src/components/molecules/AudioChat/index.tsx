"use client";

import { Button } from "@/components/atoms";
import { useChat, useUser } from "@/hooks";
import useVoiceChat from "@/hooks/useVoiceChat";
import { useAppSelector } from "@/lib/store/hooks";
import { WavRenderer } from "@/lib/wavtools";
import {
  Cross2Icon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
  PlusCircledIcon
} from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

interface AudioChatProps {
    onClose: () => void;
    isClosed: boolean;
    chatContext: string;
    isMobile?: boolean;
}

const AudioChat = ({ onClose, isClosed, chatContext = "", isMobile }: AudioChatProps) => {
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const {
    connectConversation,
    toggleMute,
    isConnected,
    isMuted,
    isTalking,
    disconnectConversation,
    isListening,
    wavRecorderRef,
    wavStreamPlayerRef,
    items
  } = useVoiceChat(suggest?.instructions + chatContext);

  const clientCanvasRef = useRef<HTMLCanvasElement>(null);
  const serverCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { createMessage, submitChatFromAudioChat } = useChat();
  const { user } = useUser();
  const [processedIds, setProcessedIds] = useState(new Set());
  const [preparedMessagesToStore, setPreparedMessagesToStore] = useState<{ id: string, role: string, message: string }[]>([]);
  const conversationStarted = useRef(false)

  const userId = useMemo(() => {
    return user?.id;
  },[user]);

  const threadId = useMemo(() => {
    const currentPath = window.location.href;
    const match = currentPath.match(/\/dashboard\/career-coach\/chat\/(thread_[\w\d]+)/);
    const matchCareerCoach = currentPath.match(/\/dashboard\/tutor\/chat\/(thread_[\w\d]+)/);
    const threadIdFromURL = match ? match[1] : matchCareerCoach ? matchCareerCoach[1] : null;

    return threadIdFromURL;
  },[window.location.href]);

  useEffect(() => {
    if (!conversationStarted.current) {
        conversationStarted.current = true
        connectConversation();
    }
  },[conversationStarted]);

  useEffect(() => {
    const processMessages = () => {
      items.forEach((item) => {
        const { id, formatted } = item;

        if (!processedIds.has(id) && item.role && item.status === 'completed' && (formatted.text || formatted.transcript)) {
          setProcessedIds((prevIds) => new Set(prevIds).add(id));

          if (formatted.text && formatted.text.trim() !== "") {
            storeMessage(formatted.text, item.role);
          } else if (formatted.transcript && formatted.transcript.trim().length > 0) {
            storeMessage(formatted.transcript, item.role);
          }
        }
      });
    };
    const prepareMessagesToStore = () => {
        items.forEach((item) => {
            const { id, formatted, status, role } = item;
            if (role === 'user') {
                const messageText = formatted.text || formatted.transcript || "";
                if (!processedIds.has(id)) {
                    setProcessedIds((prevIds) => new Set(prevIds).add(id));
                    setPreparedMessagesToStore((prev) => [...prev, { id: id, role: role as string, message: messageText }]);
                } else {
                   if (status === 'completed') {
                    const updatedPreparedMessages = preparedMessagesToStore.map((msg) => {
                        if (msg.id === id) {
                            return { id: id, role: role as string, message: messageText }
                        }

                        return msg;
                    });
                    setPreparedMessagesToStore(updatedPreparedMessages);
                   } 
                }
            } else if (role === 'assistant') {
                const messageText = formatted.text || formatted.transcript || "";
                if (!processedIds.has(id) && status === 'completed') {
                    setProcessedIds((prevIds) => new Set(prevIds).add(id));
                    setPreparedMessagesToStore((prev) => [...prev, { id: id, role: role as string, message: messageText }]);
                }
            }
          });
    }
    if (threadId) {
        processMessages();
    } else {
        prepareMessagesToStore();
    }
  }, [items, processedIds, threadId]);

const storeMessage = (content: string, role: string) => {

    const dataForStore = {
        chat_id: threadId,
        user_id: userId,
        content,
        message_type: role,
        is_processed: true,
    }

    createMessage(dataForStore)
};

const handleDisconnectChat = async () => {
    disconnectConversation();
    onClose();
    if (!threadId && preparedMessagesToStore.length > 0) {
        await submitChatFromAudioChat({ messages: preparedMessagesToStore, assistantId: suggest?.assistantId || "", userId: userId })
    }
}

  useEffect(() => {
    if (isClosed) {
        handleDisconnectChat();
    }
  },[isClosed]);

  useEffect(() => {
    let isLoaded = true;

    const wavRecorder = wavRecorderRef.current;
    const clientCanvas = clientCanvasRef.current;
    let clientCtx: CanvasRenderingContext2D | null = null;

    const wavStreamPlayer = wavStreamPlayerRef.current;
    const serverCanvas = serverCanvasRef.current;
    let serverCtx: CanvasRenderingContext2D | null = null;

    const render = () => {
      if (isLoaded) {
        if (clientCanvas) {
          if (!clientCanvas.width || !clientCanvas.height) {
            clientCanvas.width = clientCanvas.offsetWidth;
            clientCanvas.height = clientCanvas.offsetHeight;
          }
          clientCtx = clientCtx || clientCanvas.getContext("2d");
          if (clientCtx) {
            clientCtx.clearRect(0, 0, clientCanvas.width, clientCanvas.height);
            const result = wavRecorder.recording
              ? wavRecorder.getFrequencies("voice")
              : { values: new Float32Array([0]) };
            WavRenderer.drawBars(
              clientCanvas,
              clientCtx,
              result.values,
              "#0099ff",
              10,
              0,
              8
            );
          }
        }
        if (serverCanvas) {
          if (!serverCanvas.width || !serverCanvas.height) {
            serverCanvas.width = serverCanvas.offsetWidth;
            serverCanvas.height = serverCanvas.offsetHeight;
          }
          serverCtx = serverCtx || serverCanvas.getContext("2d");
          if (serverCtx) {
            serverCtx.clearRect(0, 0, serverCanvas.width, serverCanvas.height);
            const result = wavStreamPlayer.analyser
              ? wavStreamPlayer.getFrequencies("voice")
              : { values: new Float32Array([0]) };
            WavRenderer.drawBars(
              serverCanvas,
              serverCtx,
              result.values,
              "#009900",
              10,
              0,
              8
            );
          }
        }
        window.requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      isLoaded = false;
    };
  }, []);

  return (
    <div className={clsx("relative flex flex-col gap-6 md:gap-12 items-center justify-center", {"p-12 rounded-[24px] border border-[#E2EAFB] bg-gradient-to-r from-[rgba(255,255,255,0.3)] via-[rgba(255,255,255,0.3)] to-[rgba(247,248,252,0.3)] shadow-[inset_4px_4px_40px_0px_#FFF,0px_4px_30px_0px_rgba(54,80,127,0.1)] backdrop-blur-[7.5px]": !isMobile })}>
      {!isMobile && <div className="absolute top-4 right-2 md:top-6 md:right-6 cursor-pointer" onClick={handleDisconnectChat}><Cross2Icon className="size-4 text-[#547A91]" color="#547A91" /></div>}
      <div className="flex flex-col gap-2">
        <Image
          width={512}
          height={512}
          src={"/images/f0f1946b-d4c4-4409-a22a-1d9ae2d34108-Photoroom 2.png"}
          alt=""
          objectFit="cover"
          className={"w-60 aspect-square opacity-80"}
        />
      </div>
      <div className="h-20 flex flex-col items-center justify-center">
        {/* {!conversationStarted && (
          <Button
            size="xl"
            className="start-conversation w-10 h-10 p-3 !rounded-full bg-gray-500 hover:bg-gray-400 disabled:opacity-30 disabled:pointer-events-none"
            disabled={isConnecting}
            onClick={() => {
              connectConversation();
            }}
          >
            <PlusCircledIcon className="size-4" color="white" />
          </Button>
        )} */}
        {
          <div
            className={clsx(
              "w-full flex gap-2 items-center justify-center",
              { "opacity-100": isConnected },
              { "opacity-0": !isConnected }
            )}
          >
            <Button
              size="xl"
              className="w-10 h-10 p-3 !rounded-full bg-gray-500 hover:bg-gray-400 disabled:opacity-30 disabled:pointer-events-none"
              disabled={isConnecting}
              onClick={() => {
                toggleMute()
              }}
            >
              {isMuted && <SpeakerOffIcon className="size-4" color="white" />}
              {!isMuted && <SpeakerLoudIcon className="size-4" color="white" />}
            </Button>
            {
              <div className=" p-1 z-10 flex gap-0.5 rounded-lg visualization">
                <div className="relative flex items-center h-10 w-24 gap-1 text-blue-500 visualization-entry client">
                  <canvas ref={clientCanvasRef} className="w-full h-full" />
                </div>
                <div className="relative flex items-center h-10 w-24 gap-1 text-green-600 visualization-entry server">
                  <canvas ref={serverCanvasRef} className="w-full h-full" />
                </div>
              </div>
            }
            <Button
              size="xl"
              className="w-10 h-10 p-3 !rounded-full bg-red-500 hover:bg-red-400 disabled:opacity-30 disabled:pointer-events-none"
              disabled={!isConnected || isConnecting}
              onClick={handleDisconnectChat}
            >
              {<Cross2Icon className="size-4 text-[#547a91]" color="white" />}
            </Button>
          </div>
        }
      </div>
    </div>
  );
};

export { AudioChat };
