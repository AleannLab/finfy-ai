"use client";

import { AssistInput, Conversation } from "@/components/organisms";
import { Button, Icon } from "@/components/atoms";
import { ChatMessageInput, DynamicChart, Header, HeaderText, HomeSuggestBoxes } from "@/components/molecules";
import { FC, PropsWithChildren, useState } from "react";
import { useChat, useDynamicChart, useUser } from "@/hooks";
import { DesktopChartModal } from "@/components/molecules/DesktopChartModal/DesktopChartModal";
import { MobileChartModal } from "@/components/molecules/MobileChartModal/MobileChartModal";
import { cn } from "@/lib/utils";
import { HeaderFocus } from "@/components/molecules/HeaderText";
import { useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";

export enum AssistAction {
  AUDIO_CHAT = 'audio-chat',
  UPLOAD_FILE = 'upload-file',
  QUESTION_SCANNER = 'question-scanner'
}

interface LayoutDashboardProps extends PropsWithChildren { }

const LayoutDashboard: FC<LayoutDashboardProps> = ({ children }) => {
  const { messages, isLoading } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const pathname = usePathname();
  const isMessages = pathname.includes("thread")


  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const [assistActionOpenState, setAssisitActionOpenState] = useState<AssistAction | null>(null);

  const { addChart, deleteChart, charts } = useDynamicChart();

  const handleOpenModal = (id: string, chart: any) => {
    addChart({ [id]: chart });
    setSelectedChartId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = (id: string) => {
    deleteChart(id);
    setIsModalOpen(false);
    setSelectedChartId(null);
  };

  const makeTitle = (id: string) => {
    const titleReplaced = id?.split("_")?.join(" ");
    const firstLetter = titleReplaced.slice(0, 1)?.toLocaleUpperCase();
    const restLetters = titleReplaced.slice(1);
    return firstLetter + restLetters;
  };

  return (
    <><div className={cn("bg-navy-25 w-full p-4 pt-16 lg:p-10 flex h-[calc(100%-64px)] flex-col ", selectedChartId ? "bg-[#272E48] h-auto rounded-lg m-10" : "lg:h-[calc(100%-64px)]")}>
      <Header />
      <HeaderFocus user={user} open={open} setOpen={setOpen} suggest={suggest} isHome={true} />
      <div className={cn("flex w-full lg:mt-[20px] h-[calc(100%-20px)] lg:h-full ", assistActionOpenState ? "max-h-[calc(100%-422px)]" : "")}>
        <Conversation handleOpenModal={handleOpenModal} />
      </div>
      {!!messages.length && <div className="bg-[#1F263D] w-full mx-auto  max-w-[912px]">
        <AssistInput isDark={!!selectedChartId} assistActionOpenState={assistActionOpenState} setAssistActionOpenState={setAssisitActionOpenState} />
      </div>}
    </div>
      <footer className="max-w-[372px] w-full mt-8 lg:mt-3 mx-auto text-center text-black text-sm font-medium leading-normal">Espen can make mistakes. Check important info.</footer>
    </>
  );
};


export { LayoutDashboard };