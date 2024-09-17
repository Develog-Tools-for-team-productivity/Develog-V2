import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "@/app/ui/globals.css";

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
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
