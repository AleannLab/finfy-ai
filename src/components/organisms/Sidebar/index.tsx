"use client";

import { Button, Icon } from "@/components/atoms";
import {
  UserSettings,
  MenuAccordion,
  SubscribePop,
} from "@/components/molecules";
import Image from "next/image";
import Link from "next/link";
import { ScrollableArea } from "@/components/molecules";
import { cn } from "@/lib/utils";
import { useChat, useSidebar } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateNewChatPop } from "../CreateNewChatPop";

const Sidebar = () => {
  const router = useRouter();
  const { handleResetChat } = useChat();
  const { open, handleToggle, handleClose } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsResizing(true);
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;
      if (isMobile) {
        handleClose();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleClose]);

  useEffect(() => {
    if (isResizing) {
      const timeout = setTimeout(() => setIsResizing(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isResizing]);



  const handleClick = () => {
    handleResetChat();
    router.push("/dashboard");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <aside
      className={cn(
        "right-sidebar transition-all flex flex-col fixed inset-0 !z-[201] w-full lg:sticky top-0 bottom-0 md:max-w-64",
        open
          ? "translate-x-0 w-[calc(100%-38px)] md:w-full"
          : "-translate-x-full lg:translate-x-0 lg:max-w-14"
      )}
    >
      <div className="px-2 flex flex-col">
        <div
          className={cn("my-5 flex justify-between items-center", {
            "lg:flex-col-reverse lg:gap-2": !open,
          })}
        >
          <button onClick={handleClick}>
            {open ? (
              // <Image
              //   src="/icons/full-logo.svg"
              //   height={28}
              //   width={30}
              //   alt="logo"
              //   className="cursor-pointer"
              // />
              <>
                <div className="w-[169px] h-9 relative">
                  {/* <div className="w-[110px] left-[38px] top-[10px] absolute text-[#547a91] text-base font-semibold leading-none">Espen</div>
                  <Icon type="LogoIcon" /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="135" height="29" viewBox="0 0 135 29" fill="none">
                    <path d="M35.813 13.6972C35.813 14.095 35.787 14.4927 35.7352 14.8905H26.1108C26.1627 15.6861 26.3789 16.2827 26.7593 16.6805C27.1571 17.061 27.6587 17.2512 28.264 17.2512C29.1114 17.2512 29.7167 16.8707 30.0799 16.1098H35.5017C35.2769 17.1129 34.8359 18.0122 34.1787 18.8077C33.5388 19.586 32.7259 20.1999 31.7401 20.6496C30.7544 21.0992 29.6648 21.324 28.4715 21.324C27.0361 21.324 25.7563 21.0214 24.6321 20.4161C23.5253 19.8108 22.6519 18.9461 22.012 17.8219C21.3894 16.6978 21.0781 15.3748 21.0781 13.8528C21.0781 12.3309 21.3894 11.0166 22.012 9.90972C22.6346 8.78558 23.4993 7.92085 24.6062 7.31555C25.7303 6.71024 27.0188 6.40759 28.4715 6.40759C29.9069 6.40759 31.1781 6.7016 32.2849 7.28961C33.3918 7.87762 34.2565 8.72505 34.8791 9.83189C35.5017 10.9214 35.813 12.2099 35.813 13.6972ZM30.6247 12.4261C30.6247 11.8035 30.4171 11.3192 30.0021 10.9733C29.587 10.6101 29.0682 10.4285 28.4456 10.4285C27.823 10.4285 27.3128 10.6015 26.915 10.9474C26.5172 11.276 26.2578 11.7689 26.1367 12.4261H30.6247Z" fill="black" />
                    <path d="M44.0939 21.324C42.7795 21.324 41.6035 21.1079 40.5658 20.6755C39.5454 20.2259 38.7326 19.6205 38.1273 18.8596C37.5393 18.0813 37.2107 17.208 37.1415 16.2395H42.0704C42.1396 16.7064 42.3558 17.0696 42.7189 17.329C43.0821 17.5884 43.5318 17.7182 44.0679 17.7182C44.483 17.7182 44.8116 17.6317 45.0537 17.4587C45.2958 17.2858 45.4169 17.061 45.4169 16.7843C45.4169 16.4211 45.218 16.153 44.8202 15.9801C44.4224 15.8071 43.7653 15.6169 42.8487 15.4093C41.811 15.2018 40.9463 14.9683 40.2545 14.7089C39.5627 14.4495 38.9574 14.0258 38.4386 13.4378C37.937 12.8498 37.6863 12.0542 37.6863 11.0511C37.6863 10.1864 37.9197 9.40818 38.3867 8.7164C38.8536 8.00733 39.5368 7.44526 40.4361 7.03019C41.3527 6.61512 42.4509 6.40759 43.7307 6.40759C45.6331 6.40759 47.129 6.87454 48.2186 7.80844C49.3081 8.74234 49.9394 9.97025 50.1123 11.4922H45.5206C45.4342 11.0252 45.2266 10.6707 44.898 10.4285C44.5867 10.1691 44.163 10.0394 43.6269 10.0394C43.2118 10.0394 42.8919 10.1172 42.6671 10.2729C42.4595 10.4285 42.3558 10.6447 42.3558 10.9214C42.3558 11.2673 42.5546 11.5354 42.9524 11.7256C43.3502 11.8986 43.9901 12.0802 44.8721 12.2704C45.9271 12.4952 46.8004 12.746 47.4922 13.0227C48.2013 13.2994 48.8152 13.7491 49.3341 14.3717C49.8702 14.977 50.1383 15.8071 50.1383 16.8621C50.1383 17.7095 49.8875 18.4705 49.3859 19.1449C48.9017 19.8194 48.2013 20.3556 47.2847 20.7533C46.3854 21.1338 45.3218 21.324 44.0939 21.324Z" fill="black" />
                    <path d="M57.7225 8.61263C58.1203 7.93815 58.6824 7.40202 59.4088 7.00425C60.1351 6.60648 60.9912 6.40759 61.977 6.40759C63.1357 6.40759 64.182 6.71024 65.1159 7.31555C66.0671 7.92085 66.8108 8.78558 67.3469 9.90972C67.9003 11.0339 68.177 12.3482 68.177 13.8528C68.177 15.3575 67.9003 16.6805 67.3469 17.8219C66.8108 18.9461 66.0671 19.8108 65.1159 20.4161C64.182 21.0214 63.1357 21.324 61.977 21.324C60.9912 21.324 60.1351 21.1252 59.4088 20.7274C58.6997 20.3296 58.1376 19.7935 57.7225 19.119V28.0948H52.638V6.58918H57.7225V8.61263ZM63.0146 13.8528C63.0146 12.9017 62.7552 12.1666 62.2364 11.6478C61.7349 11.1117 61.1123 10.8436 60.3686 10.8436C59.6249 10.8436 58.9937 11.1117 58.4749 11.6478C57.9733 12.1839 57.7225 12.9189 57.7225 13.8528C57.7225 14.804 57.9733 15.5477 58.4749 16.0838C58.9937 16.62 59.6249 16.888 60.3686 16.888C61.1123 16.888 61.7349 16.62 62.2364 16.0838C62.7552 15.5304 63.0146 14.7867 63.0146 13.8528Z" fill="black" />
                    <path d="M84.1749 13.6972C84.1749 14.095 84.149 14.4927 84.0971 14.8905H74.4728C74.5246 15.6861 74.7408 16.2827 75.1213 16.6805C75.5191 17.061 76.0206 17.2512 76.6259 17.2512C77.4733 17.2512 78.0786 16.8707 78.4418 16.1098H83.8636C83.6388 17.1129 83.1978 18.0122 82.5406 18.8077C81.9007 19.586 81.0879 20.1999 80.1021 20.6496C79.1163 21.0992 78.0268 21.324 76.8334 21.324C75.398 21.324 74.1182 21.0214 72.9941 20.4161C71.8872 19.8108 71.0139 18.9461 70.374 17.8219C69.7514 16.6978 69.4401 15.3748 69.4401 13.8528C69.4401 12.3309 69.7514 11.0166 70.374 9.90972C70.9966 8.78558 71.8613 7.92085 72.9681 7.31555C74.0923 6.71024 75.3807 6.40759 76.8334 6.40759C78.2689 6.40759 79.54 6.7016 80.6469 7.28961C81.7537 7.87762 82.6184 8.72505 83.241 9.83189C83.8636 10.9214 84.1749 12.2099 84.1749 13.6972ZM78.9866 12.4261C78.9866 11.8035 78.7791 11.3192 78.364 10.9733C77.9489 10.6101 77.4301 10.4285 76.8075 10.4285C76.1849 10.4285 75.6747 10.6015 75.2769 10.9474C74.8792 11.276 74.6198 11.7689 74.4987 12.4261H78.9866Z" fill="black" />
                    <path d="M95.7763 6.45947C97.4539 6.45947 98.7856 7.02154 99.7713 8.14568C100.757 9.25253 101.25 10.7571 101.25 12.6595V21.1425H96.1655V13.334C96.1655 12.5039 95.9493 11.8553 95.5169 11.3884C95.0846 10.9041 94.5052 10.662 93.7788 10.662C93.0179 10.662 92.4212 10.9041 91.9888 11.3884C91.5565 11.8553 91.3403 12.5039 91.3403 13.334V21.1425H86.2557V6.58918H91.3403V8.66452C91.79 8.00733 92.3953 7.47985 93.1562 7.08207C93.9172 6.66701 94.7905 6.45947 95.7763 6.45947Z" fill="black" />
                    <path d="M106.504 21.35C105.605 21.35 104.879 21.1079 104.325 20.6236C103.789 20.1221 103.521 19.4908 103.521 18.7299C103.521 17.9689 103.789 17.3377 104.325 16.8361C104.879 16.3346 105.605 16.0838 106.504 16.0838C107.386 16.0838 108.096 16.3346 108.632 16.8361C109.185 17.3377 109.462 17.9689 109.462 18.7299C109.462 19.4735 109.185 20.0961 108.632 20.5977C108.096 21.0992 107.386 21.35 106.504 21.35Z" fill="black" />
                    <path d="M111.013 13.8528C111.013 12.3482 111.281 11.0339 111.817 9.90972C112.37 8.78558 113.114 7.92085 114.048 7.31555C114.999 6.71024 116.054 6.40759 117.213 6.40759C118.216 6.40759 119.08 6.60648 119.807 7.00425C120.533 7.40202 121.095 7.93815 121.493 8.61263V6.58918H126.578V21.1425H121.493V19.119C121.095 19.7935 120.525 20.3296 119.781 20.7274C119.055 21.1252 118.198 21.324 117.213 21.324C116.054 21.324 114.999 21.0214 114.048 20.4161C113.114 19.8108 112.37 18.9461 111.817 17.8219C111.281 16.6805 111.013 15.3575 111.013 13.8528ZM121.493 13.8528C121.493 12.9189 121.234 12.1839 120.715 11.6478C120.213 11.1117 119.591 10.8436 118.847 10.8436C118.086 10.8436 117.455 11.1117 116.953 11.6478C116.452 12.1666 116.201 12.9017 116.201 13.8528C116.201 14.7867 116.452 15.5304 116.953 16.0838C117.455 16.62 118.086 16.888 118.847 16.888C119.591 16.888 120.213 16.62 120.715 16.0838C121.234 15.5477 121.493 14.804 121.493 13.8528Z" fill="black" />
                    <path d="M132.043 5.24022C131.144 5.24022 130.417 4.99809 129.864 4.51385C129.328 4.01231 129.06 3.38971 129.06 2.64605C129.06 1.88509 129.328 1.25385 129.864 0.752309C130.417 0.25077 131.144 0 132.043 0C132.925 0 133.634 0.25077 134.17 0.752309C134.724 1.25385 135.001 1.88509 135.001 2.64605C135.001 3.38971 134.724 4.01231 134.17 4.51385C133.634 4.99809 132.925 5.24022 132.043 5.24022ZM134.56 6.58918V21.1425H129.475V6.58918H134.56Z" fill="black" />
                    <path d="M11.1509 13.2448L17.5427 24.3158H4.75906L11.1509 13.2448Z" fill="black" />
                    <path d="M6.3918 16.4755L0 5.40454L12.7836 5.40454L6.3918 16.4755Z" fill="black" />
                  </svg>
                </div>
              </>
            ) : (
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1509 8.24655L17.5427 19.3175H4.75906L11.1509 8.24655Z" fill="black" />
                <path d="M6.3918 11.4772L0 0.40625L12.7836 0.406251L6.3918 11.4772Z" fill="black" />
              </svg>

            )}
          </button>
          <Button onClick={handleToggle} variant="ghost">
            <Icon
              type={"ToggleSidebarIcon"}
              className={cn({ "rotate-180": !open })}
            />
          </Button>
        </div>
        {/* <CreateNewChatPop> */}
        {/* <Button
            onClick={()=> {
              router.push('/dashboard')
              handleToggle()
              handleResetChat()
            }}
            variant="ghost"
            className="flex gap-2 bg-navy-25 group text-nowrap border-purple-15 justify-start px-2 items-center border w-full !rounded-sm"
          >
            <Icon
              type="PlusSolidIcon"
              className="fill-grey-15 group-hover:fill-white w-5 h-5"
            />

            <span
              className={cn("text-base text-grey-15 group-hover:text-[#547a91]", {
                "lg:hidden": !open,
              })}
            >
              New Thread
            </span>
          </Button> */}
        {/* </CreateNewChatPop> */}
      </div>
      <ScrollableArea className="px-2">
        <MenuAccordion />
      </ScrollableArea>
      <div className="mt-auto">
        {/* <Button
          full
          icons={{
            iconLeft: (
              <Icon
                type="DownloadIcon"
                className="w-6 h-6 stroke-grey-15 group-hover:stroke-white"
              />
            ),
          }}
          className={cn(
            "justify-start items-center gap-3 p-2 !rounded-none font-normal",
            {
              "lg:justify-center": !open,
            }
          )}
          variant="ghost"
        >
          <span className={cn({ "lg:hidden": !open })}>Download</span>
        </Button>
        <Button
          full
          icons={{
            iconLeft: (
              <Icon
                type="DotsIcon"
                className="w-6 h-6 stroke-grey-15 group-hover:stroke-white"
              />
            ),
          }}
          className={cn(
            "justify-start items-center gap-3 p-2 !rounded-none font-normal",
            {
              "lg:justify-center": !open,
            }
          )}
          variant="ghost"
        >
          <span className={cn({ "lg:hidden": !open })}>More</span>
        </Button> */}
        {/* <Button
          full
          className={cn(
            "justify-start items-center text-xs font-semibold border-t border-t-navy-5 text-[#547a91] p-6 !rounded-none",
            {
              "lg:hidden": !open,
            }
          )}
          variant="ghost"
        >
          Business Profile
        </Button> */}
        <UserSettings />
        {/* <div
          className={cn("menu-button-btn", {
            "lg:!p-2": !open,
          })}
        >
          <SubscribePop>
            <Button full className="!rounded-sm gap-1.5 h-7 p-0 text-nowrap">
              <Icon type="ExtLinkIcon" className="size-4 text-grey-15" />
              <span className={cn({ "lg:hidden": !open })}>Try pro</span>
            </Button>
          </SubscribePop>
        </div> */}
      </div>
    </aside>
  );
};

export { Sidebar };
