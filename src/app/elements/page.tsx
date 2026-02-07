import { Metadata } from 'next';
import Link from 'next/link';
import ElementsPageContent from '@/components/ElementsPageContent';

export const metadata: Metadata = {
  title: '모든 원소 - 내가 원소라면?',
  description: '118개 원소의 성격 특성과 설명을 살펴보세요. 각 원소가 어떤 성격을 나타내는지 알아보세요.',
  keywords: ['원소', '성격 테스트', '주기율표', '원소 성격', '화학 원소'],
};

export default function ElementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 text-gray-500 hover:text-gray-700 transition-colors">
            &larr; 테스트 하러 가기
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">118개 원소 도감</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            각 원소가 어떤 성격을 나타내는지 살펴보세요.
            원소를 클릭하면 자세한 설명을 볼 수 있습니다.
          </p>
        </header>

        {/* Content with toggle */}
        <ElementsPageContent />

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">나와 닮은 원소는?</h2>
            <p className="text-gray-600 mb-6">
              10개의 간단한 질문에 답하고, 118개 원소 중 나와 가장 닮은 원소를 찾아보세요!
            </p>
            <Link
              href="/"
              className="inline-block w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-lg hover:from-orange-500 hover:to-rose-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              테스트 시작하기
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
