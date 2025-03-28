"use client";
export const SubmitAudio = ({onClick}: any) => (
  <button onClick={onClick}
    type="button" className="min-w-10 h-10 p-3 bg-black rounded-[50px] shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.15)] outline outline-1 outline-black inline-flex justify-center items-center overflow-hidden">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3.33594 8.66797L6.0026 11.3346L12.6693 4.66797" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
);
