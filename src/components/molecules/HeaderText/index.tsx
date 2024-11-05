"use client";
import { Icon } from "@/components/atoms";
import { useUser } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";
import { FocusAssistantPopover } from "../Popovers";
import { ActionButton } from "../ActionButton";
import { useEffect } from "react";
import { careerCoach, careerCoachAssistantSuggestionData, defaultCareerCoachAssistant, defaultTutor, setFocusSuggests, setSuggest, setSuggests, tutor, tutorSuggestionData } from "@/lib/store/features/suggest/suggestSlice";

const HeaderText = () => {
  const { user } = useUser();
  const suggest = useAppSelector((state) => state.suggest.suggest);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const firstName = "Nieve";
  let isHome = false;

  const headerText = {
    home: {
      title: (
        <>
          <span className="text-purple-15">Hey {user?.name}!</span> I&apos;m
          your {suggest?.category} assistant.
        </>
      ),
      cta: (
        <p className="text-grey-15 text-lg mt-2">
          Ask any question to get started.
        </p>
      ),
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
    }
    if (pathname.includes('career-coach')) {
      dispatch(setFocusSuggests(careerCoach))
      dispatch(setSuggest(defaultCareerCoachAssistant))
      dispatch(setSuggests(careerCoachAssistantSuggestionData))

    }
  }, [pathname])

  return (
    <div>
      <div className="flex w-full">
        {isHome &&
          (<>
            <FocusAssistantPopover>
              <ActionButton
                Icon={
                  <Icon
                    type="SearchIcon"
                    className="fill-purple-15 group-hover:fill-white h-3.5 w-5"
                  />
                }
                text={"Focus"}
              />
            </FocusAssistantPopover>
          </>)
        }
      </div>
      <div className="lg:flex hidden flex-col w-full items-center justify-center pb-5 lg:pb-10">
        {content && (
          <>
            <h1 className="header text-center">{content.title}</h1>
            {content.cta}
          </>
        )}
      </div>
      <div className="lg:hidden flex flex-col w-full items-center justify-center pb-5 lg:pb-10">
        <Icon type="LogoIcon" />
      </div>
    </div>

  );
};

export { HeaderText };
