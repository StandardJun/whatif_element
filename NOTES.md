# 내가 원소라면? (Element Personality Test)

## 프로젝트 개요
이름을 입력하고 10개의 질문에 답하면, 자신과 가장 잘 맞는 원소를 알려주는 성격 테스트 사이트.

## 기술 스택
- **Frontend**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **배포**: Cloudflare Pages (예정)
- **버전관리**: Git + GitHub (예정)
- **수익화**: Google AdSense (예정)

## 핵심 기능
1. 사용자 이름 입력
2. 10개 질문 (각 질문별 맞춤 응답 옵션 5개)
3. 118개 원소 중 매칭 알고리즘으로 결과 도출
4. 궁합 좋은/나쁜 원소 각 2개 제시
5. 결과 공유 기능
6. **다국어 지원** (한국어/영어)
7. **이전 질문으로 돌아가기**
8. **원소 블로그 페이지** (AdSense용 콘텐츠)

## 원소 매칭 알고리즘 설계

### 5가지 성격 차원 (각 2문항)
1. **활동성 (Activity)**: 에너지 레벨, 활동 선호도
2. **사교성 (Sociability)**: 인간관계 스타일
3. **안정성 (Stability)**: 변화 vs 안정 선호
4. **감성 (Sensitivity)**: 논리 vs 감성 지향
5. **독창성 (Originality)**: 전통 vs 혁신 선호

### 매칭 공식
- 유클리드 거리 기반 유사도 계산
- 각 차원별 사용자 점수와 원소 특성 점수 비교
- 최대 거리 sqrt(80)을 기준으로 0-100% 유사도 변환

## 프로젝트 구조
```
element-personality-test/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 메인 페이지 (인트로/퀴즈/결과)
│   │   ├── layout.tsx            # 레이아웃 + 메타데이터
│   │   ├── globals.css           # 글로벌 스타일 + 애니메이션
│   │   └── elements/
│   │       ├── page.tsx          # 원소 목록 페이지 (블로그 인덱스)
│   │       └── [symbol]/
│   │           └── page.tsx      # 개별 원소 상세 페이지
│   ├── data/
│   │   ├── elements.ts           # 118개 원소 데이터 (성격 특성 포함)
│   │   ├── questions.ts          # 10개 질문 데이터 (다국어)
│   │   └── translations.ts       # UI 번역 데이터 (한국어/영어)
│   └── utils/
│       └── matching.ts           # 매칭 알고리즘
├── NOTES.md                      # 프로젝트 노트
├── ELEMENT_BLOG_SPEC.md          # 블로그 페이지 명세서
└── Test_Template.md              # 재사용 가능한 템플릿
```

## 디자인 시스템

### 색상 팔레트 (따뜻하고 귀여운 파스텔 톤)
- **배경**: `bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50`
- **카드**: `bg-white/70 ~ bg-white/80 backdrop-blur-md rounded-3xl border border-orange-100 shadow-lg`
- **버튼 (Primary)**: `bg-gradient-to-r from-orange-400 to-rose-400`
- **버튼 (Secondary)**: `bg-white/70 border border-orange-200`
- **텍스트**: `text-gray-800` (제목), `text-gray-500` (부제목), `text-gray-600` (본문)
- **악센트**: `text-orange-500`

### 애니메이션
- `animate-fadeIn`: 페이지 전환시 fade + slide up (0.5s)
- `animate-slideUp`: 카드 등장시 slide up (0.4s)
- 버튼 호버: `hover:scale-[1.02] hover:shadow-xl`
- 버튼 클릭: `active:scale-[0.98]`

### 컴포넌트 스타일
- **입력 필드**: `rounded-2xl bg-orange-50/50 border border-orange-200 focus:border-orange-300`
- **선택 버튼**: `rounded-2xl bg-white/70 hover:bg-white hover:translate-x-1 hover:shadow-md`
- **언어 토글**: `fixed top-4 right-4` - KO | EN 형태

## 질문 구조 (상황 기반 재미있는 질문)

