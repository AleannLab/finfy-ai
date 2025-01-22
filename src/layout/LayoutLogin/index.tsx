import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import clsx from "clsx";
import { RootMain } from "@/components/atoms";
import { FooterAuth } from "@/components/molecules";

interface LayoutLoginProps extends PropsWithChildren {
  classes?: {
    wrapper?: string;
  };
}

const LayoutLogin: FC<LayoutLoginProps> = ({ children, classes }) => {
  return (
    <RootMain className={clsx("w-full bg-[#1F1F1F] flex-col flex", classes?.wrapper)}>
      <div className="flex flex-col w-full mt-[100px] items-center justify-center">
        <div className="flex gap-4">
          <svg width="47" height="42" viewBox="0 0 47 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.5 19.5C34.5 27.7843 27.7843 34.5 19.5 34.5C11.2157 34.5 4.5 27.7843 4.5 19.5C4.5 11.2157 11.2157 4.5 19.5 4.5C27.7843 4.5 34.5 11.2157 34.5 19.5Z" fill="#FFE7BC" />
            <path d="M18.4364 18.2C18.4364 17.4268 19.1242 16.8 19.9727 16.8L44.5545 16.8C45.4031 16.8 46.0909 17.4268 46.0909 18.2V21.7C46.0909 22.4732 45.4031 23.1 44.5545 23.1H32.1007C31.4164 23.1 31.0736 23.854 31.5576 24.295L45.0045 36.5484C45.6045 37.0952 45.6045 37.9816 45.0045 38.5283L42.2811 41.01C41.6811 41.5568 40.7083 41.5568 40.1083 41.01L26.6614 28.7566C26.1774 28.3156 25.35 28.6279 25.35 29.2516V40.6C25.35 41.3732 24.6621 42 23.8136 42H19.9727C19.1242 42 18.4364 41.3732 18.4364 40.6V18.2Z" fill="#FBAB18" />
            <path d="M21.874 0C21.2482 0 20.7409 0.462265 20.7409 1.0325V8.41749C20.7409 8.98773 21.2482 9.44999 21.874 9.44999H26.5215C27.1473 9.44999 27.6545 8.98773 27.6545 8.41749V1.0325C27.6545 0.462266 27.1473 0 26.5215 0H21.874Z" fill="#FBAB18" />
            <path d="M9.23738 18.9C9.86316 18.9 10.3705 19.3623 10.3705 19.9325V24.1675C10.3705 24.7377 9.86316 25.2 9.23739 25.2H1.13307C0.507291 25.2 0 24.7377 0 24.1675V19.9325C0 19.3623 0.507292 18.9 1.13307 18.9H9.23738Z" fill="#FBAB18" />
            <path d="M14.7602 8.98854C15.3308 9.50845 15.1382 10.3981 14.4639 10.8018C13.4257 11.4234 12.5361 12.2341 11.8539 13.1801C11.4108 13.7946 10.4346 13.9701 9.86404 13.4502L3.10575 7.29171C2.66325 6.88849 2.66325 6.23475 3.10575 5.83153L6.39953 2.8301C6.84202 2.42688 7.55944 2.42688 8.00193 2.8301L14.7602 8.98854Z" fill="#FBAB18" />
          </svg>
          <div className="text-white mt-3 text-center h-full flex items-center justify-center text-base font-semibold ">
            <>Career Buddy</>
          </div>
        </div>
      </div>
      {/* <div
        className={
          "relative hidden bg-white lg:flex justify-center items-center flex-[60%]"
        }
      >
        <Image
          fill
          src={"/images/view.png"}
          className="!bottom-20 !top-auto !-left-1/4 !right-auto !max-w-xl !h-auto"
          objectFit="contain"
          alt="view"
        />
        <Image
          fill
          src={"/images/view.png"}
          className="!top-1/3 !bottom-auto !left-1/2 !right-auto !max-w-xl !h-auto"
          objectFit="contain"
          alt="view"
        />
        <div className="flex text-[#272E48] flex-col gap-6 items-start max-w-xl">
          <h1 className=" text-4xl font-bold">
            Financially empower yourself with <span className="text-[#74BBC9]">Career buddy</span>
          </h1> 
          <p className=" text-lg font-medium">
            Empower Your Financial Institution with Customizable Virtual
            Financial Assistants and Conversational AI, Tailored to Speak Your
            Customers Language on Their Preferred Channels.
          </p>
        </div>
      </div>
      <div className={clsx("relative flex-1 lg:flex-[40%]")}>
        <Image
          fill
          src={"/images/bg-login-page.png"}
          alt="background-login-page"
          objectFit="cover"
          className={""}
        />
        <div className={"h-full flex-col flex bg-[#547A91]"}> */}
      <div className="flex-1 flex justify-center items-center relative z-10 p-6">
        {children}
      </div>
      {/* <FooterAuth />
        </div>
      </div> */}
      <div className="text-center text-sm w-full px-5 flex items-center justify-center pb-5 lg:pb-24 text-[#F3F9ED]">
        <div className="text-center text-sm max-w-[410px] text-[#F3F9ED]">
          By continuing, you agree to Career Buddy’s{" "}
          <a
            href="/terms-of-service"
            className="text-[#FBAB18] underline hover:no-underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy-policy"
            className="text-[#FBAB18] underline hover:no-underline"
          >
            Usage Policy
          </a>
          , and acknowledge our{" "}
          <a
            href="/privacy-policy"
            className="text-[#FBAB18] underline hover:no-underline"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </RootMain>
  );
};

export { LayoutLogin };
