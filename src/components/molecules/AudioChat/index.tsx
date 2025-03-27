"use client";

import { Button, Icon } from "@/components/atoms";
import { useChat, useUser } from "@/hooks";
import { useAppSelector } from "@/lib/store/hooks";
import { WavRecorder } from "@/lib/wavtools";
import axios from "axios";
import {
  Cross2Icon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { config } from "@/config/env";
import { fetchChatByTread } from "@/lib/store/features/chat/chatSlice";

interface AudioChatProps {
  onClose: () => void;
  isClosed: boolean;
  chatContext: string;
}

const AudioChat = ({ onClose, isClosed, chatContext = "" }: AudioChatProps) => {
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const { createMessage, submitChat, sendAudioChatContext, fetchMessagesForChat } = useChat();
  const { user } = useUser();
  const userId = user?.id;

  const [isMuted, setIsMuted] = useState(true);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [preparedMessagesToStore, setPreparedMessagesToStore] = useState<
    { id: string; role: string; message: string }[]
  >([]);
  const wavRecorderRef = useRef(new WavRecorder({ sampleRate: 24000 }));


  const toggleMute = async () => {
    const wavRecorder = wavRecorderRef.current;

    if (!wavRecorder) {
      console.error("❌ WavRecorder.");
      return;
    }

    if (isMuted) {
      if (!wavRecorder.recording) {
        try {
          await wavRecorder.begin();
          wavRecorder.record((data) => {
            setAudioChunks((prevChunks) => [...prevChunks, data.mono]);
          });

          setIsMuted(false);
        } catch (error) {
          console.error("❌ Error on start recording:", error);
        }
      } else {
        console.log("⚠️ Recording already active.");
      }
    } else {
      if (wavRecorder.recording) {
        console.log("🛑 Pause...");
        try {
          wavRecorder.pause();
          setIsMuted(true);

          if (wavRecorder.stream) {
            wavRecorder.stream.getTracks().forEach(track => track.stop()); // Вимикаємо мікрофон
            console.log("🎙️ Muted.");
          }

          await wavRecorder.end(); // Завершуємо запис
        } catch (error) {
          console.error("❌ Error in recording process:", error);
        }
      } else {
        console.log("⚠️ No active recording.");
      }
    }
  };



  const createWavFile = async (audioChunks: BlobPart[]) => {
    const blob = new Blob(audioChunks, { type: "audio/wav" });
    const arrayBuffer = await blob.arrayBuffer();
    const view = new DataView(arrayBuffer);

    const header = new ArrayBuffer(44);
    const headerView = new DataView(header);

    const sampleRate = 24000;
    const numChannels = 1;
    const bitsPerSample = 16;
    const dataSize = view.byteLength;
    const fileSize = 36 + dataSize;

    headerView.setUint32(0, 0x52494646, false);
    headerView.setUint32(4, fileSize, true);
    headerView.setUint32(8, 0x57415645, false);

    headerView.setUint32(12, 0x666d7420, false);
    headerView.setUint32(16, 16, true);
    headerView.setUint16(20, 1, true);
    headerView.setUint16(22, numChannels, true);
    headerView.setUint32(24, sampleRate, true);
    headerView.setUint32(28, sampleRate * numChannels * bitsPerSample / 8, true);
    headerView.setUint16(32, numChannels * bitsPerSample / 8, true);
    headerView.setUint16(34, bitsPerSample, true);

    headerView.setUint32(36, 0x64617461, false);
    headerView.setUint32(40, dataSize, true);

    const wavArray = new Uint8Array(header.byteLength + arrayBuffer.byteLength);
    wavArray.set(new Uint8Array(header), 0);
    wavArray.set(new Uint8Array(arrayBuffer), header.byteLength);

    return new Blob([wavArray], { type: "audio/wav" });
  };


  const transcribeAudio = async () => {
    if (audioChunks.length === 0) {
      console.log("⚠️ No audio");
      return;
    }

    const audioBlob = await createWavFile(audioChunks);

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");
    formData.append("model", "whisper-1");
    formData.append("language", "en");
    try {
      const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: {
          "Authorization": `Bearer ${config.REAL_TIME_CLIENT}`
        },
      });

      const text = response.data.text;

      if (text.trim()) {
        const userId = user?.id;
        const currentPath = window.location.href;
        const match = currentPath.match(/\/dashboard\/career-coach\/chat\/(thread_[\w\d]+)/);
        const matchCareerCoach = currentPath.match(/\/dashboard\/tutor\/chat\/(thread_[\w\d]+)/);
        const matchTeacher = currentPath.match(/\/dashboard\/teacher\/chat\/(thread_[\w\d]+)/);
        const threadIdFromURL = match ? match[1] : matchCareerCoach ? matchCareerCoach[1] : matchTeacher ? matchTeacher[1] : null;

        const assistantId = suggest?.assistantId;//
        let assistantIdFromDB = assistantId;

        if (threadIdFromURL) {
          const tread: any = await fetchChatByTread(threadIdFromURL);
          assistantIdFromDB = tread?.[0]?.assistantId;
        }

        if (userId) {
          await submitChat({
            message: text,
            userId,
            assistantId: suggest?.assistantId || assistantIdFromDB,
            threadIdFromURL: threadIdFromURL,
            files: null,
            prompt
          });
        }

      }

    } catch (error) {
      console.error("❌ Error:", error);
    }

    console.log("🧹 Clear audio.");
    setAudioChunks([]);
  };



  const handleSendTranscription = async () => {
    console.log("🛑 Stop recording...");
    await transcribeAudio();
    if (wavRecorderRef.current?.recording) {
      await wavRecorderRef.current.end();
    }
  };

  const handleDisconnectChat = async () => {
    await handleSendTranscription();
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendTranscription();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isClosed) {
      handleDisconnectChat();
    }
  }, [isClosed]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-6 md:gap-8 items-center justify-center"
      )}
    >
      <div className="flex flex-col mb-12 gap-1">
        {/* <Image
          width={512}
          height={512}
          src={"/images/f0f1946b-d4c4-4409-a22a-1d9ae2d34108-Photoroom 2.png"}
          alt=""
          objectFit="cover"
          className={"w-36 aspect-square opacity-80"}
        /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="76" viewBox="0 0 88 76" fill="none">
          <path d="M55.9365 31.5084L88 76H23.8731L55.9365 31.5084Z" fill="black" />
          <path d="M32.0635 44.4916L0 0L64.1269 4.33054e-06L32.0635 44.4916Z" fill="black" />
        </svg>
      </div>
      <div className="self-stretch inline-flex justify-center items-center gap-2">
        <div className="justify-start text-black text-sm font-semibold leading-tight">Start speaking</div>
      </div>
      <div className="h-20 flex flex-col items-center justify-center">
        <div
          className={clsx(
            "w-full flex gap-6 items-center justify-center"
          )}
        >
          <Button
            size="xl"
            className="flex gap-2 items-center justify-center w-[60px] h-[60px] p-3 !rounded-full bg-[#666666] hover:bg-gray-400 disabled:opacity-30 disabled:pointer-events-none"
            onClick={toggleMute}
          >
            {isMuted ? (
              <SpeakerOffIcon className="size-6" color="white" />
            ) : (
              <SpeakerLoudIcon className="size-6" color="white" />
            )}
          </Button>
          <div className="flex gap-2 items-center justify-center w-[60px] h-[60px] bg-[#666666] rounded-full">
            <Icon
              width="24"
              height="24"
              className="w-6 h-6 !stroke-white !text-[#fff]"
              type="MicIcon"
            />
          </div>
          <Button
            size="xl"
            className="flex gap-2 items-center justify-center w-[60px] h-[60px] !rounded-full bg-red-500 hover:bg-red-400"
            onClick={handleDisconnectChat}
          >
            <Cross2Icon className="size-4 text-[#666]" color="white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { AudioChat };
