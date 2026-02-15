import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { elements } from '@/data/elements';
import { getPost, getPostsBySymbol } from '@/data/posts';
import { isFeaturedPost } from '@/data/featuredPosts';
import { getCategoryColor, getCategoryNameKo } from '@/utils/matching';
import ReportButton from '@/components/ReportButton';

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

  const featured = isFeaturedPost(symbol, slug);

  return {
    title: `${post.title} - ${element.nameKo} | 만약...`,
    description: post.summary,
    keywords: [...post.tags, element.nameKo, element.name],
    ...(featured ? {} : { robots: 'noindex, nofollow' }),
    alternates: {
      canonical: `https://manyak.xyz/elements/${symbol}/posts/${slug}`,
    },
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
          <Link href="/elements" className="text-gray-500 hover:text-gray-700 transition-colors">
            &larr; 전체 도감
          </Link>
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
        {/* BlogPosting JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.summary,
              "image": post.image || undefined,
              "author": {
                "@type": "Organization",
                "name": "만약... 편집팀",
                "url": "https://manyak.xyz/about",
              },
              "publisher": {
                "@type": "Organization",
                "name": "만약...",
                "url": "https://manyak.xyz",
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://manyak.xyz/elements/${symbol}/posts/${slug}`,
              },
              "keywords": post.tags.join(", "),
              "inLanguage": "ko",
            }),
          }}
        />
        {/* BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://manyak.xyz" },
                { "@type": "ListItem", "position": 2, "name": "원소 도감", "item": "https://manyak.xyz/elements" },
                { "@type": "ListItem", "position": 3, "name": element.nameKo, "item": `https://manyak.xyz/elements/${symbol}` },
                { "@type": "ListItem", "position": 4, "name": post.title },
              ],
            }),
          }}
        />
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
          <div className="prose prose-gray max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              const trimmed = paragraph.trim();

              // 인라인 포맷팅 파싱 (볼드, 이탤릭)
              const parseInline = (text: string) => {
                const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
                return parts.filter(Boolean).map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-semibold text-gray-800">{part.slice(2, -2)}</strong>;
                  }
                  if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
                    return <em key={i} className="italic">{part.slice(1, -1)}</em>;
                  }
                  return part;
                });
              };

              // 이미지 블록 (캡션 포함 가능: ![alt](url) *caption* 또는 ![alt](url)\n*caption*)
              if (trimmed.startsWith('![')) {
                const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
                if (imgMatch) {
                  const remaining = trimmed.slice(imgMatch[0].length).trim();
                  const captionMatch = remaining.match(/^\*([^*]+)\*$/m);
                  const caption = captionMatch ? captionMatch[1] : imgMatch[1];
                  return (
                    <figure key={index} className="my-8 -mx-2 sm:-mx-4">
                      <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-56 sm:h-72 object-cover rounded-2xl" />
                      {caption && <figcaption className="text-center text-gray-400 text-sm mt-3">{caption}</figcaption>}
                    </figure>
                  );
                }
              }

              // 헤딩 (### 먼저 체크)
              if (trimmed.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-8 mb-3">{parseInline(trimmed.slice(4))}</h3>;
              }
              if (trimmed.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-gray-800 mt-10 mb-4">{parseInline(trimmed.slice(3))}</h2>;
              }

              // 테이블
              const lines = trimmed.split('\n');
              if (lines[0]?.trim().startsWith('|') && lines.length >= 2) {
                const parseRow = (line: string) => line.split('|').slice(1, -1).map(c => c.trim());
                const isSep = (line: string) => /^\|[\s-:|]+\|$/.test(line.trim());
                const headers = parseRow(lines[0]);
                const dataStart = lines[1] && isSep(lines[1]) ? 2 : 1;
                const rows = lines.slice(dataStart).filter(l => l.trim().startsWith('|')).map(parseRow);
                return (
                  <div key={index} className="my-6 overflow-x-auto rounded-xl border border-orange-100">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-orange-50">
                          {headers.map((h, i) => (
                            <th key={i} className="px-4 py-2.5 text-left font-semibold text-gray-700 border-b border-orange-200">{parseInline(h)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'}>
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-4 py-2 text-gray-600 border-b border-orange-100">{parseInline(cell)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              // 불릿 리스트
              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-outside ml-6 space-y-1.5 text-base text-gray-700 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="pl-2 leading-relaxed">{parseInline(item.replace(/^-\s+/, ''))}</li>
                    ))}
                  </ul>
                );
              }

              // 블록인용(blockquote)
              if (trimmed.startsWith('> ')) {
                const quoteLines = trimmed.split('\n').map(l => l.replace(/^>\s?/, ''));
                return (
                  <blockquote key={index} className="my-6 border-l-4 border-orange-300 bg-orange-50/50 rounded-r-xl px-5 py-4 text-gray-700">
                    {quoteLines.map((line, i) => {
                      const trimLine = line.trim();
                      if (!trimLine) return <br key={i} />;
                      return <p key={i} className="leading-relaxed text-[15px]">{parseInline(trimLine)}</p>;
                    })}
                  </blockquote>
                );
              }

              // 번호 리스트
              if (/^\d+\.\s/.test(trimmed)) {
                const items = trimmed.split('\n').filter(line => /^\d+\.\s/.test(line.trim()));
                return (
                  <ol key={index} className="list-decimal list-outside ml-6 space-y-1.5 text-base text-gray-700 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="pl-2 leading-relaxed">{parseInline(item.replace(/^\d+\.\s+/, ''))}</li>
                    ))}
                  </ol>
                );
              }

              // 독립 이탤릭 (이미지 캡션으로 분리된 경우)
              if (/^\*[^*]+\*$/.test(trimmed)) {
                return <p key={index} className="text-center text-gray-400 text-sm italic -mt-5 mb-6">{trimmed.slice(1, -1)}</p>;
              }

              // 일반 단락
              return (
                <p key={index} className="text-base text-gray-700 leading-relaxed mb-4">
                  {parseInline(trimmed)}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <footer className="mt-8 pt-6 border-t border-orange-100">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Info */}
            <div className="bg-orange-50/50 rounded-2xl p-5 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  만
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">만약... 편집팀</p>
                  <p className="text-gray-500 text-xs mt-1">
                    과학 교육 콘텐츠를 쉽고 재미있게 전달하기 위해 노력합니다.
                    정보의 정확성을 위해 공신력 있는 출처를 참고하여 작성합니다.
                  </p>
                </div>
              </div>
            </div>

            <ReportButton pageType="post" elementSymbol={symbol} elementName={element.nameKo} postSlug={slug} postTitle={post.title} />
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

      </div>
    </div>
  );
}
