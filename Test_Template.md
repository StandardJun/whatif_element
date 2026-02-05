# 만약... 성격 테스트 템플릿

이 템플릿을 사용하여 "만약... 내가 원소라면?"과 동일한 구조의 성격 테스트를 빠르게 만들 수 있습니다.

## 사이트 정보
- **사이트명**: 만약... (What if...)
- **도메인**: manyak.xyz
- **제목 형식**: "만약... 내가 [주제]라면?" / "What if... I Were a [Topic]?"

---

---

## 1. 프로젝트 초기화

```bash
# Next.js 프로젝트 생성
npx create-next-app@latest [프로젝트명] --typescript --tailwind --app --src-dir

cd [프로젝트명]
```

---

## 2. 프로젝트 구조

```
[프로젝트명]/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 메인 페이지
│   │   ├── layout.tsx            # 레이아웃 + 메타데이터
│   │   ├── globals.css           # 글로벌 스타일
│   │   └── [콘텐츠]/             # 블로그 페이지 (선택)
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── data/
│   │   ├── items.ts              # 결과 아이템 데이터 (원소, 캐릭터 등)
│   │   ├── questions.ts          # 질문 데이터
│   │   └── translations.ts       # 다국어 번역
│   └── utils/
│       └── matching.ts           # 매칭 알고리즘
└── NOTES.md
```

---

## 3. 핵심 데이터 구조

### 3.1 결과 아이템 (items.ts)

```typescript
export interface Item {
  id: number;
  name: string;           // 영문명
  nameKo: string;         // 한글명
  symbol?: string;        // 심볼 (선택)
  category: string;       // 카테고리
  description: string;    // 결과 설명
  traits: {               // 성격 특성 점수 (1-5)
    [dimension: string]: number;
  };
}

export const items: Item[] = [
  {
    id: 1,
    name: "Gold",
    nameKo: "금",
    symbol: "Au",
    category: "metal",
    description: "당신은 빛나는 존재입니다...",
    traits: {
      activity: 3,
      sociability: 4,
      stability: 5,
      sensitivity: 2,
      originality: 3
    }
  },
  // ... 더 많은 아이템
];
```

### 3.2 질문 (questions.ts)

```typescript
export interface Question {
  id: number;
  text: { ko: string; en: string };
  dimension: string;  // 'activity' | 'sociability' | ...
  options: {
    value: number;  // 1-5 (부정-긍정)
    label: { ko: string; en: string };
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: {
      ko: "[상황 기반 질문]",
      en: "[Situation-based question]"
    },
    dimension: "activity",
    options: [
      { value: 5, label: { ko: "[가장 긍정적 응답]", en: "[Most positive]" } },
      { value: 4, label: { ko: "[긍정적 응답]", en: "[Positive]" } },
      { value: 3, label: { ko: "[중립 응답]", en: "[Neutral]" } },
      { value: 2, label: { ko: "[부정적 응답]", en: "[Negative]" } },
      { value: 1, label: { ko: "[가장 부정적 응답]", en: "[Most negative]" } },
    ]
  },
  // ... 총 10개 질문 (각 차원당 2개)
];
```

### 3.3 번역 (translations.ts)

```typescript
export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    title: "만약... 내가 [주제]라면?",  // 예: "만약... 내가 꽃이라면?"
    subtitle: "[부제목]",
    namePlaceholder: "이름을 입력하세요",
    startButton: "테스트 시작하기",
    questionCount: "10개의 질문 • 약 2분 소요",
    questionOf: (c: number, t: number) => `질문 ${c} / ${t}`,
    back: "이전",
    resultFor: (name: string) => `${name}님의 결과`,
    yourResult: "당신과 가장 닮은 [아이템]은...",
    matchScore: "매칭 점수",
    learnMore: "더 알아보기",
    goodMatch: "잘 맞는 궁합",
    badMatch: "안 맞는 궁합",
    shareResult: "결과 공유하기",
    restart: "다시 테스트하기",
    linkCopied: "링크가 복사되었습니다!",
    shareText: (item: string) => `나는 ${item} 같은 사람이래요! - 만약...`,
    copyright: "© 2026 만약... All rights reserved.",
  },
  en: {
    title: "What if... I Were a [Topic]?",  // 예: "What if... I Were a Flower?"
    // 영어 번역...
    copyright: "© 2026 What if... All rights reserved.",
  }
};
```

