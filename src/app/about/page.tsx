import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개 - 만약...',
  description: '만약... 사이트에 대한 소개입니다. 성격 테스트로 나와 닮은 원소를 찾아보세요!',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
          &larr; 홈으로 돌아가기
        </Link>

        {/* Main Intro Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg mb-8 mt-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">⚛️</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">만약... 에 대하여</h1>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>만약...</strong>은 재미있는 성격 테스트를 통해 자신을 새로운 시각으로 발견하는 사이트입니다.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>&quot;만약... 내가 원소라면?&quot;</strong>은 첫 번째 테스트로, 10개의 상황 기반 질문에 답하면 118개 원소 중 당신과 가장 닮은 원소를 찾아줍니다.
          </p>

          <p className="text-gray-600 leading-relaxed">
            향후 <strong>&quot;만약... 내가 꽃이라면?&quot;</strong>, <strong>&quot;만약... 내가 동물이라면?&quot;</strong> 등 다양한 테스트가 추가될 예정입니다.
          </p>
        </div>

        {/* Methodology Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">어떻게 매칭하나요?</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            테스트는 5가지 성격 차원을 측정합니다:
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">활동성</div>
              <div className="text-gray-600">에너지 레벨과 활동 선호도</div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">사교성</div>
              <div className="text-gray-600">인간관계 스타일</div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">안정성</div>
              <div className="text-gray-600">변화 vs 안정 선호</div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">감성</div>
              <div className="text-gray-600">논리 vs 감성 지향</div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-24 font-semibold text-orange-600">독창성</div>
              <div className="text-gray-600">전통 vs 혁신 선호</div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            각 질문은 이 5가지 차원을 측정하며, <strong>유클리드 거리 기반 유사도 계산</strong>으로 118개 원소 중 가장 잘 맞는 원소를 찾습니다.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">원소 도감 &amp; 블로그</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            118개 원소 각각에 대한 상세한 정보와 흥미로운 블로그 포스트를 제공합니다.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            각 원소 페이지에서 발견 역사, 실생활 용도, 재미있는 사실을 확인할 수 있습니다.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            중학생도 이해할 수 있는 수준의 과학 콘텐츠로 구성되어 있습니다.
          </p>

          <div className="text-center">
            <p className="text-lg font-semibold text-orange-600">
              118개 원소 • 350+ 블로그 포스트 • 5가지 성격 차원
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">지금 바로 테스트해보세요!</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg"
            >
              테스트 시작하기
            </Link>

            <Link
              href="/elements"
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-all shadow-md hover:shadow-lg border-2 border-orange-500"
            >
              원소 도감 보기
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center text-gray-500 text-sm mb-8">
          <p>문의사항이 있으시면 <a href="mailto:jkgkgj@naver.com" className="text-orange-600 hover:text-orange-700 underline">jkgkgj@naver.com</a>으로 연락해주세요.</p>
        </div>

      </div>
    </div>
  );
}
