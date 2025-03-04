import type { Color, Size } from "./index.types";

const variantClasses: Record<Color, string> = {
  default: "text-[#272E48] shadow hover:bg-[#FBAB19] h-10 p-3 bg-[#666] !rounded-[50px] shadow-inner border border-[#666] ",
  destructive: "text-purple-15 bg-purple-15 bg-opacity-10 hover:bg-opacity-30",
  outline:
    "border border-input bg-background shadow-sm text-[#272E48] hover:bg-navy-15 hover:text-navy-15-foreground",
  secondary: "bg-secondary text-[#272E48] shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-navy-5 text-grey-15 hover:text-[#272E48]",
  link: "text-[#272E48] underline-offset-4 hover:underline",
  transparent: "!bg-transparent h-10 w-10 !rounded-[50px] ",
  outlineMain: "h-10 text-black bg-white hover:bg-black hover:text-white text-base font-semibold  leading-normal px-4 py-2 !rounded-lg  !shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.15)] border border-black justify-center items-center gap-3 inline-flex overflow-hidden !rounded-lg",
  main: "h-10 text-white bg-black hover:bg-white hover:text-black text-base font-semibold  leading-normal px-4 py-2 !rounded-lg  !shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.15)] border border-black justify-center items-center gap-3 inline-flex overflow-hidden !rounded-lg"
};

const sizeClassesWithText: Record<Size, string> = {
  xs: "py-1 px-2",
  sm: "py-1 px-2",
  base: "py-1.5 px-2.5",
  lg: "py-2 px-3",
  xl: "py-2 px-4",
};

const sizeClassesWithIconOnly: Record<Size, string> = {
  xs: "p-1",
  sm: "p-1.5",
  base: "p-2",
  lg: "p-2.5",
  xl: "p-3",
};

export { variantClasses, sizeClassesWithText, sizeClassesWithIconOnly };
