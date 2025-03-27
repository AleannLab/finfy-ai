"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WavRecorder, WavStreamPlayer } from "@/lib/wavtools";
import { RealtimeClient } from "@openai/realtime-api-beta";
import { instructions } from "@/lib/prompt";
import { ReactNode } from "react";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client";
import { config } from "@/config/env";
import { defaultTutor, tutorSuggestionData } from "@/lib/store/features/suggest/suggestSlice";
// import Resume from "@/features/chat/components/resume";
// import ScheduleButton from "@/features/chat/components/scheduleButton";

type ItemTypeWithStatus = ItemType & {
    status: 'completed' | 'in_progress' | 'incomplete'
}

const useVoiceChat = (instructionsForAssistant?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTalking, setIsTalking] = useState(false);
  const [isListening, setIsListening] = useState<any>();
  const [currentTool, setCurrentTool] = useState<ReactNode | null>(null);
  const [items, setItems] = useState<ItemTypeWithStatus[]>([]);

  const startTimeRef = useRef(new Date().toISOString());
  const wavRecorderRef = useRef(new WavRecorder({ sampleRate: 24000 }));
  const wavStreamPlayerRef = useRef(new WavStreamPlayer({ sampleRate: 24000 }));
  const clientRef = useRef<RealtimeClient>(
    new RealtimeClient({
      apiKey:
      config.REAL_TIME_CLIENT,
      dangerouslyAllowAPIKeyInBrowser: true,
    })
  );


  const connectConversation = useCallback(async () => {
    if (!clientRef.current) return;
    const { current: client } = clientRef;
    const { current: wavRecorder } = wavRecorderRef;
    const { current: wavStreamPlayer } = wavStreamPlayerRef;

    startTimeRef.current = new Date().toISOString();
    setIsConnected(true);

    await Promise.all([
      wavRecorder.begin(),
      wavStreamPlayer.connect(),
      client.connect(),
    ]);

    setItems(client.conversation.getItems() as ItemTypeWithStatus[]);
    client.sendUserMessageContent([{ type: "input_text", text: "Hello!" }]);
  }, []);

  const disconnectConversation = useCallback(async () => {
    setIsConnected(false);
    if (clientRef.current) clientRef.current.disconnect();
    await wavRecorderRef.current.end();
    wavStreamPlayerRef.current.interrupt();
    setIsMuted(true);
    setItems([]);
  }, []);

  useEffect(() => {
    if (!clientRef.current) return;

    const wavStreamPlayer = wavStreamPlayerRef.current;
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;

    client.updateSession({
      instructions: instructionsForAssistant ? instructionsForAssistant : instructions,
      voice: "echo",
      input_audio_transcription: { model: "whisper-1" },
      turn_detection: { type: "server_vad" },
    });



    client.realtime.on("server.error", async (error: unknown) => {
      console.error(error);
      disconnectConversation();
    });

    client.on("conversation.interrupted", async () => {
      const trackSampleOffset = wavStreamPlayer.interrupt();
      if (trackSampleOffset?.trackId) {
        client.cancelResponse(
          trackSampleOffset.trackId,
          trackSampleOffset.offset
        );
        setIsTalking(false);
      }
    });
    client.on("conversation.updated", async ({ item, delta }: any) => {
      const items = client.conversation.getItems();
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
        setIsTalking(true);
      }
      if (item.status === "completed" && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        );
        item.formatted.file = wavFile;

        // Set a timeout to set isTalking to false after Marvin's audio finishes
        if (item.role === "assistant") {
          // Calculate the duration of the audio in milliseconds
          const audioDurationMs = (item.formatted.audio.length / 24000) * 1000;
          setTimeout(() => setIsTalking(false), audioDurationMs);
        }
      }
      setItems(items as ItemTypeWithStatus[]);
    });

    setItems(client.conversation.getItems() as ItemTypeWithStatus[]);

    return () => {
      // cleanup; resets to defaults
      client.reset();
    };
  }, []);

  const sendTextMessage = (input: string) => {
    clientRef.current?.sendUserMessageContent([
      { type: "input_text", text: input },
    ]);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (isMuted) {
      wavRecorderRef.current.record((data) =>
        clientRef.current?.appendInputAudio(data.mono)
      );
    } else {
      wavRecorderRef.current.pause();
    }
  };

  return {
    isConnected,
    isTalking,
    isListening,
    isMuted,
    connectConversation,
    disconnectConversation,
    currentTool,
    sendTextMessage,
    toggleMute,
    wavRecorderRef,
    wavStreamPlayerRef,
    items
  };
};

export default useVoiceChat;
