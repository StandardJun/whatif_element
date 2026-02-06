import Link from 'next/link';

// 1. TraitsChart Component
interface TraitsChartProps {
  traits: Record<string, number>;
  traitNames: Record<string, string>;
}

export function TraitsChart({ traits, traitNames }: TraitsChartProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-100 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">성격 지표</h3>
      <div className="grid gap-3">
        {Object.entries(traits).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <span className="text-gray-600 w-20 text-sm">{traitNames[key]}</span>
            <div className="flex-1 h-3 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
                style={{ width: `${(value / 5) * 100}%` }}
              />
            </div>
            <span className="text-gray-500 text-sm w-8 text-right">{value}/5</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. HistorySection Component
interface HistorySectionProps {
  history: string;
}

export function HistorySection({ history }: HistorySectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-100 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">발견 역사</h3>
      <p className="text-gray-600 leading-relaxed">{history}</p>
    </div>
  );
}

// 3. UsesSection Component
interface UsesSectionProps {
  uses: string[];
}

export function UsesSection({ uses }: UsesSectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-100 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">실생활 용도</h3>
      <div className="grid grid-cols-2 gap-2">
        {uses.map((use, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
            <span>{use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. FunFactsSection Component
interface FunFactsSectionProps {
  funFacts: string[];
}

export function FunFactsSection({ funFacts }: FunFactsSectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-100 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">재미있는 사실</h3>
      <div className="space-y-2">
        {funFacts.map((fact, index) => (
          <div key={index} className="bg-rose-50/50 rounded-xl p-4 border border-rose-100">
            <p className="text-gray-700">{fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. CompatibilitySection Component
interface Element {
  number: number;
  symbol: string;
  nameKo: string;
  name: string;
}

interface CompatibilitySectionProps {
  goodMatches: Element[];
  badMatches: Element[];
  lang?: 'ko' | 'en';
}

export function CompatibilitySection({
  goodMatches,
  badMatches,
  lang = 'ko'
}: CompatibilitySectionProps) {
  const goodTitle = lang === 'ko' ? '💚 잘 맞는 궁합' : '💚 Good Match';
  const badTitle = lang === 'ko' ? '💔 안 맞는 궁합' : '💔 Bad Match';

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Good Matches */}
      <div className="bg-emerald-50/80 backdrop-blur-md rounded-2xl p-6 border border-emerald-200">
        <h3 className="text-emerald-700 font-bold mb-4 text-lg">{goodTitle}</h3>
        <div className="space-y-3">
          {goodMatches.map((element) => (
            <Link
              key={element.symbol}
              href={`/elements/${element.symbol}`}
              className="flex items-center gap-4 bg-white/70 hover:bg-white rounded-xl p-3 border border-emerald-100 hover:border-emerald-300 transition-all"
            >
              <span className="text-3xl font-bold text-gray-700 w-12 text-center">
                {element.symbol}
              </span>
              <div>
                <div className="font-medium text-gray-800">{element.nameKo}</div>
                <div className="text-emerald-600 text-sm">{element.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bad Matches */}
      <div className="bg-rose-50/80 backdrop-blur-md rounded-2xl p-6 border border-rose-200">
        <h3 className="text-rose-600 font-bold mb-4 text-lg">{badTitle}</h3>
        <div className="space-y-3">
          {badMatches.map((element) => (
            <Link
              key={element.symbol}
              href={`/elements/${element.symbol}`}
              className="flex items-center gap-4 bg-white/70 hover:bg-white rounded-xl p-3 border border-rose-100 hover:border-rose-300 transition-all"
            >
              <span className="text-3xl font-bold text-gray-700 w-12 text-center">
                {element.symbol}
              </span>
              <div>
                <div className="font-medium text-gray-800">{element.nameKo}</div>
                <div className="text-rose-500 text-sm">{element.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. SameCategorySection Component
interface SameCategorySectionProps {
  elements: Element[];
  categoryName: string;
  currentSymbol: string;
  lang?: 'ko' | 'en';
  maxDisplay?: number;
}

export function SameCategorySection({
  elements,
  categoryName,
  currentSymbol,
  lang = 'ko',
  maxDisplay
}: SameCategorySectionProps) {
  const filteredElements = elements.filter(el => el.symbol !== currentSymbol);
  const displayElements = maxDisplay
    ? filteredElements.slice(0, maxDisplay)
    : filteredElements;
  const remaining = maxDisplay && filteredElements.length > maxDisplay
    ? filteredElements.length - maxDisplay
    : 0;

  const title = lang === 'ko'
    ? `같은 족 원소 (${categoryName})`
    : `Same Category (${categoryName})`;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-100 shadow-md">
      <h3 className="text-sm font-medium text-gray-500 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {displayElements.map((element) => (
          <Link
            key={element.symbol}
            href={`/elements/${element.symbol}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/70 border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all"
          >
            <span className="text-lg font-bold text-gray-700">{element.symbol}</span>
            <span className="text-gray-500 text-sm">{element.nameKo}</span>
          </Link>
        ))}
      </div>
      {remaining > 0 && (
        <p className="text-gray-500 text-sm mt-3">외 {remaining}개 더...</p>
      )}
    </div>
  );
}

// 7. PostsPreview Component
interface Post {
  slug: string;
  title: string;
  summary: string;
}

interface PostsPreviewProps {
  symbol: string;
  elementNameKo: string;
  posts: Post[];
}

export function PostsPreview({ symbol, elementNameKo, posts }: PostsPreviewProps) {
  if (posts.length === 0) {
    return null;
  }

  const displayPosts = posts.slice(0, 3);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-100 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">📚 {elementNameKo} 탐구하기</h3>
        <Link
          href={`/elements/${symbol}/posts`}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          전체 보기 →
        </Link>
      </div>
      <div className="space-y-4">
        {displayPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/elements/${symbol}/posts/${post.slug}`}
            className="block bg-orange-50/50 hover:bg-orange-50 rounded-2xl p-5 border border-orange-100 hover:border-orange-200 transition-all group"
          >
            <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
              {post.title}
            </h4>
            <p className="text-gray-600 text-sm line-clamp-2">{post.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
