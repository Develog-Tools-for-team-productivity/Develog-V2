import type { Metadata } from "next";
import { Provider } from "jotai";
import { inter } from "@/app/ui/fonts";
import "@/app/ui/globals.css";
import { connectToMongoDB } from "./lib/db";
import ClientProvider from "./client-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | Develog Dashboard",
    default: "Develog Dashboard",
  },
  description:
    "Develog는 DORA Metrics를 주요 지표로 사용한 깃허브 기반 개발팀 생산성 향상 도구입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientProvider>
          <Provider>{children}</Provider>
        </ClientProvider>
      </body>
    </html>
  );
}
