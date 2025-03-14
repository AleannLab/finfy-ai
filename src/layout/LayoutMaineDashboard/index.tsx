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
import { careerCoach, setPrompt, setSuggest, setSuggests, teacher, tutor } from "@/lib/store/features/suggest/suggestSlice";
import { HomeSlides } from "@/components/molecules/HomeSlides";
import { typeCatagories } from "@/lib/constants";
import { useAppSelector } from "@/lib/store/hooks";
import { subjectsData } from "./mockPrompts";
import { HomeSuggestWithTools } from "@/components/molecules/HomeSuggesWithTools";

const StyledSelect = ({ disable, options, selectedGrade, setSelectedGrade }: any) => {

  return (
    <div className={cn("w-[141px] outline-none flex-col justify-start items-end gap-1 inline-flex relative", disable ? "cursor-not-allowed opacity-60" : "")}>
      <select
        disabled={disable}
        className="self-stretch px-4 py-2 bg-white rounded-lg border border-[#e9e9e9] text-black text-sm font-medium leading-tight appearance-none cursor-pointer"
        value={selectedGrade}
        onChange={(e: any) => setSelectedGrade(e.target.value)}
      >
        {options.map((item: any) => {
          return (<option key={item.id} value={item.id}>{item.label}</option>)

        })}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6654 6L7.9987 10.6667L3.33203 6"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

const ToggleSwitch = ({ isOn, setIsOn, disable }: { isOn: boolean, setIsOn: any, disable: any }) => {

  const toggleSwitch = () => {
    if (!disable) {
      setIsOn(!isOn);
    }
  };

  return (
    <div
      data-svg-wrapper
      className={cn(disable ? "cursor-not-allowed " : "cursor-pointer")}
      onClick={toggleSwitch}
    >
      <svg
        width="32"
        height="20"
        viewBox="0 0 32 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_294_7110)">
          <path
            d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10C32 15.5228 27.5228 20 22 20H10C4.47715 20 0 15.5228 0 10Z"
            fill={isOn ? "#09090B" : "#FAFAFA"}
          />
          <g filter="url(#filter0_d_294_7110)">
            <rect
              x={isOn ? "14" : "2"}
              y="2"
              width="16"
              height="16"
              rx="8"
              fill="white"
            />
            <rect
              x={isOn ? "14.5" : "2.5"}
              y="2.5"
              width="15"
              height="15"
              rx="7.5"
              stroke="#E4E4E7"
            />
          </g>
        </g>
        <path
          d="M0.5 10C0.5 4.7533 4.7533 0.5 10 0.5H22C27.2467 0.5 31.5 4.75329 31.5 10C31.5 15.2467 27.2467 19.5 22 19.5H10C4.7533 19.5 0.5 15.2467 0.5 10Z"
          stroke="#E4E4E7"
        />
        <defs>
          <clipPath id="clip0_294_7110">
            <path
              d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10C32 15.5228 27.5228 20 22 20H10C4.47715 20 0 15.5228 0 10Z"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

interface LayoutDashboardProps extends PropsWithChildren { }

const LayoutMaineDashboard: FC<LayoutDashboardProps> = ({ children }) => {
  const { messages, isLoading, streamMessage } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [assistActionOpenState, setAssisitActionOpenState] = useState<AssistAction | null>(null);
  const [tool, setTool] = useState<any>(null);
  const [isOn, setIsOn] = useState(false);
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const grades: Array<{ label: string, id: string }> = [
    { label: "Grade 10", id: "grade_10" },
    { label: "Grade 11", id: "grade_11" },
    { label: "Grade 12", id: "grade_12" }
  ];
  const [selectedGrade, setSelectedGrade] = useState(grades?.[0].id); // Default selection
  const prompt = useAppSelector((state) => state.suggest.prompt);

  useEffect(() => {
    if (pathname.includes('tutor') && !isMessages) {
      dispatch(setSuggests(tutor?.[0]?.suggest));
      dispatch(setSuggest(tutor?.[0]))
    }
    if (pathname.includes('career-coach')) {

    }
    if (pathname.includes('teacher')) {

    }
  }, [pathname, dispatch])

  useEffect(() => {
    dispatch(setMessages([]));
  }, [streamMessage, isLoading]);

  const fetchDataBasedOnRole = async (dataSet: any[]) => {
    // Wrap `useSearchParams` in a `useEffect` to ensure it only runs on the client
    const searchParams = new URLSearchParams(window.location.search); // Use `window.location.search` directly to avoid server-side rendering issues
    const assistantId = searchParams.get("assistantId");

    if (assistantId) {
      const currentAssistant = dataSet.find(
        (item: { assistantId: any }) => item?.assistantId === assistantId
      );
      if (currentAssistant) {
        dispatch(setSuggest(currentAssistant));
      }

      searchParams.delete("assistantId");
      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    fetchDataBasedOnRole([...tutor, ...careerCoach, ...teacher]);
  }, []);


  const handleOpenModal = (id: string, chart: any) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (id: string) => {
    setIsModalOpen(false);
  };

  const makeTitle = (id: string) => {
    const titleReplaced = id?.split("_")?.join(" ");
    const firstLetter = titleReplaced.slice(0, 1)?.toLocaleUpperCase();
    const restLetters = titleReplaced.slice(1);
    return firstLetter + restLetters;

  };

  const isMessages = pathname.includes("thread")
  const isTeacher = pathname.includes("teacher") && !!0 //disable teacher
  const isTutor = pathname.includes("tutor")

  // const tools = [
  //   { icon: "🏆", label: "Exam Mastery", content: "Want to practice real past math papers? I’ll grade your answers, provide feedback based on official marking guidelines, and help you strengthen your skills!", toolsId: "exam_mastery" },
  //   { icon: "📸", label: "Homework Hero", content: "Stuck on a tricky math problem? Take a photo, and I’ll guide you step by step to the correct solution.", toolsId: "homework_hero" },
  //   { icon: "🎯", label: "AI-Powered Personalized Tutoring", content: "Struggling with calculus, algebra, or statistics? I’ll break them down into easy-to-follow steps, ensuring you understand every detail. Plus, I’ll track your progress and create a personalized study plan to help you improve!", toolsId: "ai_tutoring" },
  //   { icon: "✍️", label: "Smart Math Notes Generator", content: "I’ll generate customized study notes based on your topics, making revision easier and more effective!", toolsId: "math_notes" }
  // ];

  const cutIcon = (title: any) => {
    const arr = title?.split(" ")
    return `${arr?.slice(1, arr?.length)?.join(" ")}`.toLocaleLowerCase().replaceAll(" ", "_");
  }

  const getIcon = (title: any) => {
    const arr = title?.split(" ")
    return `${arr?.slice(0, 0)?.join(" ")}`;
  }

  const tools: any = subjectsData?.[`${cutIcon(suggest?.title)}`]?.tools
  const prompts: any = subjectsData?.[`${cutIcon(suggest?.title)}`]?.prompts

  // useEffect(() => {

  //   if (tool && selectedGrade) {
  //     const promptList = prompts?.[tool]?.[selectedGrade] || [];

  //     if (promptList.length > 0) {
  //       dispatch(setPrompt(promptList))

  //     } else {
  //       dispatch(setPrompt(null))
  //     }
  //   }
  // }, [selectedGrade, tool, tools, prompts]);



  if (isLoading || streamMessage?.length) {
    return <div className="w-screen h-full top-0 flex items-center justify-center bottom-0 left-0 right-0 backdrop-blur-3xl !z-[1000] absolute"><Loader /></div>
  }

  return (
    <><div className={cn("bg-navy-25 relative w-full p-4 pt-16 lg:p-4 flex min-h-full !h-auto flex-col ", isModalOpen ? "bg-[#272E48] rounded-lg m-10" : "h-[calc(100%)]")}>
      <Header />
      <>
        {!isMessages && <HeaderText />}
        <div className="flex h-full w-[calc(100%)] md:w-[calc(100%-120px)] lg:!max-w-[1050px] flex-1 mx-auto flex-col">
          {isTeacher && (<>
            <div className="max-w-[1050px] w-full h-9 justify-between items-center inline-flex">
              <div className="justify-start items-center gap-1 flex">
                <div data-svg-wrapper className="relative">
                  <Icon type="LightningBolt" className="text-[#547a91]" />
                </div>
                <div className="text-[#666666] text-base font-medium  leading-tight">All tools</div>
              </div>
              <div className="justify-start items-center gap-3 hidden sm:flex">
                <div className="text-[#666666] text-sm font-semibold  leading-tight">Sort by</div>
                <div className="w-[141px] flex-col justify-start items-end gap-1 inline-flex">
                  <div className="self-stretch opacity-50 cursor-not-allowed px-4 py-2 bg-white rounded-lg border border-[#e9e9e9] justify-end items-center gap-1 inline-flex">
                    <div className="justify-start items-center gap-3 flex">
                      <div className="w-[89px] text-black text-sm font-medium  leading-tight">Most Popular</div>
                    </div>
                    <div data-svg-wrapper className="relative">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6654 6L7.9987 10.6667L3.33203 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HomeSlides type={typeCatagories.teacher} selectedTool={tool} slides={tools} setTool={setTool}
            />
          </>)}
          {isTutor && (<>
            <div className="max-w-[1050px] w-full h-9 justify-between items-center inline-flex">
              <div className="justify-start items-center gap-1 flex">
                <div data-svg-wrapper className="relative">
                  <Icon type="LightningBolt" className="text-[#547a91]" />
                </div>
                <div className="text-[#666666] text-base font-medium  leading-tight">All tools</div>
              </div>
            </div>
            <HomeSlides type={typeCatagories.tutor} selectedTool={tool} slides={tools} setTool={(tool: any) => {
              setTool(tool)
              const prompts: any = subjectsData?.[`${cutIcon(suggest?.title)}`]?.prompts

              if (tool && selectedGrade) {
                const promptList = prompts?.[tool]?.[selectedGrade] || [];

                if (promptList.length > 0) {
                  dispatch(setPrompt(promptList))

                } else {
                  dispatch(setPrompt(null))
                }
              }
            }}
            />
          </>)}
          {(isTeacher || isTutor) ?
            (
              <div className="max-w-[1050px] w-full mt-6 mb-2 justify-between gap-6 md:items-center flex-col-reverse md:flex-row flex">
                <div className="justify-start items-center gap-2 flex">
                  <ToggleSwitch disable={!tool} isOn={isOn} setIsOn={setIsOn} />
                  <div className={cn("justify-start items-center gap-1 flex", !tool ? "opacity-60" : "")}>
                    <div data-svg-wrapper className="relative">
                      <Icon type="LightningBolt" className="text-[#547a91]" />
                    </div>
                    <div className="text-[#666666] text-base font-medium  leading-tight">Suggested</div>
                  </div>
                </div>
                <div className="justify-start items-center gap-3 flex">
                  <div className="text-[#666666] text-sm font-semibold  leading-tight">Select</div>
                  <StyledSelect selectedGrade={selectedGrade} setSelectedGrade={(grade: any) => {
                    setSelectedGrade(grade)
                    const prompts: any = subjectsData?.[`${cutIcon(suggest?.title)}`]?.prompts

                    if (tool && selectedGrade) {
                      const promptList = prompts?.[tool]?.[grade] || [];

                      if (promptList.length > 0) {
                        dispatch(setPrompt(promptList))

                      } else {
                        dispatch(setPrompt(null))
                      }
                    }
                  }}
                    options={grades} disable={!tool} />
                </div>
              </div>
            )
            : (<div className="flex items-center h-fit text-[#547a91]">
              <Icon type="LightningBolt" className="text-[#547a91]" />
              <p className="text-base">Suggestions</p>
            </div>
            )}
          {(isOn && isTutor) && <HomeSuggestWithTools prompt={prompt} label={tool} icon={suggest} assistantId={suggest?.assistantId} />}
          {(!isTutor) && <HomeSuggestBoxes />}
          <div className="mt-6 mb-3">
            <ChatMessageInput disable={(!tool && !isMessages && isTutor)} isDark={false} assistActionOpenState={assistActionOpenState} setAssistActionOpenState={setAssisitActionOpenState} />
          </div>
          <footer className="max-w-[372px] w-full mx-auto mt-auto text-center text-black text-sm font-medium leading-normal">Espen can make mistakes. Check important info.</footer>
        </div>
      </>
    </div>
    </>
  );
};


export { LayoutMaineDashboard };