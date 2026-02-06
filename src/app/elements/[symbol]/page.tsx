import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { elements, Element } from '@/data/elements';
import { getCategoryNameKo, getCategoryColor } from '@/utils/matching';
import { getPostsBySymbol } from '@/data/posts';
import { getElementExtras, traitNames } from '@/data/elementExtras';
import { TraitsChart, HistorySection, UsesSection, FunFactsSection, CompatibilitySection, SameCategorySection, PostsPreview } from '@/components/ElementSections';
import ShareButton from '@/components/ShareButton';

// Static params 생성
export function generateStaticParams() {
  return elements.map((element) => ({
    symbol: element.symbol,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }): Promise<Metadata> {
  const { symbol } = await params;
  const element = elements.find(e => e.symbol === symbol);

  if (!element) {
    return {
      title: '원소를 찾을 수 없습니다 - 내가 원소라면?',
    };
  }

  return {
    title: `${element.nameKo}(${element.symbol}) - 내가 원소라면?`,
    description: element.description,
    keywords: [element.nameKo, element.name, element.symbol, '원소 성격', '성격 테스트'],
    openGraph: {
      title: `${element.nameKo}(${element.symbol}) - 내가 원소라면?`,
      description: element.description,
    },
  };
}

export default async function ElementDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const element = elements.find(e => e.symbol === symbol);

  if (!element) {
    notFound();
  }

  const extras = getElementExtras(symbol);

  // 궁합 원소들
  const goodMatches = element.goodMatch
    .map(num => elements.find(e => e.number === num))
    .filter((e): e is Element => e !== undefined);

  const badMatches = element.badMatch
    .map(num => elements.find(e => e.number === num))
    .filter((e): e is Element => e !== undefined);

  // 같은 카테고리 원소들
  const sameCategory = elements.filter(e =>
    e.category === element.category && e.number !== element.number
  );

  // 이전/다음 원소
  const prevElement = elements.find(e => e.number === element.number - 1);
  const nextElement = elements.find(e => e.number === element.number + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <nav className="mb-8 flex gap-4 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            &larr; 테스트 하기
          </Link>
          <Link href="/elements" className="text-gray-500 hover:text-gray-700 transition-colors">
            &larr; 모든 원소 보기
          </Link>
        </nav>

        {/* Main Card */}
        <article className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg mb-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm text-white mb-4 ${getCategoryColor(element.category)}`}>
              {getCategoryNameKo(element.category)}
            </div>

            <div className="mb-4">
              <span className="text-8xl font-bold text-gray-800">{element.symbol}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">{element.nameKo}</h1>
            <p className="text-gray-500 text-lg">
              {element.name} | 원자번호 {element.number}
            </p>
          </header>

          {/* Description */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">성격 특성</h2>
            <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                {element.description}
              </p>
            </div>
          </section>
        </article>

        {/* Sections as separate cards */}
        <div className="space-y-6 mb-8">
          <TraitsChart traits={element.traits} traitNames={traitNames} />
          <HistorySection history={extras.history} />
          <UsesSection uses={extras.uses} />
          <FunFactsSection funFacts={extras.funFacts} />
        </div>

        {/* Related Posts */}
        {(() => {
          const posts = getPostsBySymbol(symbol);
          if (posts.length === 0) return null;
          return <PostsPreview symbol={symbol} elementNameKo={element.nameKo} posts={posts} />;
        })()}

        {/* Compatibility */}
        <CompatibilitySection goodMatches={goodMatches} badMatches={badMatches} />

        {/* Navigation Section */}
        <div className="space-y-6 mb-8">
          {/* 전체 도감 버튼 */}
          <Link
            href="/elements"
            className="block w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-lg text-center hover:from-orange-500 hover:to-rose-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            🧪 전체 원소 도감 보기
          </Link>

          {/* 이전/다음 원소 */}
          <div className="flex gap-4">
            {prevElement ? (
              <Link
                href={`/elements/${prevElement.symbol}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/70 border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all"
              >
                <span className="text-gray-400">&larr;</span>
                <span className="text-2xl font-bold text-gray-700">{prevElement.symbol}</span>
                <span className="text-gray-600 text-sm hidden sm:inline">{prevElement.nameKo}</span>
              </Link>
            ) : (
              <div className="flex-1 flex items-center justify-center py-3 px-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-400">
                첫 번째 원소
              </div>
            )}

            {nextElement ? (
              <Link
                href={`/elements/${nextElement.symbol}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/70 border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all"
              >
                <span className="text-gray-600 text-sm hidden sm:inline">{nextElement.nameKo}</span>
                <span className="text-2xl font-bold text-gray-700">{nextElement.symbol}</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>
            ) : (
              <div className="flex-1 flex items-center justify-center py-3 px-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-400">
                마지막 원소
              </div>
            )}
          </div>

          {/* Same Category Section */}
          {sameCategory.length > 0 && (
            <SameCategorySection
              elements={sameCategory}
              categoryName={getCategoryNameKo(element.category)}
              currentSymbol={element.symbol}
            />
          )}
        </div>

        {/* CTA */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">나도 {element.nameKo} 같은 사람일까?</h2>
          <p className="text-gray-600 mb-6">
            10개의 간단한 질문에 답하고, 나와 가장 닮은 원소를 찾아보세요!
          </p>
          <Link
            href="/"
            className="inline-block w-full max-w-md py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-lg hover:from-orange-500 hover:to-rose-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            테스트 시작하기
          </Link>
          <ShareButton
            url={`https://manyak.xyz/elements/${element.symbol}`}
            text={`${element.nameKo}(${element.symbol}) - 만약... 내가 원소라면?`}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-xs">
          <p>&copy; 2026 내가 원소라면? All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
