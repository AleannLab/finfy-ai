"use client";

import { Message, ListChartVisualizeButton } from "@/components/organisms";
import { useChat, useDynamicChart } from "@/hooks";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { DynamicChart, PaginationScroll } from "@/components/molecules";
import { MobileChartModal } from "../../molecules/MobileChartModal/MobileChartModal";
import { DesktopChartModal } from "../../molecules/DesktopChartModal/DesktopChartModal";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

interface ConversationProps {
  handleOpenModal: (id: string, chart: any) => void;
}

const Conversation: FC<ConversationProps> = ({ handleOpenModal }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrollEnabledRef = useRef(true); // Контроль автопрокрутки
  const { messages, isLoading, streamMessage } = useChat();
  
  useEffect(() => {
    if (isAutoScrollEnabledRef.current && scrollRef.current && streamMessage.length > 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamMessage]);
  
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= 20; // Поріг 20px від низу
  
    if (!isAtBottom) {
      isAutoScrollEnabledRef.current = false;
    } else {
      isAutoScrollEnabledRef.current = true;
    }
  };

  useEffect(()=> {
    if ( scrollRef.current && streamMessage.length === 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, streamMessage])


  return (
    <div className="flex-1 overflow-hidden relative flex flex-row gap-8">
      <div className={`w-full relative pb-32`}>
        <div
          className={cn(
            "react-scroll-to-bottom--css-ikyem-79elbk absolute inset-0",
            "pb-24 md:pb-28"
          )}
        >
          <div onScroll={handleScroll} className="react-scroll-to-bottom--css-ikyem-1n7m0yu custom-scrollbar flex flex-col items-center gap-2.5 md:gap-5 overflow-x-hidden pr-2">
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
              <div ref={scrollRef} />
              {/* {!!streamMessage?.length && (
                <Message
                  text={streamMessage}
                  date={""}
                  isUser={false}
                  isLastMessage={true}
                />
              )} */}
              {isLoading && !streamMessage?.length && (
                <Message
                  text={
                    <div className="flex items-end gap-4">
                      <span className="w-4 h-4">
                        <div className="small-loader" />
                      </span>
                      <span className="text-[#547a91] text-2xl leading-3 font-medium">
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
    </div>
  );
};

export { Conversation };
