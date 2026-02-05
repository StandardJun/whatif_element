import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "내가 원소라면? | 원소 성격 테스트",
  description: "10가지 질문으로 알아보는 나와 가장 닮은 원소! 118개 원소 중 당신의 성격과 가장 잘 맞는 원소를 찾아보세요.",
  keywords: ["원소 테스트", "성격 테스트", "MBTI", "원소 성격", "화학 원소", "심리 테스트"],
  openGraph: {
    title: "내가 원소라면? | 원소 성격 테스트",
    description: "10가지 질문으로 알아보는 나와 가장 닮은 원소!",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "내가 원소라면?",
    description: "나와 가장 닮은 원소를 찾아보세요!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
