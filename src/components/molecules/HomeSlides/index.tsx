"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { typeCatagories } from "@/lib/constants";

const SlideBox: any = ({ content, label, icon, item, setTool, selectedTool, type }: any) => {
  const isSelected = item?.toolsId === selectedTool;
  const isTutor = typeCatagories.tutor === type;

  const handleClick = () => {
    setTool(item?.toolsId)
  }

  if (isTutor) {
    return (
      <button
        onClick={handleClick}
        className={cn("max-w-[342px] w-full h-[136px] px-4 py-2 bg-white text-left rounded-lg flex-col justify-start items-start inline-flex",
          isSelected ? "!border-[#666666] border" : "!border-[#e9e9e9] border")}
      >        <div className={cn("self-stretch text-sm font-semibold  leading-tight", isSelected ? " text-black" : "text-[#666666]")}>{icon} {label}</div>
        <div style={{
          lineHeight: "20px"
        }} className={cn("text-black !leading-5 text-[11px] font-medium w-full text-left overflow-hidden text-ellipsis line-clamp-4", isSelected ? " text-black" : "text-[#666666]")}>
          &quot;{content}&quot;
        </div>
      </button>
    )
  }


  return (
    <>
      <button onClick={handleClick} className={cn("max-w-[342px] w-full h-14 px-4 py-2 bg-white rounded-lg flex-col justify-start items-start inline-flex", isSelected ? "!border-[#666666] border" : "!border-[#e9e9e9] border")}>
        <div className="text-black text-sm font-semibold leading-tight">{icon} {label}</div>
        <div className="text-black text-[11px] font-medium leading-tight truncate w-full">&quot;{content}&quot;</div>
      </button>

    </>
  );
};

const HomeSlides = ({ slides, setTool, selectedTool, type }: { slides: any, setTool: any, selectedTool: any, type: any }) => {
  const isTutor = typeCatagories.tutor === type;
  const [isLgScreen, setIsLgScreen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!slides?.length) {
    return <></>
  }


  return (
    <div className="w-full relative max-w-[1106px]">
      {/* <div className="w-full overflow-hidden lg:hidden">
        <Swiper
          className="w-[100vw]  md:min-w-0 max-w-[calc(100%)]  min-w-[672px]"
          spaceBetween={10}
          loop={true}
          slidesPerView={isLgScreen ? 4 : 3}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          modules={[Navigation]}
        >
          {slides.map((item: any) => (
            <SwiperSlide key={item.label}>
              <SlideBox
                type={type}
                selectedTool={selectedTool}
                content={item.content}
                icon={item.icon}
                label={item.label}
                item={item}
                setTool={setTool}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div className="w-full max-w-[1050px] overflow-hidden block">
        <Swiper
          className=" max-w-[calc(100%)]  min-w-[672px]"
          spaceBetween={10}
          loop={true}
          slidesPerView={isLgScreen ? isTutor ? 4 : 3 : 3}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          modules={[Navigation]}
        >
          {slides.map((item: any) => (
            <SwiperSlide key={item.label}>
              <SlideBox
                type={type}
                selectedTool={selectedTool}
                content={item.content}
                icon={item.icon}
                label={item.label}
                item={item}
                setTool={setTool}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export { HomeSlides };
