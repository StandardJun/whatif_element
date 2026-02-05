import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { elements, Element } from '@/data/elements';
import { getCategoryNameKo, getCategoryColor } from '@/utils/matching';

// 원소별 추가 정보 (발견 역사, 용도, 재미있는 사실)
const elementExtras: Record<string, { history: string; uses: string[]; funFacts: string[] }> = {
  H: {
    history: '1766년 영국의 헨리 캐번디시가 발견했습니다. 이름은 그리스어로 "물을 만드는 것"이라는 뜻입니다.',
    uses: ['로켓 연료', '수소 연료전지', '암모니아 생산', '식용유 경화'],
    funFacts: ['우주 질량의 75%를 차지합니다', '가장 가벼운 원소입니다', '태양의 핵융합 연료입니다'],
  },
  He: {
    history: '1868년 일식 관측 중 태양 스펙트럼에서 처음 발견되었습니다. 그래서 태양신 헬리오스의 이름을 따왔습니다.',
    uses: ['풍선과 비행선', 'MRI 기기 냉각', '심해 다이빙 혼합기체', '극저온 연구'],
    funFacts: ['끓는점이 가장 낮은 원소입니다', '지구에서 두 번째로 가벼운 원소입니다', '목소리를 높게 만드는 효과가 있습니다'],
  },
  Li: {
    history: '1817년 스웨덴의 요한 아르프베드손이 발견했습니다. 그리스어로 "돌"을 뜻하는 lithos에서 이름이 유래했습니다.',
    uses: ['리튬이온 배터리', '조울증 치료제', '항공기 합금', '도자기 유약'],
    funFacts: ['가장 가벼운 금속입니다', '물에 뜹니다', '불꽃 반응 시 빨간색을 냅니다'],
  },
  C: {
    history: '고대부터 숯과 다이아몬드로 알려져 있었습니다. 라틴어로 "숯"을 뜻하는 carbo에서 이름이 유래했습니다.',
    uses: ['연필심(흑연)', '보석(다이아몬드)', '철강 제조', '탄소섬유'],
    funFacts: ['모든 생명체의 기본 원소입니다', '같은 원소인데 다이아몬드와 흑연은 완전히 다른 성질을 갖습니다', '지구상에서 4번째로 풍부한 원소입니다'],
  },
  N: {
    history: '1772년 스코틀랜드의 다니엘 러더퍼드가 발견했습니다. 그리스어로 "질산염을 만드는 것"이라는 뜻입니다.',
    uses: ['비료 생산', '식품 포장(산화 방지)', '액체질소(냉동)', '폭약 제조'],
    funFacts: ['대기의 78%를 차지합니다', '생명체 단백질의 핵심 성분입니다', '액체 질소는 -196°C입니다'],
  },
  O: {
    history: '1774년 영국의 조지프 프리스틀리가 발견했습니다. 그리스어로 "산을 만드는 것"이라는 뜻입니다.',
    uses: ['호흡과 의료용', '철강 제조', '로켓 산화제', '용접'],
    funFacts: ['대기의 21%를 차지합니다', '지구 지각에서 가장 풍부한 원소입니다', '오존(O3)은 자외선을 차단합니다'],
  },
  Fe: {
    history: '고대부터 사용된 금속으로, 철기시대를 열었습니다. 라틴어 ferrum에서 기호가 유래했습니다.',
    uses: ['건축 구조물', '자동차', '가전제품', '수술 도구'],
    funFacts: ['지구 핵의 주성분입니다', '혈액의 헤모글로빈에 들어있습니다', '가장 많이 사용되는 금속입니다'],
  },
  Cu: {
    history: '인류가 처음 사용한 금속 중 하나로, 약 1만 년 전부터 사용되었습니다. 키프로스 섬의 라틴어 이름에서 유래했습니다.',
    uses: ['전선', '동전', '배관', '항균 표면'],
    funFacts: ['전기 전도율이 은 다음으로 높습니다', '자유의 여신상은 구리로 만들어졌습니다', '시간이 지나면 녹청색으로 변합니다'],
  },
  Ag: {
    history: '고대부터 알려진 귀금속으로, 기호 Ag는 라틴어 argentum에서 유래했습니다.',
    uses: ['보석과 은식기', '전자제품', '의료용(항균)', '사진 필름'],
    funFacts: ['모든 금속 중 전기 전도율이 가장 높습니다', '가장 반사율이 높은 금속입니다', '뱀파이어를 물리친다는 전설이 있습니다'],
  },
  Au: {
    history: '고대부터 가치 있는 금속으로 여겨졌습니다. 기호 Au는 라틴어 aurum(빛나는 새벽)에서 유래했습니다.',
    uses: ['보석과 장신구', '전자제품 접점', '치과 재료', '우주선 열차폐'],
    funFacts: ['녹슬거나 변색되지 않습니다', '1온스의 금으로 5마일 길이의 와이어를 만들 수 있습니다', '지구의 모든 금은 초신성 폭발에서 왔습니다'],
  },
  U: {
    history: '1789년 독일의 마르틴 클라프로트가 발견했습니다. 당시 발견된 천왕성(Uranus)의 이름을 따왔습니다.',
    uses: ['원자력 발전', '핵무기', '방사선 차폐', '선박 추진'],
    funFacts: ['자연에서 가장 무거운 원소입니다', '1kg의 우라늄은 석탄 3000톤과 같은 에너지를 냅니다', '지구 내부 열의 상당 부분은 우라늄 붕괴에서 나옵니다'],
  },
};

