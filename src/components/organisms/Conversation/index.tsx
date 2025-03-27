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
  const isAutoScrollEnabledRef = useRef(true);
  const { messages, isLoading, streamMessage } = useChat();
  
  useEffect(() => {
    if (isAutoScrollEnabledRef.current && scrollRef.current && streamMessage.length > 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamMessage]);
  
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= 20;
  
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
    <div className="flex-1 overflow-hidden max-h-full relative flex flex-row gap-8">
      <div className={`w-full relative pb-32`}>
        <div
          className={cn(
            "react-scroll-to-bottom--css-ikyem-79elbk absolute inset-0",
            "pb-24 md:pb-28"
          )}
        >
          <div onScroll={handleScroll} className="react-scroll-to-bottom--css-ikyem-1n7m0yu h-full custom-scrollbar flex flex-col items-center  gap-2.5 md:gap-5 overflow-x-hidden pr-2">
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
                  const uniqueKey = message.id ? `${message.id}-${index}` : `message-${index}`;

                return (
                  <Fragment key={uniqueKey}>
                    <Message
                      files={message?.files}
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
              {isLoading && !streamMessage?.length && (
                <Message
                  text={
                    <div className="flex items-end gap-4">
                      <div className={cn("!z-[400] translate-x-10 translate-y-8 scale-[0.25]")}>
                        <svg
                          className="loader"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid"
                          width="47"
                          height="47"
                          style={{ margin: "initial", display: "block", shapeRendering: "auto", background: "transparent" }}
                        >
                          <g className="ldl-scale" style={{ transformOrigin: "50% 50%", transform: "rotate(0deg) scale(0.8, 0.8)" }}>
                            <g className="ldl-ani" style={{ opacity: 1, transformOrigin: "50px 50px", animation: "1s linear infinite animate", transformBox: "view-box" }}>
                              <g className="ldl-layer">
                                <g className="ldl-ani">
                                  <image
                                    href="data:image/png;base64,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"
                                    height="100"
                                    width="100"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span className="text-[#666] text-2xl leading-3 font-medium">
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
