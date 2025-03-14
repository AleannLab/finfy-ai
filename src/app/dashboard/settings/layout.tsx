import { Sidebar } from "@/components/organisms";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex w-full bg-navy-25 h-full min-h-[calc(100%)] font-inter">
      <Sidebar />
     {children}
    </main>
  );
}
