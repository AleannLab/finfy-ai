"use client";
import { Icon, Loader } from "@/components/atoms";
import { useUser } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";
import { FocusAssistantPopover } from "../Popovers";
import { ActionButton } from "../ActionButton";
import { useEffect, useState } from "react";
import { careerCoach, careerCoachAssistantSuggestionData, defaultCareerCoachAssistant, defaultTeacher, defaultTutor, setFocusSuggests, setSuggest, setSuggests, teacher, teacherSuggestionData, tutor, tutorSuggestionData } from "@/lib/store/features/suggest/suggestSlice";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../UserAvatar";

export const HeaderFocus = ({ isHome, setOpen, open, suggest, user }: { isHome: any, setOpen: any, open: any, suggest: any, user: any }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 20);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!shouldRender) {
    return <div className="w-screen h-screen top-0 flex items-center justify-center bottom-0 left-0 right-0 backdrop-blur-3xl !z-[1000] absolute"><Loader /></div>
  }

  const cutIcon = (title: any) => {
    const arr = title?.split(" ")
    return arr?.slice(1, arr?.length)?.join(" ")
  }
  return (<div className="w-full flex items-center z-[500] pr-2.5 justify-between" style={{
    zIndex: 200
  }}>
    {isHome &&
      (<>
        <FocusAssistantPopover onOpenChange={() => setOpen(!open)}>
          <ActionButton
            onClick={() => { }}
            className={cn("h-10 p-2 !z-[500]  hover:bg-black hover:text-[#E9E9E9] group rounded-[40px] justify-start items-center gap-3 text-base font-semibold leading-normal inline-flex",
              open ? "bg-black text-[#E9E9E9]" : "text-[#000]"
            )}
            Icon={
              <Icon
                type="SearchIcon"
                className={cn("group-hover:fill-white h-3.5 w-5", open ? "fill-[#E9E9E9]" : "fill-black")}
              />
            }
            text={suggest?.title ? cutIcon(suggest?.title) : "Focus"}
            IconAfter={<Icon
              type="ChIcon"
              className={cn("group-hover:stroke-[#E9E9E9] transition-all duration-200 h-3.5 w-5", open ? "stroke-[#E9E9E9] -rotate-180 -translate-x-1" : "stroke-[#547A91]")}
            />}
          />
        </FocusAssistantPopover>
      </>)
    }
    {/* <UserAvatar src={user?.avatar_url}
      className={cn(
        " lg:flex justify-center items-center !border-none !z-50 w-[42px] h-[42px] rounded-full !ml-0 "

      )}
    /> */}
  </div>)
}

const HeaderText = () => {
  const { user } = useUser();
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const firstName = "Nieve";
  let isHome = false;

  const headerText = {
    home: {
      title: (
        <>
          <span className="text-black">Hey {user?.name}!</span> <span className="text-grey">{suggest?.category || " I’m your Career Buddy"}{suggest?.category?.slice(-1) === "!" ? "" : "."}</span>
        </>
      ),
      cta: <></>,
      // cta: (
      //   <p className="text-grey-15 text-lg mt-2">
      //     Ask any question to get started.
      //   </p>
      // ),
    },
    payments: {
      title: (
        <>
          Lets narrow our focus to your
          <span className="text-purple-15">&nbsp;spending</span>.
        </>
      ),
      cta: (
        <p className="text-grey-15 text-lg mt-2">
          Ask any question to get started.
        </p>
      ),
    },
    advisors: {
      title: (
        <>
          Lets narrow our focus to your
          <span className="text-purple-15">&nbsp;spending</span>.
        </>
      ),
      cta: (
        <p className="text-grey-15 text-lg mt-2">
          Ask any question to get started.
        </p>
      ),
    },
    discover: {
      title: (
        <>
          {firstName}, let&apos;s John, set some
          <span className="text-purple-15">&nbsp;goals</span>.
        </>
      ),
      cta: (
        <p className="text-grey-15 text-lg mt-2">
          Tell me about your financial goals to get started.
        </p>
      ),
    },
    goals: {
      title: (
        <>
          {firstName}, let&apos;s see how you are
          <span className="text-purple-15">&nbsp;tracking</span> on your goals.
        </>
      ),
      cta: (
        <p className="text-grey-15 text-lg mt-2">
          Tell me about your financial goals to get started.
        </p>
      ),
    },
  };

  let content;
  if (pathname.includes("payments")) {
    content = headerText.payments;
  } else if (pathname.includes("discover")) {
    content = headerText.discover;
  } else if (pathname.includes("advisors")) {
    content = headerText.advisors;
  } else if (pathname.includes("goals")) {
    content = headerText.goals;
  } else {
    content = headerText.home;
    isHome = true;
  }

  useEffect(() => {
    if (pathname.includes('tutor')) {
      dispatch(setFocusSuggests(tutor))
      dispatch(setSuggest(defaultTutor))
      dispatch(setSuggests(tutorSuggestionData))
      // dispatch(setSuggests(focusData?.[0]?.suggest));
      // dispatch(setSuggest(focusData?.[0]))
    }
    if (pathname.includes('career-coach')) {
      dispatch(setFocusSuggests(careerCoach))
      dispatch(setSuggest(defaultCareerCoachAssistant))
      dispatch(setSuggests(careerCoachAssistantSuggestionData))
    }
    if (pathname.includes('teacher')) {
      dispatch(setFocusSuggests(teacher))
      dispatch(setSuggest(defaultTeacher))
      dispatch(setSuggests(teacherSuggestionData))
    }
  }, [pathname])

  return (
    <div className="h-full lg:h-max">
      {open && <div className="fixed z-20 opacity-70 top-0 bottom-0 left-0 right-0 bg-white" />}
      <HeaderFocus user={user} isHome={isHome} open={open} setOpen={setOpen} suggest={suggest} />
      <div className="lg:flex hidden mt-[134px] flex-col w-full items-center justify-center pb-5 lg:pb-10">
        {content && (
          <>
            <h1 className="header text-center">{content.title}</h1>
            {content.cta}
          </>
        )}
      </div>
      <div className="lg:hidden flex flex-col h-full w-full items-center justify-center pb-5 lg:pb-10">
        <Icon type="LogoIcon" />
      </div>
    </div>

  );
};

export { HeaderText };
