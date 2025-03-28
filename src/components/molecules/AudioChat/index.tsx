"use client";

import { WavRecorder } from "@/lib/wavtools";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { config } from "@/config/env";
import WaveSurfer from "wavesurfer.js";
import { createWavFile } from "./createWavFile";
import { SubmitAudio } from "./SubmitAudio";
import { CloseButton } from "./CloseButton";
import { LoadButton } from "./LoadButton";
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';

interface AudioChatProps {
  onClose: () => void;
  handleChange: (text: string) => void;
  isClosed: boolean;
  chatContext: string;
}

const AudioChat = ({ onClose, isClosed, chatContext = "", handleChange }: AudioChatProps) => {
  const [isFirst, setIsFirst] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const waveformContainerRef = useRef<HTMLDivElement>(null);
  const wavRecorderRef = useRef(new WavRecorder({ sampleRate: 24000 }));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // const { wavesurfer } = useWavesurfer({
  //   container: waveformContainerRef,
  //   waveColor: '#666',
  //   progressColor: '#4a90e2',
  //   cursorWidth: 2,
  //   height: 40,
  //   url: "/sounds/test_audio.wav",
  //   plugins: [Timeline.create()],
  // });

  const stopRecording = async () => {
    const wavRecorder = wavRecorderRef.current;

    if (!wavRecorder) return;

    try {
      if (wavRecorder.recording) {
        console.log("🛑 Stopping recording...");
        await wavRecorder.end();

        if (wavRecorder.stream) {
          wavRecorder.stream.getTracks().forEach(track => track.stop());
          wavRecorder.stream = null;
        }

        if (intervalRef.current) clearInterval(intervalRef.current);

        console.log("✅ Recording successfully stopped.");
      }
    } catch (error) {
      console.error("❌ Error during stopping recording:", error);
    }
  };

  const startRecording = async () => {
    const wavRecorder = wavRecorderRef.current;

    if (!wavRecorder) return;

    if (wavRecorder.recording) {
      console.log("⚠️ Recording is already active.");
      return;
    }

    try {
      await wavRecorder.begin();
      console.log("🎙️ Recording started.");

      wavRecorder.record((data) => {
        setAudioChunks((prevChunks) => [...prevChunks, data.mono]);

        const newBlob = new Blob([data.mono], { type: "audio/wav" });
        if (newBlob.size > 0) {
          setAudioBlob(newBlob);
        }
      });

      intervalRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);

    } catch (error) {
      console.error("❌ Error on starting recording:", error);
    }
  };

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      startRecording();
    }
  }, []);

  const handleSendTranscription = async () => {
    if (audioChunks.length === 0) return;

    try {
      const finalAudioBlob = await createWavFile(audioChunks);

      const formData = new FormData();
      formData.append("file", finalAudioBlob, "audio.wav");
      formData.append("model", "whisper-1");
      formData.append("language", "en");

      const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: { "Authorization": `Bearer ${config.REAL_TIME_CLIENT}` }
      });

      const text = response.data.text;
      if (text.trim()) handleChange(text.trim());

      console.log("✅ Transcription completed successfully.");
    } catch (error) {
      console.error("❌ Error in transcription process:", error);
    }

    setAudioChunks([]);
  };

  const handleAddAnswer = async () => {
    await handleSendTranscription();
    await stopRecording();
    onClose();
    setClicked(true);
  };

  const handleClose = async () => {
    await stopRecording();
    handleChange("");
    onClose();
  };

  return (
    <div className="flex gap-6 mt-2 md:gap-8 w-full max-h-10 items-center justify-between">
      <CloseButton onClick={() => handleClose()} />
      
      <div className="w-full h-10 relative overflow-hidden">
        <div ref={waveformContainerRef} className="w-full h-full"></div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-black">
          {Math.floor(recordingTime / 60)}:{('0' + (recordingTime % 60)).slice(-2)}
        </div>
      </div>
      
      {clicked ? <LoadButton /> : <SubmitAudio onClick={() => handleAddAnswer()} />}
    </div>
  );
};

export { AudioChat };
