import { cn } from "@/lib/utils";

export const ToggleSwitch = ({ isOn, setIsOn, disable }: { isOn: boolean, setIsOn: any, disable: any }) => {

    const toggleSwitch = () => {
      if (!disable) {
        setIsOn(!isOn);
      }
    };
  
    return (
      <>
        <div
          data-svg-wrapper
          className={cn("hidden lg:block", disable ? "cursor-not-allowed " : "cursor-pointer")}
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
        <div
          data-svg-wrapper
          className={cn(
            "flex lg:hidden items-center w-8 h-5 rounded-full p-1 transition-colors",
            disable ? "cursor-not-allowed bg-gray-300" : "cursor-pointer",
            isOn ? "bg-black" : "bg-gray-200"
          )}
          onClick={toggleSwitch}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full bg-white shadow-md transition-transform",
              isOn ? "translate-x-2.5" : "translate-x-0"
            )}
          />
        </div>
      </>
    );
  };