/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { AssistInput, Conversation } from "@/components/organisms";
import { Button, Icon, Loader } from "@/components/atoms";
import { ChatMessageInput, DynamicChart, Header, HeaderText, HomeSuggestBoxes } from "@/components/molecules";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useChat, useDynamicChart, useUser } from "@/hooks";
import { DesktopChartModal } from "@/components/molecules/DesktopChartModal/DesktopChartModal";
import { MobileChartModal } from "@/components/molecules/MobileChartModal/MobileChartModal";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setMessages } from "@/lib/store/features/chat/chatSlice";
import { AssistAction } from "../LayoutDashboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { careerCoach, setSuggest, teacher, tutor } from "@/lib/store/features/suggest/suggestSlice";

interface LayoutDashboardProps extends PropsWithChildren {}

const LayoutMaineDashboard: FC<LayoutDashboardProps> = ({ children }) => {
  const { messages, isLoading, streamMessage } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const [assistActionOpenState, setAssisitActionOpenState] = useState<AssistAction | null>(null);

  useEffect(() => {
    dispatch(setMessages([]));
  }, [streamMessage, isLoading]);

  const fetchDataBasedOnRole = async (dataSet: any[]) => {
    // Wrap `useSearchParams` in a `useEffect` to ensure it only runs on the client
    const searchParams = new URLSearchParams(window.location.search); // Use `window.location.search` directly to avoid server-side rendering issues
    const assistantId = searchParams.get("assistantId");

    console.log(assistantId, "assistantId")

    if (assistantId) {
      const currentAssistant = dataSet.find(
        (item: { assistantId: any }) => item?.assistantId === assistantId
      );
      if (currentAssistant) {
        dispatch(setSuggest(currentAssistant));
      }

      // Remove `assistantId` from the URL without reloading the page
      searchParams.delete("assistantId");
      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    fetchDataBasedOnRole([...tutor, ...careerCoach, ...teacher]);
  }, []); // Run this effect only once when the component mounts

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

  const isMessages = pathname.includes("thread")


  if (isLoading || streamMessage?.length) {
    return <div className="w-screen h-screen top-0 flex items-center justify-center bottom-0 left-0 right-0 backdrop-blur-3xl !z-[1000] absolute"><Loader /></div>
  }

  return (
    <><div className={cn("bg-navy-25 relative w-full p-4 pt-16 lg:p-4 flex !min-h-screen !max-w-screen  !h-auto flex-col ", selectedChartId ? "bg-[#272E48] rounded-lg m-10" : "h-screen")}>
      <Header />
      <>
        {!isMessages && <HeaderText />}
        <div className="flex !max-w-[441px] w-[calc(100%)] md:w-[calc(100%-60px)] lg:!max-w-[1050px] flex-1 mx-auto flex-col">
          <div className="flex items-center h-fit text-[#547a91]">
            <Icon type="LightningBolt" className="text-[#547a91]" />
            <p className="text-base">Suggestions</p>
          </div>
          <HomeSuggestBoxes />
          <div className="mt-6">
            <ChatMessageInput isDark={false} assistActionOpenState={assistActionOpenState} setAssistActionOpenState={setAssisitActionOpenState} />
          </div>
        </div>
      </>
      <footer className="w-[372px] mt-4 mx-auto text-center text-black text-sm font-medium leading-normal">Espen can make mistakes. Check important info.</footer>
      {/* <footer className="h-[78px] hidden lg:flex absolute bottom-0 left-0 right-0 w-full justify-center items-center">
        <div className="h-[76px] mx-auto pl-8 pr-4 py-2 rounded-[50px] justify-start items-center gap-10 inline-flex">
          <div className="justify-start items-center gap-4 flex">
            <div className="text-[#272e48] text-sm font-medium  leading-tight">Brought to you by</div>
            <div className="w-[140px] h-[60px] pl-[5px] pr-[4.07px] pt-[17px] pb-[17.75px] justify-center items-center flex">
              <div className="flex w-[140px]">
                <div className="w-[137px] h-[60px] relative">

                  <div className="w-[140px] h-[60px] px-3.5 py-1.5 justify-center items-center inline-flex">
                    <img className="w-28 h-12 mix-blend-darken" src="/images/liberty-new.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-4 flex">
            <div className="text-[#272e48] text-sm font-medium  leading-tight">In collaboration with</div>
            <div className="w-[140px] h-[60px] px-[11px] py-3 justify-center items-center flex">
              <img className="w-[118px] h-9 mix-blend-darken" src="/images/logo-ultimate.png" />
            </div>
          </div>
        </div>
      </footer> */}
    </div>
    </>
  );
};


export { LayoutMaineDashboard };