각 질문은 다국어 지원 + 맞춤 응답 옵션을 가짐:
```typescript
interface Question {
  id: number;
  text: { ko: string; en: string };
  dimension: 'activity' | 'sociability' | 'stability' | 'sensitivity' | 'originality';
  options: { value: number; label: { ko: string; en: string } }[];
}
```

### 질문 예시
| 차원 | 질문 (KO) | 긍정 응답 | 부정 응답 |
|------|----------|----------|----------|
| 활동성 | 친구가 '한강 가자!'고 하면? | 신발 신고 나간다 🏃 | 난 이불 밖은 위험해 🛋️ |
| 사교성 | 엘리베이터에서 눈 마주치면? | 먼저 인사하고 말 건다 👋 | 층수 버튼만 쳐다본다 🔢 |
| 안정성 | 여행 갈 때 계획을? | 분 단위 계획표 완성 📋 | 그날 기분 따라 🎲 |
| 감성 | 유기견 영상을 보면? | 눈물 줄줄 😭 | 담담하게 본다 |
| 독창성 | 이케아 가구 조립할 때? | 설명서? 그게 뭔데 🔧 | 영상 보면서 따라한다 📱 |

## 다국어 지원

### 구조
- `translations.ts`: UI 텍스트 번역
- `questions.ts`: 질문 및 응답 옵션 번역
- 기본 언어: 한국어 (바로 시작)
- 우측 상단 KO | EN 토글로 언어 전환

### 번역 키 구조
```typescript
translations = {
  ko: { title, subtitle, startButton, ... },
  en: { title, subtitle, startButton, ... }
}
```

## 진행 상황
- [x] 프로젝트 계획 수립
- [x] Next.js 프로젝트 초기화
- [x] 118개 원소 데이터 구축 (성격 특성 + 설명)
- [x] 10개 질문 시스템 구현
- [x] 매칭 알고리즘 구현
- [x] UI/UX 구현 (인트로/퀴즈/결과 화면)
- [x] 디자인 개선 (파스텔 톤, 애니메이션)
- [x] 질문을 상황 기반 재미있는 형식으로 변경
- [x] 각 질문별 맞춤 응답 옵션 (긍정→부정 순서)
- [x] 이전 질문으로 돌아가기 기능
- [x] 다국어 지원 (한국어/영어)
- [x] 언어 토글 (KO | EN) 우측 상단 배치
- [x] 원소 블로그 페이지 (/elements, /elements/[symbol])
- [x] 결과 화면에 "더 알아보기" 링크
- [x] 빌드 테스트 통과
- [ ] GitHub 연동
- [ ] Cloudflare Pages 배포
- [ ] 도메인 연결
- [ ] Google AdSense 설정

## 의사결정 기록
| 날짜 | 결정 | 이유 |
|------|------|------|
| 2026-02-05 | Next.js 선택 | Cloudflare Pages 호환, SEO 유리, 빠른 개발 |
| 2026-02-05 | 118개 전체 원소 포함 | 희귀 원소 결과가 더 재미있음 |
| 2026-02-05 | 5차원 성격 모델 | MBTI보다 단순하면서도 원소 특성과 매핑 용이 |
| 2026-02-05 | 질문 상황형으로 변경 | 기존 심리검사 스타일 → 일상적 상황 질문으로 재미 요소 강화 |
| 2026-02-05 | 파스텔 톤 (amber/orange/rose) | 따뜻하고 귀여운 느낌, 눈의 피로 감소 |
| 2026-02-05 | 질문별 맞춤 응답 | "매우 그렇다" 대신 질문 맥락에 맞는 재미있는 응답 |
| 2026-02-05 | 다국어 기본 한국어 | 한국어 사용자가 메인 타겟, 영어는 토글로 전환 |
| 2026-02-05 | 원소 블로그 페이지 | AdSense 승인을 위한 고품질 콘텐츠 확보 |

## 다음 단계
1. GitHub 로그인 후 리포지토리 생성
2. Cloudflare Pages 연동
3. 커스텀 도메인 설정
4. AdSense 승인 신청

## 명령어
```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```
