"use client";

import { useChat, useUser } from "@/hooks";
import { useAppSelector } from "@/lib/store/hooks";
import { WavRecorder } from "@/lib/wavtools";
import axios from "axios";

import { useEffect, useMemo, useRef, useState } from "react";
import { config } from "@/config/env";
import clsx from "clsx";
import { createWavFile } from "./createWavFile";

interface AudioChatProps {
  onClose: () => void;
  handleChange: (text: string) => void;
  isClosed: boolean;
  chatContext: string;
}

const AudioChat = ({ onClose, isClosed, chatContext = "", handleChange }: AudioChatProps) => {
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const { createMessage, submitChat, sendAudioChatContext, fetchMessagesForChat } = useChat();
  const { user } = useUser();
  const userId = user?.id;

  const [isMuted, setIsMuted] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
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
            wavRecorder.stream.getTracks().forEach(track => track.stop());
            console.log("🎙️ Muted.");
          }

          await wavRecorder.end();
        } catch (error) {
          console.error("❌ Error in recording process:", error);
        }
      } else {
        console.log("⚠️ No active recording.");
      }
    }
  };

  useEffect(() => {
    if (isMuted && isFirst) {
      setIsFirst(false)
      toggleMute();
    }
  }, [])


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
        handleChange(text.trim())
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

  const handleAddAnswer = async () => {
    await toggleMute();
    await handleSendTranscription();
    onClose()
  };

  return (
    <div
      className={clsx(
        "flex gap-6 md:gap-8 w-full max-h-10 items-center justify-between"
      )}
    >
      <button type="button" onClick={async () => {
        await toggleMute();
        onClose()
        handleChange("")
      }}
        className="w-10 h-10 p-3 bg-[#e9e9e9] rounded-[50px] shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.15)] outline outline-1 outline-[#e9e9e9] inline-flex justify-center items-center overflow-hidden"
      >
        <div className="w-4 h-4 relative overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 12L12 4M4 4L12 12" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </button>
      {/* тут має бути дорожка */}
      <button onClick={handleAddAnswer}
        type="button" className="w-10 h-10 p-3 bg-black rounded-[50px] shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.15)] outline outline-1 outline-black inline-flex justify-center items-center overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.33594 8.66797L6.0026 11.3346L12.6693 4.66797" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export { AudioChat };


// import { SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";

{/* <div
className="flex gap-2 items-center justify-center w-[40px] h-[40px] p-3 !rounded-full bg-[#666666]"
>
{isMuted ? (
  <SpeakerOffIcon className="size-6" color="white" />
) : (
  <SpeakerLoudIcon className="size-6" color="white" />
)}
</div> */}