---

## 4. 매칭 알고리즘 (matching.ts)

```typescript
// 유클리드 거리 기반 유사도 계산
export function calculateSimilarity(
  userScores: Record<string, number>,
  itemTraits: Record<string, number>
): number {
  const dimensions = Object.keys(userScores);

  // 유클리드 거리 계산
  const distance = Math.sqrt(
    dimensions.reduce((sum, dim) => {
      const diff = userScores[dim] - itemTraits[dim];
      return sum + diff * diff;
    }, 0)
  );

  // 최대 거리 (모든 차원에서 최대 차이 4)
  const maxDistance = Math.sqrt(dimensions.length * 16);

  // 0-100% 변환
  return Math.round((1 - distance / maxDistance) * 100);
}

// 사용자 답변으로부터 차원별 점수 계산
export function calculateUserScores(
  answers: Record<number, number>,
  questions: Question[]
): Record<string, number> {
  const scores: Record<string, number[]> = {};

  questions.forEach(q => {
    if (!scores[q.dimension]) scores[q.dimension] = [];
    if (answers[q.id]) scores[q.dimension].push(answers[q.id]);
  });

  // 각 차원의 평균 계산
  return Object.fromEntries(
    Object.entries(scores).map(([dim, vals]) => [
      dim,
      vals.reduce((a, b) => a + b, 0) / vals.length
    ])
  );
}

// 최적 매칭 찾기
export function findBestMatch(answers: Record<number, number>) {
  const userScores = calculateUserScores(answers, questions);

  const results = items.map(item => ({
    item,
    score: calculateSimilarity(userScores, item.traits)
  }));

  results.sort((a, b) => b.score - a.score);

  return {
    bestMatch: results[0],
    goodMatches: results.slice(1, 3).map(r => r.item),
    badMatches: results.slice(-2).map(r => r.item)
  };
}
```

---

## 5. 디자인 시스템

### 5.1 색상 팔레트 (Tailwind)

```css
/* 따뜻한 파스텔 톤 (권장) */
배경: bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50
카드: bg-white/70 backdrop-blur-md rounded-3xl border border-orange-100 shadow-lg
버튼: bg-gradient-to-r from-orange-400 to-rose-400
텍스트: text-gray-800 (제목), text-gray-500 (부제목)
악센트: text-orange-500
```

### 5.2 애니메이션 (globals.css)

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn { animation: fadeIn 0.5s ease-out; }
.animate-slideUp { animation: slideUp 0.4s ease-out; }
```

### 5.3 컴포넌트 클래스

```typescript
// 버튼 (Primary)
"w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-lg hover:from-orange-500 hover:to-rose-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"

// 버튼 (Secondary)
"w-full py-4 rounded-2xl bg-white/70 hover:bg-white border border-orange-200 hover:border-orange-300 text-gray-600 font-medium transition-all duration-200"

// 선택 버튼
"w-full py-3.5 px-5 rounded-2xl bg-white/70 hover:bg-white border border-orange-100 hover:border-orange-300 text-gray-700 font-medium transition-all duration-200 text-left hover:translate-x-1 hover:shadow-md"

// 입력 필드
"w-full px-4 py-3 rounded-2xl bg-orange-50/50 text-gray-700 placeholder-gray-400 border border-orange-200 focus:outline-none focus:border-orange-300 focus:bg-white text-center text-lg transition-all duration-200"

// 카드
"bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-lg"

