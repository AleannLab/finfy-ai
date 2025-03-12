import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex w-full absolute bg-navy-25 lg:static top-0 left-0 right-0 bottom-0 min-h-[calc(100vh-64px)] font-inter">
      {children}
    </main>
  );
}
