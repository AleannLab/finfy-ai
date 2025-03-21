import { ReactNode } from "react";
import Head from "next/head";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import clsx from "clsx";
import {
  FullScreenLoader,
  Initializer,
  ClarityAnalytics,
} from "@/components/molecules";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Espen",
  description: "Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html style={{
      height: "100%"
    }} lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon.ico?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.ico?v=2"
        />
        <link
          rel="icon"
          href="/favicon.ico?v=2"
        />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"></meta>
      </Head>
      <StoreProvider>
        <ClarityAnalytics />
        <body className={clsx(inter.className, "min-h-[100%] !max-h-[100%] overflow-x-hidden md:overflow-y-hidden md:overflow-hidden")}>
          <FullScreenLoader />
          {children}
          <Toaster />
          <Initializer />
        </body>
      </StoreProvider>
    </html>
  );
}
