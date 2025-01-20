import { Sidebar } from "@/components/organisms";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex w-full border-2 bg-navy-25 absolute lg:static top-0 left-0 right-0 bottom-0 font-inter">
      <Sidebar />
      {children}
    </main>
  );
}