// 기본 정보 생성 함수
function getElementExtras(symbol: string): { history: string; uses: string[]; funFacts: string[] } {
  if (elementExtras[symbol]) {
    return elementExtras[symbol];
  }

  const element = elements.find(e => e.symbol === symbol);
  if (!element) {
    return {
      history: '이 원소에 대한 발견 역사 정보가 준비 중입니다.',
      uses: ['다양한 산업 분야에서 활용됩니다'],
      funFacts: ['독특한 특성을 가진 원소입니다'],
    };
  }

  // 카테고리에 따른 기본 정보 생성
  const categoryInfo: Record<string, { history: string; uses: string[]; funFacts: string[] }> = {
    'alkali-metal': {
      history: `${element.nameKo}은(는) 알칼리 금속으로, 매우 반응성이 높은 금속입니다.`,
      uses: ['화학 반응 연구', '특수 합금 제조', '의료 및 산업 분야'],
      funFacts: ['물과 격렬하게 반응합니다', '매우 부드러워 칼로 자를 수 있습니다'],
    },
    'alkaline-earth': {
      history: `${element.nameKo}은(는) 알칼리 토금속으로, 지구의 광물에서 발견됩니다.`,
      uses: ['합금 제조', '의료 분야', '건축 자재'],
      funFacts: ['알칼리 금속보다는 덜 반응성이지만 여전히 활발합니다'],
    },
    'transition': {
      history: `${element.nameKo}은(는) 전이 금속으로, 다양한 산화 상태를 가집니다.`,
      uses: ['합금 제조', '촉매', '전자 제품', '장신구'],
      funFacts: ['다채로운 색상의 화합물을 만들 수 있습니다', '대부분 단단하고 내구성이 좋습니다'],
    },
    'post-transition': {
      history: `${element.nameKo}은(는) 전이후 금속으로, 전이 금속보다 부드럽습니다.`,
      uses: ['납땜', '합금', '전자 부품'],
      funFacts: ['녹는점이 비교적 낮습니다', '다양한 산업에서 활용됩니다'],
    },
    'metalloid': {
      history: `${element.nameKo}은(는) 준금속으로, 금속과 비금속의 특성을 모두 가집니다.`,
      uses: ['반도체', '합금', '유리 제조'],
      funFacts: ['전기 전도성이 온도에 따라 변합니다', '현대 전자 산업의 핵심입니다'],
    },
    'nonmetal': {
      history: `${element.nameKo}은(는) 비금속 원소로, 생명체에 필수적인 역할을 합니다.`,
      uses: ['화학 합성', '생명 활동', '에너지 생산'],
      funFacts: ['대부분 상온에서 기체나 고체입니다', '다른 원소와 쉽게 결합합니다'],
    },
    'halogen': {
      history: `${element.nameKo}은(는) 할로겐 원소로, 매우 반응성이 높습니다.`,
      uses: ['소독제', '플라스틱 제조', '의약품'],
      funFacts: ['소금을 만드는 원소들입니다', '강한 냄새를 가진 것들이 많습니다'],
    },
    'noble-gas': {
      history: `${element.nameKo}은(는) 비활성 기체로, 거의 반응하지 않습니다.`,
      uses: ['조명', '용접 보호 가스', '극저온 연구'],
      funFacts: ['화학적으로 매우 안정적입니다', '대부분 무색무취입니다'],
    },
    'lanthanide': {
      history: `${element.nameKo}은(는) 란타넘족 원소로, 희토류에 속합니다.`,
      uses: ['강력한 자석', '레이저', '촉매', '형광체'],
      funFacts: ['이름과 달리 지각에 상당량 존재합니다', '현대 기술에 필수적입니다'],
    },
    'actinide': {
      history: `${element.nameKo}은(는) 악티늄족 원소로, 대부분 방사성입니다.`,
      uses: ['원자력 에너지', '의료 진단', '과학 연구'],
      funFacts: ['모두 방사성 동위원소를 가집니다', '매우 무거운 원소들입니다'],
    },
  };

  return categoryInfo[element.category] || {
    history: '이 원소에 대한 정보가 준비 중입니다.',
    uses: ['다양한 분야에서 활용됩니다'],
    funFacts: ['독특한 특성을 가진 원소입니다'],
  };
}

