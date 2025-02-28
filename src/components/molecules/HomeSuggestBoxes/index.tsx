"use client";
import { SuggestedBox } from "@/components/atoms";
import { useAppSelector } from "@/lib/store/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Імпортуємо стилі Swiper

const HomeSuggestBoxes = () => {
  const suggests = useAppSelector((state) => state.suggest.suggests);
  const isLgScreen = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

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
      </div>
      <div className="w-full max-w-[1050px] hidden lg:block">
        <Swiper
          className="min-w-[100vw] md:min-w-0 max-w-[calc(100%)]"
          spaceBetween={16}
          slidesPerView={4}
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
