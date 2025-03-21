"use client";

import { Popover } from "@/components/atoms";
import { FC, PropsWithChildren, useEffect } from "react";
import { FocusAssistantOption } from "@/components/molecules";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";
import { careerCoach, careerCoachAssistantSuggestionData, defaultCareerCoachAssistant, defaultTeacher, defaultTutor, setFocusSuggests, setSuggest, setSuggests, teacher, teacherSuggestionData, tutor, tutorSuggestionData } from "@/lib/store/features/suggest/suggestSlice";

interface FocusAssistantPopoverProps extends PropsWithChildren { onOpenChange?: any, open: boolean }

const FocusAssistantPopover: FC<FocusAssistantPopoverProps> = ({
  children,
  onOpenChange = () => {},
  open
}) => {
  const focusData = useAppSelector((state) => state.suggest.focusSuggests);
  const pathname = usePathname();
  const isTutor = pathname.includes("tutor")
  const isTeacher = pathname.includes("teacher")
  const isCareer = pathname.includes("career-coach")
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (pathname.includes('tutor')) {
      dispatch(setFocusSuggests(tutor))
    }
    if (pathname.includes('career-coach')) {
      dispatch(setFocusSuggests(careerCoach))
    }
    if (pathname.includes('teacher')) {
      dispatch(setFocusSuggests(teacher))
    }
  }, [pathname])
  
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger className="!z-[80]">{children}</Popover.Trigger>
      <Popover.Content side="top" align="start" className="mb-4 mt-2 max-w-3xl">
        <Popover.Header className="mb-6 ml-2">
          {isCareer && <span>Focus Assistant</span>}
          {isTutor && <span>Focus Tutors</span>}
          {isTeacher && <span>Teacher Focused Assistant</span>}
        </Popover.Header>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-3 lg:grid-cols-3 gap-2.5">
          {focusData.map((item: any, index: number) => {
            return (
              <FocusAssistantOption
                title={item.title}
                text={item.text}
                key={index}
                suggest={item.suggest}
                item={item}
                onOpenChange={onOpenChange}
              />
            );
          })}
        </div>
      </Popover.Content>
    </Popover>
  );
};

export { FocusAssistantPopover };