// 언어 토글
"fixed top-4 right-4 z-50 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-orange-200 shadow-sm"
```

---

## 6. 페이지 구조 (page.tsx)

```typescript
'use client';

import { useState } from 'react';

type Step = 'intro' | 'quiz' | 'result';

export default function Home() {
  const [step, setStep] = useState<Step>('intro');
  const [lang, setLang] = useState<Language>('ko');
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<MatchResult | null>(null);

  const t = translations[lang];

  // 핸들러들...

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* 언어 토글 */}
      <div className="fixed top-4 right-4 z-50">...</div>

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {/* Intro Screen */}
        {step === 'intro' && (...)}

        {/* Quiz Screen */}
        {step === 'quiz' && (...)}

        {/* Result Screen */}
        {step === 'result' && result && (...)}

        {/* Footer */}
        <footer>...</footer>
      </div>
    </div>
  );
}
```

---

## 7. 테스트 아이디어

| 제목 | 결과 아이템 | 차원 예시 | URL |
|------|------------|----------|-----|
| 만약... 내가 원소라면? | 118개 원소 | 활동성, 사교성, 안정성, 감성, 독창성 | /element |
| 만약... 내가 꽃이라면? | 다양한 꽃들 | 에너지, 섬세함, 독립성, 로맨스, 강인함 | /flower |
| 만약... 내가 동물이라면? | 동물 종류 | 활동성, 사교성, 독립성, 지능, 충성도 | /animal |
| 만약... 내가 음식이라면? | 음식 종류 | 대담함, 편안함, 복잡함, 단맛, 매운맛 | /food |
| 만약... 내가 색이라면? | 색상들 | 에너지, 차분함, 열정, 신비로움, 순수함 | /color |
| 만약... 내가 음악이라면? | 장르들 | 에너지, 감성, 복잡성, 사교성, 반항성 | /music |
| 만약... 내가 도시라면? | 도시/국가 | 모험성, 문화, 휴식, 활동, 예산 | /city |

---

## 8. AdSense 승인을 위한 체크리스트

1. **고품질 콘텐츠**
   - [ ] 블로그/정보 페이지 추가 (각 결과 아이템에 대한 상세 페이지)
   - [ ] 독창적인 콘텐츠 (복사/붙여넣기 X)
   - [ ] 최소 10-20개의 콘텐츠 페이지

2. **필수 페이지**
   - [ ] 개인정보처리방침
   - [ ] 이용약관
   - [ ] 연락처/소개 페이지

3. **사용자 경험**
   - [ ] 모바일 반응형
   - [ ] 빠른 로딩 속도
   - [ ] 명확한 네비게이션

4. **기술적 요구사항**
   - [ ] HTTPS 적용
   - [ ] 커스텀 도메인
   - [ ] 최소 몇 주간의 운영 기록

---

## 9. 배포 (Cloudflare Pages)

### next.config.ts 설정 (정적 빌드)
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

### Cloudflare Pages 설정
| 항목 | 값 |
|------|-----|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | 18 이상 |

### 배포 방법
1. GitHub에 푸시
2. Cloudflare Pages → Create Project → Connect to Git
3. 위 설정 적용 후 Save and Deploy

---

## 10. 커스터마이징 체크리스트

새 테스트를 만들 때:

1. [ ] `items.ts`: 결과 아이템 데이터 작성
2. [ ] `questions.ts`: 10개 질문 작성 (차원당 2개)
3. [ ] `translations.ts`: UI 텍스트 번역
4. [ ] `matching.ts`: 필요시 알고리즘 조정
5. [ ] `page.tsx`: 제목, 아이콘 등 수정
6. [ ] `globals.css`: 색상 테마 조정 (선택)
7. [ ] `layout.tsx`: 메타데이터 수정
8. [ ] 블로그 페이지 추가 (AdSense용)
9. [ ] 빌드 테스트
10. [ ] 배포
