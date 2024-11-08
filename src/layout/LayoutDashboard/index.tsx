"use client";

import { AssistInput, Conversation } from "@/components/organisms";
import { Button, Icon } from "@/components/atoms";
import { ChatMessageInput, DynamicChart, Header, HeaderText, HomeSuggestBoxes } from "@/components/molecules";
import { FC, PropsWithChildren, useState } from "react";
import { useChat, useDynamicChart, useUser } from "@/hooks";
import { DesktopChartModal } from "@/components/molecules/DesktopChartModal/DesktopChartModal";
import { MobileChartModal } from "@/components/molecules/MobileChartModal/MobileChartModal";
import { cn } from "@/lib/utils";

interface LayoutDashboardProps extends PropsWithChildren { }

const LayoutDashboard: FC<LayoutDashboardProps> = ({ children }) => {
  const { messages, isLoading } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const [isVoiceChatModalOpen, setIsVoiceChatModalOpen] = useState<boolean>(false);

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
    <><div className={cn("bg-navy-25 w-full p-4 pt-16 lg:p-10 flex !min-h-screen !h-auto flex-col ", selectedChartId ? "bg-[#272E48] rounded-lg m-10" : "h-screen")}>
      <Header />
      {(messages.length || isLoading) ? (
        <div className={cn("flex h-full ", isVoiceChatModalOpen ? "max-h-[calc(100vh-550px)]" : "")}>
          <Conversation handleOpenModal={handleOpenModal} />
        </div>
      ) : (
        <>
          <HeaderText />
          <div className="flex max-w-[1050px] flex-1 mx-auto flex-col">
            <div className="flex items-center h-fit text-[#547a91]">
              <Icon type="LightningBolt" className="text-[#547a91]" />
              <p className="text-base">Suggestions</p>
            </div>
            <HomeSuggestBoxes />
            <div className="mt-6">
              <ChatMessageInput isVoiceChatModalOpen={isVoiceChatModalOpen} setIsVoiceChatModalOpen={setIsVoiceChatModalOpen} isDark={false} />
            </div>
          </div>
        </>
      )}
      {!!messages.length && <div className="bg-[#1F263D]">
        <AssistInput isVoiceChatModalOpen={isVoiceChatModalOpen} setIsVoiceChatModalOpen={setIsVoiceChatModalOpen}  isDark={!!selectedChartId} />
      </div>}
    </div>
    </>
  );
};


export { LayoutDashboard };