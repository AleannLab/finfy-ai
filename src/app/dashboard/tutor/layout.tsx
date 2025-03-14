import { Sidebar } from "@/components/organisms";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex w-full absolute bg-navy-25 lg:static top-0 left-0 right-0 bottom-0 min-h-[calc(100%)] font-inter">
      <Sidebar />
      <div className="flex flex-col w-full mb-2 h-full">
        {children}
        {/* <footer className="max-w-[372px] w-[calc(100%-64px)] mb-1   mx-8 sm:mx-auto mt-8 text-center text-black text-sm font-medium leading-normal">Espen can make mistakes. Check important info.</footer> */}
      </div>
    </main>
  );
}
