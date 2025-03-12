import { Icon, Button } from "@/components/atoms";

const FooterAuth = () => {
  return (
    <footer className="flex flex-col relative text-white z-10 justify-center items-center w-full gap-4 mt-auto mb-6">
      {/* <Icon type="FullLogoWhiteIcon" className="w-28 h-8" /> */}
      <div className="flex gap-4">
        <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7909 12.1333C12.7909 11.6179 13.2495 11.2 13.8152 11.2L30.203 11.2C30.7687 11.2 31.2273 11.6179 31.2273 12.1333V14.4667C31.2273 14.9821 30.7687 15.4 30.203 15.4H21.9005C21.4442 15.4 21.2157 15.9027 21.5384 16.1966L30.503 24.3656C30.903 24.7301 30.903 25.3211 30.503 25.6856L28.6874 27.34C28.2874 27.7045 27.6389 27.7045 27.2389 27.34L18.2742 19.1711C17.9516 18.8771 17.4 19.0853 17.4 19.501V27.0667C17.4 27.5821 16.9414 28 16.3758 28H13.8152C13.2495 28 12.7909 27.5821 12.7909 27.0667V12.1333Z" fill="#666" />
          <path d="M15.0827 0C14.6655 0 14.3273 0.308177 14.3273 0.688333V5.61166C14.3273 5.99182 14.6655 6.29999 15.0827 6.29999H18.181C18.5982 6.29999 18.9364 5.99182 18.9364 5.61166V0.688333C18.9364 0.308177 18.5982 0 18.181 0H15.0827Z" fill="#666" />
          <path d="M6.65826 12.6C7.07544 12.6 7.41364 12.9082 7.41364 13.2883V16.1117C7.41364 16.4918 7.07544 16.8 6.65826 16.8H1.25538C0.838194 16.8 0.5 16.4918 0.5 16.1117V13.2883C0.5 12.9082 0.838194 12.6 1.25538 12.6H6.65826Z" fill="#666" />
          <path d="M10.3402 5.99236C10.7205 6.33897 10.5921 6.93204 10.1426 7.2012C9.45047 7.6156 8.85738 8.15606 8.40262 8.78674C8.10723 9.1964 7.4564 9.31338 7.07603 8.96677L2.5705 4.86114C2.2755 4.59233 2.2755 4.1565 2.5705 3.88769L4.76635 1.88673C5.06135 1.61792 5.53963 1.61792 5.83462 1.88673L10.3402 5.99236Z" fill="#666" />
        </svg>
        <span className="text-white text-base font-semibold ">
          Espen
        </span>
      </div>
      <div className="flex gap-3 justify-between items-center px-2 flex-wrap md:gap-6">
        <Button
          href="/terms-of-service"
          as="link"
          className="underline text-white text-sm !font-medium underline-offset-4 p-0"
          variant="link"
        >
          Terms of Service
        </Button>
        <Button
          href="/privacy-policy"
          as="link"
          className="underline text-white text-sm !font-medium underline-offset-4 p-0"
          variant="link"
        >
          Privacy Policy
        </Button>
        <Button
          href="/acceptable-use-policy"
          as="link"
          className="underline text-sm text-white !font-medium underline-offset-4 p-0"
          variant="link"
        >
          Acceptable Use Policy
        </Button>
      </div>
    </footer>
  );
};

export { FooterAuth };
