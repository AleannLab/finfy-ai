declare module 'react-voice-visualizer' {
    import { Dispatch, SetStateAction, MutableRefObject, FC } from 'react';
  
    export interface UseVoiceVisualizerOptions {
      onStartRecording?: () => void;
      onPausedRecording?: () => void;
      onResumedRecording?: () => void;
      onClearCanvas?: () => void;
      onEndAudioPlayback?: () => void;
      onStartAudioPlayback?: () => void;
      onPausedAudioPlayback?: () => void;
      onResumedAudioPlayback?: () => void;
      onStopRecording?: (e: any) => void;
      onAudioData?: (e: any) => void;
      onErrorPlayingAudio?: (error: Error) => void;
      shouldHandleBeforeUnload?: boolean;
    }
  
    export interface RecorderControls {
      audioRef: MutableRefObject<HTMLAudioElement | null>;
      isRecordingInProgress: boolean;
      isPausedRecording: boolean;
      audioData: Uint8Array;
      recordingTime: number;
      mediaRecorder: MediaRecorder | null;
      duration: number;
      currentAudioTime: number;
      audioSrc: string;
      isPausedRecordedAudio: boolean;
      isProcessingRecordedAudio: boolean;
      isCleared: boolean;
      isAvailableRecordedAudio: boolean;
      recordedBlob: Blob | null;
      bufferFromRecordedBlob: AudioBuffer | null;
      formattedDuration: string;
      formattedRecordingTime: string;
      formattedRecordedAudioCurrentTime: string;
      startRecording: () => void;
      togglePauseResume: () => void;
      startAudioPlayback: () => void;
      stopAudioPlayback: () => void;
      stopRecording: () => void;
      saveAudioFile: () => void;
      clearCanvas: () => void;
      setCurrentAudioTime: Dispatch<SetStateAction<number>>;
      error: Error | null;
      isProcessingOnResize: boolean;
      isProcessingStartRecording: boolean;
      isPreloadedBlob: boolean;
      setPreloadedAudioBlob: (blob: Blob) => void;
      _setIsProcessingAudioOnComplete: Dispatch<SetStateAction<boolean>>;
      _setIsProcessingOnResize: Dispatch<SetStateAction<boolean>>;
    }
  
    export function useVoiceVisualizer(options?: UseVoiceVisualizerOptions): RecorderControls;
  
    export interface VoiceVisualizerProps {
      controls: RecorderControls;
      height?: string | number;
      width?: string | number;
      backgroundColor?: string;
      mainBarColor?: string;
      secondaryBarColor?: string;
      speed?: number;
      barWidth?: number;
      gap?: number;
      rounded?: number;
      isControlPanelShown?: boolean;
      isDownloadAudioButtonShown?: boolean;
      fullscreen?: boolean;
      animateCurrentPick?: boolean;
      onlyRecording?: boolean;
      isDefaultUIShown?: boolean;
      mainContainerClassName?: string;
      canvasContainerClassName?: string;
      isProgressIndicatorShown?: boolean;
      progressIndicatorClassName?: string;
      isProgressIndicatorTimeShown?: boolean;
      progressIndicatorTimeClassName?: string;
      isProgressIndicatorOnHoverShown?: boolean;
      progressIndicatorOnHoverClassName?: string;
      isProgressIndicatorTimeOnHoverShown?: boolean;
      progressIndicatorTimeOnHoverClassName?: string;
      isAudioProcessingTextShown?: boolean;
      audioProcessingTextClassName?: string;
      controlButtonsClassName?: string;
    }
  
    export const VoiceVisualizer: FC<VoiceVisualizerProps>;
  }
  