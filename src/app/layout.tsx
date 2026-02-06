import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "만약... 내가 원소라면? | 원소 성격 테스트",
  description: "10가지 질문으로 알아보는 나와 가장 닮은 원소! 118개 원소 중 당신의 성격과 가장 잘 맞는 원소를 찾아보세요.",
  keywords: ["만약", "원소 테스트", "성격 테스트", "MBTI", "원소 성격", "화학 원소", "심리 테스트"],
  openGraph: {
    title: "만약... 내가 원소라면? | 원소 성격 테스트",
    description: "10가지 질문으로 알아보는 나와 가장 닮은 원소!",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "만약... 내가 원소라면?",
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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4466574123469106"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "만약... 내가 원소라면?",
              "url": "https://manyak.xyz",
              "description": "10가지 질문으로 알아보는 나와 가장 닮은 원소! 118개 원소 중 당신의 성격과 가장 잘 맞는 원소를 찾아보세요.",
              "inLanguage": ["ko", "en"],
            }),
          }}
        />
      </head>
      <body className={`${notoSansKr.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white/60 backdrop-blur-sm border-t border-orange-100">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-3">
              <Link href="/about" className="hover:text-gray-700 transition-colors">소개</Link>
              <span className="text-gray-300">|</span>
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">개인정보처리방침</Link>
              <span className="text-gray-300">|</span>
              <Link href="/terms" className="hover:text-gray-700 transition-colors">이용약관</Link>
              <span className="text-gray-300">|</span>
              <a href="mailto:manyak.xyz@gmail.com" className="hover:text-gray-700 transition-colors">문의</a>
            </nav>
            <p className="text-center text-gray-400 text-xs">&copy; 2026 만약... All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
