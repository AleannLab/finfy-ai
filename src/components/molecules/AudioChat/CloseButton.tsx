"use client";
export const CloseButton = ({onClick}: any) => (
  <button type="button" onClick={onClick}
    className="min-w-10 h-10 p-3 bg-[#e9e9e9] rounded-[50px] shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.15)] outline outline-1 outline-[#e9e9e9] inline-flex justify-center items-center overflow-hidden"
  >
    <div className="w-4 h-4 relative overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 12L12 4M4 4L12 12" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </button>
);
