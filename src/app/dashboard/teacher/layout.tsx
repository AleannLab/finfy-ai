import { Sidebar } from "@/components/organisms";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex w-full bg-navy-25 absolute lg:static top-0 left-0 right-0 bottom-0 min-h-screen font-inter">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        {children}
        <footer className="w-[372px] mt-8 mx-auto text-center text-black text-sm font-medium leading-normal">Espen can make mistakes. Check important info.</footer>
      </div>
    </main>
  );
}
