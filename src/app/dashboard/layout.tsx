'use client'
import { Sidebar } from "@/components/organisms";
import { useSidebar } from "@/hooks";
import { ReactNode, useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { open, handleToggle } = useSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex w-full overflow-hidden min-h-screen fixed md:static top-0 bottom-0 left-0 right-0 font-inter">
      <Sidebar />
      {open && isClient && <div className="flex-grow lg:hidden z-20 opacity-50 h-screen top-0 bottom-0 right-0 left-0 absolute flex bg-black"/>}
      <div className="flex-grow flex bg-navy-25">{children}</div>
    </main>
  );
}
