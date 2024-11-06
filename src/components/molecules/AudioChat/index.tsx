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
import { useEffect, useRef, useState } from "react";

interface AudioChatProps {}

const AudioChat = () => {
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
  } = useVoiceChat(suggest?.assistantId);
  const clientCanvasRef = useRef<HTMLCanvasElement>(null);
  const serverCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { createMessage } = useChat();
  const { user } = useUser();

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
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-col gap-2">
        <Image
          width={512}
          height={512}
          src={"/images/f0f1946b-d4c4-4409-a22a-1d9ae2d34108-Photoroom 2.png"}
          alt=""
          objectFit="cover"
          className={"w-60 aspect-square"}
        />
      </div>
      <div className="h-20 flex flex-col items-center justify-center">
        {!isConnected && (
          <Button
            size="xl"
            className="w-10 h-10 p-3 !rounded-full bg-gray-500 hover:bg-gray-400 disabled:opacity-30 disabled:pointer-events-none"
            disabled={isConnecting}
            onClick={() => {
              connectConversation();
            }}
          >
            <PlusCircledIcon className="size-4" color="white" />
          </Button>
        )}
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
              onClick={() => {
                disconnectConversation();
              }}
            >
              {<Cross2Icon className="size-4 text-[#473513]" color="white" />}
            </Button>
          </div>
        }
      </div>
    </div>
  );
};

export { AudioChat };
