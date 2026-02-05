import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { elements } from '@/data/elements';
import { getPostsBySymbol } from '@/data/posts';
import { getCategoryColor, getCategoryNameKo } from '@/utils/matching';

export function generateStaticParams() {
  return elements.map((element) => ({
    symbol: element.symbol,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }): Promise<Metadata> {
  const { symbol } = await params;
  const element = elements.find(e => e.symbol === symbol);

  if (!element) {
    return { title: '원소를 찾을 수 없습니다' };
  }

  return {
    title: `${element.nameKo}(${element.symbol}) 탐구하기 - 만약...`,
    description: `${element.nameKo}에 대한 흥미로운 이야기와 과학 상식을 알아보세요.`,
  };
}

export default async function ElementPostsPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const element = elements.find(e => e.symbol === symbol);

  if (!element) {
    notFound();
  }

  const posts = getPostsBySymbol(symbol);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <nav className="mb-8 flex gap-4 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            &larr; 테스트 하기
          </Link>
          <Link href={`/elements/${symbol}`} className="text-gray-500 hover:text-gray-700 transition-colors">
            &larr; {element.nameKo} 정보
          </Link>
        </nav>

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg mb-8 text-center">
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm text-white mb-4 ${getCategoryColor(element.category)}`}>
            {getCategoryNameKo(element.category)}
          </div>
          <div className="text-6xl font-bold text-gray-800 mb-2">{element.symbol}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{element.nameKo} 탐구하기</h1>
          <p className="text-gray-500">{element.name} | 원자번호 {element.number}</p>
        </header>

        {/* Posts List */}
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/elements/${symbol}/posts/${post.slug}`}
                className="block bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-100 shadow-md hover:shadow-lg hover:border-orange-200 transition-all group"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-orange-100 shadow-md text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">콘텐츠 준비 중</h2>
            <p className="text-gray-500 mb-6">
              {element.nameKo}에 대한 흥미로운 글들을 준비하고 있어요!
            </p>
            <Link
              href={`/elements/${symbol}`}
              className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-medium hover:from-orange-500 hover:to-rose-500 transition-all"
            >
              기본 정보 보기
            </Link>
          </div>
        )}

        {/* Back to Test */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-2xl bg-white/70 hover:bg-white border border-orange-200 hover:border-orange-300 text-gray-600 font-medium transition-all"
          >
            테스트 다시 하기
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-xs">
          <p>&copy; 2026 만약... All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
