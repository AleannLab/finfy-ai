"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const SlideBox: any = ({ content, label, icon, item, setTool, selectedTool }: any) => {
  const isSelected = item?.toolsId === selectedTool;

  const handleClick = () => {
    setTool(item?.toolsId)
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

const HomeSlides = ({ slides, setTool, selectedTool }: { slides: any, setTool: any, selectedTool: any }) => {

  return (
    <div className="w-full relative max-w-[1106px] mt-3 p-1">
      <div className="w-full overflow-hidden max-w-[440px] lg:hidden">
        <Swiper
          className="min-w-[100vw]  md:min-w-0 max-w-[calc(100%)]"
          spaceBetween={16}
          slidesPerView={2}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          modules={[Navigation]}
        >
          {slides.map((item: any) => (
            <SwiperSlide key={item.label}>
              <SlideBox
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
      <div className="w-full max-w-[1050px] hidden lg:block">
        <Swiper
          className="min-w-[100vw] md:min-w-0 max-w-[calc(100%)]"
          spaceBetween={16}
          slidesPerView={3}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          modules={[Navigation]}
        >
          {slides.map((item: any) => (
            <SwiperSlide key={item.label}>
              <SlideBox
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
        {/* <button 
          style={{
            backgroundColor: 'transparent',
            color: '#74BBC9',
            left: '-40px',
          }} 
          className="swiper-button-prev !w-8 absolute z-10 p-2 !bg-transparent !-translate-y-2 !scale-[0.4]">
        </button>
        <button 
          style={{

            backgroundColor: 'transparent',
            color: '#74BBC9',
            right: '-40px',
            top: '50%',
          }} 
          className="swiper-button-next !w-8 absolute z-10 p-2 !bg-transparent !-translate-y-2 !scale-[0.4]">
        </button> */}
      </div>
      {/* <div className="flex xl:hidden flex-wrap gap-3">
        {suggests.map((item: any) => (
          <SuggestedBox
            key={item.label}
            content={item.content}
            icon={item.icon}
            label={item.label}
            item={item}
          />
        ))}
      </div> */}
    </div>
  );
};

export { HomeSlides };
