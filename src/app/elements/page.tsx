import { Metadata } from 'next';
import Link from 'next/link';
import { elements } from '@/data/elements';
import { getCategoryNameKo, getCategoryColor } from '@/utils/matching';

export const metadata: Metadata = {
  title: '모든 원소 - 내가 원소라면?',
  description: '118개 원소의 성격 특성과 설명을 살펴보세요. 각 원소가 어떤 성격을 나타내는지 알아보세요.',
  keywords: ['원소', '성격 테스트', '주기율표', '원소 성격', '화학 원소'],
};

// 카테고리별로 원소 그룹화
const categories = [
  { id: 'alkali-metal', name: '알칼리 금속', description: '활발하고 반응성이 높은 금속들' },
  { id: 'alkaline-earth', name: '알칼리 토금속', description: '안정적이고 든든한 금속들' },
  { id: 'transition', name: '전이 금속', description: '다재다능하고 실용적인 금속들' },
  { id: 'post-transition', name: '전이후 금속', description: '유연하고 적응력 있는 금속들' },
  { id: 'metalloid', name: '준금속', description: '금속과 비금속의 특성을 모두 가진 원소들' },
  { id: 'nonmetal', name: '비금속', description: '생명과 에너지의 핵심 원소들' },
  { id: 'halogen', name: '할로겐', description: '반응성이 강하고 열정적인 원소들' },
  { id: 'noble-gas', name: '비활성 기체', description: '독립적이고 안정적인 기체들' },
  { id: 'lanthanide', name: '란타넘족', description: '희귀하고 특별한 희토류 원소들' },
  { id: 'actinide', name: '악티늄족', description: '강력하고 신비로운 방사성 원소들' },
];

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

        {/* Categories */}
        <div className="space-y-12">
          {categories.map(category => {
            const categoryElements = elements.filter(el => el.category === category.id);
            if (categoryElements.length === 0) return null;

            return (
              <section key={category.id} className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-orange-100 shadow-lg">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-4 h-4 rounded-full ${getCategoryColor(category.id)}`}></span>
                    <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                    <span className="text-gray-400 text-sm">({categoryElements.length}개)</span>
                  </div>
                  <p className="text-gray-500 ml-7">{category.description}</p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                  {categoryElements.map(element => (
                    <Link
                      key={element.symbol}
                      href={`/elements/${element.symbol}`}
                      className="group block"
                    >
                      <div className="bg-white/70 hover:bg-white rounded-2xl p-3 border border-orange-100 hover:border-orange-300 transition-all duration-200 hover:shadow-md hover:scale-105 text-center">
                        <div className="text-xs text-gray-400 mb-1">{element.number}</div>
                        <div className="text-2xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                          {element.symbol}
                        </div>
                        <div className="text-xs text-gray-600 truncate">{element.nameKo}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

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
