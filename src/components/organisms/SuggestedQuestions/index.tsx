"use client";

import { SuggestedQuestion } from "@/components/molecules";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/store/hooks";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

const HomeSuggestBoxes = ({ suggests }: { suggests?: any }) => {
  if (!suggests?.length) return null;
  const isLgScreen = typeof window !== "undefined" && window.innerWidth >= 1024;

  return (
    <div className=" min-w-max relative">
      <Swiper
        key={JSON.stringify(suggests)}
        className="max-h-[116px] w-[870px]"
        spaceBetween={16}
        slidesPerView={3}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
      >
        {suggests.map((question: string, i: any) => {
          return <SwiperSlide key={question + i}>
            <SuggestedQuestion key={question + i} question={question} />; </SwiperSlide>
        })}

      </Swiper>
    </div>
  );
};

const SuggestedQuestions = () => {
  const suggests = useAppSelector((state) => state.chat.suggests);

  if (!suggests) {
    return null;
  }
  const { simple, open_ended } = suggests;

  if (!simple?.length || !open_ended?.length) {
    return null;
  }
  return (
    <div className="absolute w-full px-3 bottom-[110%] md:bottom-[105%]">
      <h4 className="text-white font-semibold text-2xl mb-4">Related</h4>
      <div className="flex gap-2 md:gap-4 overflow-auto w-full scrollbar-hide">
        {/* {[...simple, ...open_ended].map((question, i) => {
          return <SuggestedQuestion key={question + i} question={question} />; //TODO
        })} */}
        <HomeSuggestBoxes suggests={suggests} />
      </div>
    </div>
  );
};

export { SuggestedQuestions };