// 성격 특성 한글명
const traitNames: Record<string, string> = {
  activity: '활동성',
  sociability: '사교성',
  stability: '안정성',
  sensitivity: '감성',
  originality: '독창성',
};

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
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">성격 특성</h2>
            <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                {element.description}
              </p>
            </div>
          </section>

          {/* Traits Chart */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">성격 지표</h2>
            <div className="grid gap-3">
              {Object.entries(element.traits).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4">
                  <span className="text-gray-600 w-20 text-sm">{traitNames[key]}</span>
                  <div className="flex-1 h-3 bg-orange-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full transition-all duration-500"
                      style={{ width: `${(value / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-500 text-sm w-8 text-right">{value}/5</span>
                </div>
              ))}
            </div>
          </section>

          {/* History */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">발견 역사</h2>
            <p className="text-gray-600 leading-relaxed">{extras.history}</p>
          </section>

          {/* Uses */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">실생활 용도</h2>
            <ul className="grid grid-cols-2 gap-2">
              {extras.uses.map((use, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  {use}
                </li>
              ))}
            </ul>
          </section>

          {/* Fun Facts */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">재미있는 사실</h2>
            <div className="space-y-2">
              {extras.funFacts.map((fact, index) => (
                <div key={index} className="bg-rose-50/50 rounded-xl p-4 border border-rose-100">
                  <p className="text-gray-700">{fact}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Compatibility */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Good Match */}
          <div className="bg-emerald-50/80 backdrop-blur-md rounded-2xl p-6 border border-emerald-200">
            <h3 className="text-emerald-700 font-bold mb-4 text-lg">잘 맞는 원소</h3>
            <div className="space-y-3">
              {goodMatches.map(el => (
                <Link
                  key={el.number}
                  href={`/elements/${el.symbol}`}
                  className="flex items-center gap-4 bg-white/70 hover:bg-white rounded-xl p-3 border border-emerald-100 hover:border-emerald-300 transition-all"
                >
                  <span className="text-3xl font-bold text-gray-700 w-12 text-center">{el.symbol}</span>
                  <div>
                    <p className="font-medium text-gray-800">{el.nameKo}</p>
                    <p className="text-emerald-600 text-sm">{el.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bad Match */}
          <div className="bg-rose-50/80 backdrop-blur-md rounded-2xl p-6 border border-rose-200">
            <h3 className="text-rose-600 font-bold mb-4 text-lg">안 맞는 원소</h3>
            <div className="space-y-3">
              {badMatches.map(el => (
                <Link
                  key={el.number}
                  href={`/elements/${el.symbol}`}
                  className="flex items-center gap-4 bg-white/70 hover:bg-white rounded-xl p-3 border border-rose-100 hover:border-rose-300 transition-all"
                >
                  <span className="text-3xl font-bold text-gray-700 w-12 text-center">{el.symbol}</span>
                  <div>
                    <p className="font-medium text-gray-800">{el.nameKo}</p>
                    <p className="text-rose-500 text-sm">{el.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
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
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-xs">
          <p>&copy; 2026 내가 원소라면? All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
