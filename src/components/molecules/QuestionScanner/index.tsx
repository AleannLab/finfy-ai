"use client";

import { FC } from "react";

interface QuestionScannerProps {}

const QuestionScanner: FC<QuestionScannerProps> = ({}) => {
  return (
    <div className="relative w-full h-full max-w-md mx-auto overflow-hidden rounded-lg">
      {/* Rounded corner borders */}
      <div className="absolute z-[999] top-0 left-0 w-10 h-10 rounded-tl-lg border-t-[2px] border-l-[2px] border-[#FBAB18]"></div>
      <div className="absolute z-[999] top-0 right-0 w-10 h-10 rounded-tr-lg border-t-[2px] border-r-[2px] border-[#FBAB18]"></div>
      <div className="absolute z-[999] bottom-0 left-0 w-10 h-10 rounded-bl-lg border-b-[2px] border-l-[2px] border-[#FBAB18]"></div>
      <div className="absolute z-[999] bottom-0 right-0 w-10 h-10 rounded-br-lg border-b-[2px] border-r-[2px] border-[#FBAB18]"></div>

      {/* Background grid or placeholder content */}
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-3xl text-[#272E48] font-semibold">Scan question</p>
      </div>

      {/* Scanning line */}
      <div className="absolute inset-x-0 h-1 bg-[#FBAB18] animate-scan"></div>
    </div>
  );
};

export { QuestionScanner };
