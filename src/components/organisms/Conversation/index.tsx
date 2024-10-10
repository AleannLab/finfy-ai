"use client";

import { Message, ListChartVisualizeButton } from "@/components/organisms";
import { useChat, useDynamicChart } from "@/hooks";
import { Fragment, useEffect, useRef, useState } from "react";
import { DynamicChart, PaginationScroll } from "@/components/molecules";
import { MobileChartModal } from "../../molecules/MobileChartModal/MobileChartModal";
import { DesktopChartModal } from "../../molecules/DesktopChartModal/DesktopChartModal";
import { Loader } from "@/components/atoms";

const Conversation = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading } = useChat();
  const { addChart, deleteChart, charts } = useDynamicChart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);

  const handleOpenModal = (id: string, chart: any) => {
    addChart({ [id]: chart });
    setSelectedChartId(id);
    setIsModalOpen(true);
  };

  const makeTitle = (id: string) => {
    const titleReplaced = id?.split("_")?.join(" ");
    const firsLetter = titleReplaced.slice(0, 1)?.toLocaleUpperCase();
    const restLetters = titleReplaced.slice(1, titleReplaced?.length);
    return (firsLetter + restLetters) as string;
  };

  const handleCloseModal = (id: string) => {
    deleteChart(id);
    setIsModalOpen(false);
    setSelectedChartId(null);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-hidden relative flex flex-row gap-8">
      <div className={`${isModalOpen ? "" : ""} w-full relative pb-28`}>
        <div className="react-scroll-to-bottom--css-ikyem-79elbk absolute inset-0 pb-28">
          <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu custom-scrollbar flex flex-col items-center gap-2.5 md:gap-5 overflow-x-hidden pr-2">
            <PaginationScroll
              elements={undefined}
              fetchPagination={undefined}
              chatUUID={undefined}
              elementScroll={undefined}
            >
              {messages.map((message, index) => {
                const calculations = message.calculations
                  ? JSON.parse(message.calculations)
                  : null;

                return (
                  <Fragment key={message.id}>
                    <Message
                      text={message.content}
                      date={""}
                      isUser={message.message_type === "user"}
                      isLastMessage={index === messages.length - 1}
                    />
                    {calculations && (
                      <ListChartVisualizeButton
                        data={Object.entries(calculations)}
                        handleOpenModal={handleOpenModal}
                      />
                    )}
                  </Fragment>
                );
              })}
              {isLoading && (
                <Message
                  text={
                    <div className="flex items-end gap-4">
                      <span className="w-4 h-4">
                        <div className="small-loader" />
                      </span>
                      <span className="text-white text-2xl leading-3 font-medium">
                        Answer
                      </span>
                    </div>
                  }
                  isUser={false}
                  isLoading={isLoading}
                />
              )}
              <div ref={scrollRef} />
            </PaginationScroll>
          </div>
        </div>
      </div>
      <DesktopChartModal
        isOpen={isModalOpen}
        onClose={
          selectedChartId ? () => handleCloseModal(selectedChartId) : () => {}
        }
        component={<DynamicChart selectedChartId={selectedChartId} />}
        title={selectedChartId ? makeTitle(selectedChartId) : ""}
      />
      <MobileChartModal
        isOpen={isModalOpen}
        onClose={
          selectedChartId ? () => handleCloseModal(selectedChartId) : () => {}
        }
        component={<DynamicChart selectedChartId={selectedChartId} />}
        title={selectedChartId ? makeTitle(selectedChartId) : ""}
      />
    </div>
  );
};

export { Conversation };
