import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { elements } from '@/data/elements';
import { getPost, getPostsBySymbol } from '@/data/posts';
import { getCategoryColor, getCategoryNameKo } from '@/utils/matching';

export function generateStaticParams() {
  const params: { symbol: string; slug: string }[] = [];

  elements.forEach((element) => {
    const posts = getPostsBySymbol(element.symbol);
    posts.forEach((post) => {
      params.push({
        symbol: element.symbol,
        slug: post.slug,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ symbol: string; slug: string }> }): Promise<Metadata> {
  const { symbol, slug } = await params;
  const element = elements.find(e => e.symbol === symbol);
  const post = getPost(symbol, slug);

  if (!element || !post) {
    return { title: '글을 찾을 수 없습니다' };
  }

  return {
    title: `${post.title} - ${element.nameKo} | 만약...`,
    description: post.summary,
    keywords: [...post.tags, element.nameKo, element.name],
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ symbol: string; slug: string }> }) {
  const { symbol, slug } = await params;
  const element = elements.find(e => e.symbol === symbol);
  const post = getPost(symbol, slug);

  if (!element || !post) {
    notFound();
  }

  const allPosts = getPostsBySymbol(symbol);
  const otherPosts = allPosts.filter(p => p.slug !== slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <nav className="mb-8 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            &larr; 테스트
          </Link>
          <Link href={`/elements/${symbol}`} className="text-gray-500 hover:text-gray-700 transition-colors">
            &larr; {element.nameKo} 정보
          </Link>
          <Link href={`/elements/${symbol}/posts`} className="text-gray-500 hover:text-gray-700 transition-colors">
            &larr; 글 목록
          </Link>
        </nav>

        {/* Article */}
        <article className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg mb-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href={`/elements/${symbol}`}
                className={`px-3 py-1 rounded-full text-sm text-white ${getCategoryColor(element.category)}`}
              >
                {element.symbol} {element.nameKo}
              </Link>
              <span className="text-gray-400 text-sm">{getCategoryNameKo(element.category)}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">{post.title}</h1>
            <p className="text-gray-500 text-lg">{post.summary}</p>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 -mx-8 -mt-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              // 볼드 텍스트 파싱 함수
              const parseBoldText = (text: string) => {
                const parts = text.split(/(\*\*[^*]+\*\*)/g);
                return parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={i} className="font-bold text-gray-900">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                });
              };

              // 인라인 이미지 처리
              if (paragraph.startsWith('![')) {
                const match = paragraph.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                if (match) {
                  return (
                    <figure key={index} className="my-8 -mx-2 sm:-mx-4">
                      <img src={match[2]} alt={match[1]} className="w-full h-56 sm:h-72 object-cover rounded-2xl" />
                      {match[1] && (
                        <figcaption className="text-center text-gray-400 text-sm mt-3">{match[1]}</figcaption>
                      )}
                    </figure>
                  );
                }
              }

              // 헤딩 처리
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-3xl font-bold text-gray-800 mt-10 mb-5">
                    {parseBoldText(paragraph.replace('## ', ''))}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    {parseBoldText(paragraph.replace('### ', ''))}
                  </h3>
                );
              }
              // 리스트 처리
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-outside ml-6 space-y-3 text-lg text-gray-700 my-6">
                    {items.map((item, i) => (
                      <li key={i} className="pl-2 leading-relaxed">
                        {parseBoldText(item.replace('- ', ''))}
                      </li>
                    ))}
                  </ul>
                );
              }
              // 일반 단락
              return (
                <p key={index} className="text-lg text-gray-700 leading-loose mb-6">
                  {parseBoldText(paragraph)}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <footer className="mt-8 pt-6 border-t border-orange-100">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        </article>

        {/* Other Posts */}
        {otherPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{element.nameKo}에 대한 다른 글</h2>
            <div className="space-y-3">
              {otherPosts.map((otherPost) => (
                <Link
                  key={otherPost.slug}
                  href={`/elements/${symbol}/posts/${otherPost.slug}`}
                  className="block bg-white/70 hover:bg-white rounded-2xl p-4 border border-orange-100 hover:border-orange-200 transition-all"
                >
                  <h3 className="font-medium text-gray-800 hover:text-orange-600 transition-colors">
                    {otherPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">나도 {element.nameKo} 같은 사람일까?</h2>
          <p className="text-gray-600 mb-6">
            10개의 간단한 질문에 답하고, 나와 가장 닮은 원소를 찾아보세요!
          </p>
          <Link
            href="/"
            className="inline-block w-full max-w-md py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-lg hover:from-orange-500 hover:to-rose-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            테스트 시작하기
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
