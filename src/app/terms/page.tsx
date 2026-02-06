import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이용약관 - 만약...',
  description: '만약... 사이트의 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
            &larr; 홈으로 돌아가기
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-6">이용약관</h1>
          <p className="text-sm text-gray-400 mb-8">시행일: 2026년 2월 6일</p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">1. 목적</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            이 약관은 "만약..." 사이트(manyak.xyz)가 제공하는 서비스의 이용 조건을 규정합니다.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">2. 서비스 내용</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>성격 테스트: 10개의 질문에 답하여 118개 원소 중 자신과 가장 닮은 원소를 찾는 서비스</li>
            <li>원소 도감: 118개 원소에 대한 교육적 정보 및 블로그 콘텐츠</li>
            <li>결과 공유: 테스트 결과를 이미지로 저장하거나 링크로 공유하는 기능</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">3. 이용 조건</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>이 서비스는 무료로 제공됩니다</li>
            <li>별도의 회원가입 없이 이용할 수 있습니다</li>
            <li>서비스 이용 시 광고가 표시될 수 있습니다</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">4. 콘텐츠 저작권</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>이 사이트의 모든 콘텐츠(텍스트, 디자인, 이미지, 코드)는 "만약..." 사이트에 귀속됩니다</li>
            <li>개인적인 비상업적 용도로 테스트 결과를 공유하는 것은 허용됩니다</li>
            <li>사이트의 콘텐츠를 무단으로 복제, 배포, 수정하는 것은 금지됩니다</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">5. 면책 조항</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>성격 테스트 결과는 재미를 위한 것이며, 과학적 또는 심리학적 진단이 아닙니다</li>
            <li>원소 관련 정보는 교육 목적으로 제공되며, 정확성을 보장하지 않습니다</li>
            <li>서비스 이용으로 인한 직간접적 손해에 대해 책임지지 않습니다</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">6. 광고</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>이 사이트는 Google AdSense를 통해 광고를 게재합니다</li>
            <li>광고 내용은 사이트 운영자가 통제하지 않으며, 광고주의 책임입니다</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">7. 서비스 변경 및 중단</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            운영자는 사전 통지 없이 서비스를 변경하거나 중단할 수 있습니다.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">8. 약관의 변경</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            이 약관은 변경될 수 있으며, 변경 시 사이트에 공지합니다.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">9. 문의</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            이메일: manyak.xyz@gmail.com
          </p>

          <footer className="mt-12 text-center text-gray-400 text-xs">
            <p>&copy; 2026 만약... All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
