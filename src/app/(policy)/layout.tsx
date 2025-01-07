import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex w-full absolute lg:static top-0 left-0 right-0 bottom-0 min-h-screen font-inter">
      <div className="flex-grow flex bg-navy-25 p-4">{children}</div>
    </main>
  );
}
