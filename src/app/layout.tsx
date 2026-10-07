import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "캐릭터 챗봇 실습",
  description: "나만의 캐릭터와 대화하는 Next.js 실습",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
