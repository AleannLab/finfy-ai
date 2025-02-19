"use client";

import { AssistInput, Conversation } from "@/components/organisms";
import { Button, Icon } from "@/components/atoms";
import { DynamicChart, Header, HeaderText, HomeSuggestBoxes } from "@/components/molecules";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useCategory, useChat, useDynamicChart } from "@/hooks";
import { DesktopChartModal } from "@/components/molecules/DesktopChartModal/DesktopChartModal";
import { MobileChartModal } from "@/components/molecules/MobileChartModal/MobileChartModal";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { HeaderFocus } from "@/components/molecules/Header";
import { fetchFocusSuggests, setSuggest } from "@/lib/store/features/suggest/suggestSlice";
import clsx from "clsx";

interface LayoutDashboardProps extends PropsWithChildren { }

const LayoutDashboard: FC<LayoutDashboardProps> = ({ children }) => {
  const { messages } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const focusData = useAppSelector((state) => state.suggest.focusSuggests);
  const dispatch = useAppDispatch();
  const { category } = useCategory();

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

  useEffect(() => {
    // dispatch(fetchFocusSuggests()); //TODO un-hide suggests questions
  }, [dispatch]);

  useEffect(() => {
    if (focusData.length) {
      if (!category) {
        dispatch(setSuggest(focusData[0].suggest.slice(0, 6)));
      }
      if (category === 'budget') {
        dispatch(setSuggest(focusData[1].suggest.slice(0, 6)));
      } else {
        dispatch(setSuggest(focusData[0].suggest.slice(0, 6)));
      }
    }
  },[focusData, category])

  return (
    <><div className={cn("w-full flex flex-col ")}>
      {messages.length ? (
        <Conversation handleOpenModal={handleOpenModal} isOpenChart={!!selectedChartId} />
      ) : (
        <div className="mt-6">

        </div>
      )}
      <div className={clsx("relative")}>
        <AssistInput
          isDark={false}
          classes={{
            container: messages.length ? "xl:bottom-0": "",
          }}
        />

      </div>
    </div>
      <div className={cn("flex", selectedChartId ? "w-full h-screen" : "")}>
        <DesktopChartModal
          isOpen={isModalOpen}
          onClose={
            selectedChartId ? () => handleCloseModal(selectedChartId) : () => { }}
          component={<DynamicChart selectedChartId={selectedChartId} />}
          title={selectedChartId ? makeTitle(selectedChartId) : ""} />
        <MobileChartModal
          isOpen={isModalOpen}
          onClose={
            selectedChartId ? () => handleCloseModal(selectedChartId) : () => { }}
          component={<DynamicChart selectedChartId={selectedChartId} />}
          title={selectedChartId ? makeTitle(selectedChartId) : ""} />
      </div>
    </>
  );
};


export { LayoutDashboard };