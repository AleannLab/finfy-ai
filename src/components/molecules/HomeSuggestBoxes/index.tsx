"use client";
import { SuggestedBox } from "@/components/atoms";
import { useAppSelector } from "@/lib/store/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useSidebar } from "@/hooks";
import { cn } from "@/lib/utils";

const HomeSuggestBoxes = () => {
  const suggests = useAppSelector((state) => state.suggest.suggests);
  const isLgScreen = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const { open, handleToggle, handleClose } = useSidebar();


  return (
    <div className="w-full relative max-w-[1106px] mt-3 p-1">
      {/* <div className="w-full overflow-hidden lg:hidden">
        <Swiper
          className="w-[100vw]  md:min-w-0 max-w-[calc(100%)]  min-w-[672px]"
          spaceBetween={16}
          loop={true}
          slidesPerView={isLgScreen ? 4 : 3}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          modules={[Navigation]}
        >
          {suggests.map((item: any) => (
            <SwiperSlide key={item.label}>
              <SuggestedBox
                content={item.content}
                icon={item.icon}
                label={item.label}
                item={item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div className="w-full max-w-[1050px] overflow-hidden">
        <Swiper
          loop={true}
          className={cn("w-full min-w-[672px]")}
          spaceBetween={16}
          slidesPerView={isLgScreen ? 4 : 3}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          modules={[Navigation]}
        >
          {suggests.map((item: any) => (
            <SwiperSlide key={item.label}>
              <SuggestedBox
                content={item.content}
                icon={item.icon}
                label={item.label}
                item={item}
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

export { HomeSuggestBoxes };
