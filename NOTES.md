# 만약... 내가 원소라면? (What if... I Were an Element?)

## 사이트 정보
- **사이트명**: 만약... (What if...)
- **도메인**: manyak.xyz
- **컨셉**: "만약... [주제]라면?" 형식의 성격 테스트 모음 사이트
- **첫 번째 테스트**: 만약... 내가 원소라면?

## 프로젝트 개요
이름을 입력하고 10개의 질문에 답하면, 자신과 가장 잘 맞는 원소를 알려주는 성격 테스트 사이트.

## 기술 스택
- **Frontend**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **배포**: Cloudflare Pages
- **버전관리**: Git + GitHub
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
│   │   ├── page.tsx              # 메인 페이지 (인트로/퀴즈/결과 + 이미지 저장)
│   │   ├── layout.tsx            # 레이아웃 + 메타데이터 + AdSense
│   │   ├── globals.css           # 글로벌 스타일 + 애니메이션
│   │   └── elements/
│   │       ├── page.tsx          # 원소 목록 페이지 (블로그 인덱스)
│   │       └── [symbol]/
│   │           ├── page.tsx      # 개별 원소 상세 페이지
│   │           └── posts/
│   │               ├── page.tsx          # 원소별 포스트 목록
│   │               └── [slug]/
│   │                   └── page.tsx      # 포스트 상세 페이지
│   ├── data/
│   │   ├── elements.ts           # 118개 원소 데이터 (성격 특성 포함)
│   │   ├── elementExtras.ts      # 원소별 추가 정보 (발견 역사, 용도, 재미있는 사실)
│   │   ├── posts.ts              # 포스트 인터페이스 + 기본 데이터 (H, C)
│   │   ├── posts/                # 원소별 포스트 그룹 (group1-6.ts)
│   │   ├── questions.ts          # 10개 질문 데이터 (다국어)
│   │   └── translations.ts       # UI 번역 데이터 (한국어/영어)
│   ├── components/
│   │   ├── ElementSections.tsx   # 공유 UI 컴포넌트 (7개: TraitsChart, HistorySection 등)
│   │   └── ShareButton.tsx       # 공유 버튼 (클라이언트 컴포넌트)
│   ├── types/
│   │   └── (html2canvas는 자체 타입 제공)
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
- [x] GitHub 연동 (StandardJun/whatif_element)
- [x] 정적 빌드 설정 (output: 'export')
- [x] 사이트명 변경: "만약..." (manyak.xyz)
- [x] Google AdSense 코드 추가 (layout.tsx에 정적 스크립트 삽입)
- [x] **결과 사진 저장 기능** (html2canvas 라이브러리 + 인라인 CSS)
- [x] **결과 화면 상세 정보 확장** (성격 특성, 발견 역사, 용도, 재미있는 사실, 궁합)
- [x] **블로그 포스트 시스템** 데이터 구조 및 페이지 구현
- [x] 118개 원소별 블로그 포스트 작성 (354개 포스트 완료)
- [x] posts.ts에 group1-6 포스트 통합 완료
- [x] **포스트 가독성 개선** (h2/h3 크기, 줄 간격, 볼드 마크다운 파싱)
- [x] **도감 창 네비게이션** (전체 도감, 이전/다음 원소, 같은 족 원소)
- [x] **결과 창 개선** (궁합 원소 클릭 가능, 같은 족 원소 섹션 추가)
- [x] **홈 화면 도감 버튼** 추가
- [x] 포스트 팩트체크 완료 (14건 수정)
- [x] **결과 창/도감 창 디자인 통일** (공유 컴포넌트 추출 완료)
- [x] **결과 창에 포스트 미리보기** 섹션 추가
- [x] **도감 창에 공유 버튼** 추가
- [x] 빌드 테스트 통과 (595페이지 정적 생성)
- [x] **AdSense 승인 대응 (1-6번)**: 개인정보처리방침, 이용약관, 소개/연락처 페이지, 글로벌 Footer, sitemap.xml/robots.txt, 메인 SEO 콘텐츠
- [x] **AdSense 승인 대응 (7번)**: 103개 원소 elementExtras 고유 콘텐츠 작성 완료 (6개 병렬 sub-agent)
- [x] 빌드 재확인 (595+ 페이지 정적 생성 통과)
- [x] GitHub Push → Cloudflare 자동 배포 (`122b462`)
- [x] 포스트 인라인 이미지 삽입 (384개 포스트, 커밋 `906b034`)
- [x] **결과 창 중복 궁합 섹션 제거** + 간격 통일
- [x] **포스트 페이지 도감 네비게이션** 추가
- [x] **퀴즈 질문/응답 개선** (Q2, Q6, Q7, Q8, Q9, Q10 수정)
- [ ] **포스트 이미지 고도화** (원소별/포스트별 독립적 이미지 — 아래 프롬프트 참조)
- [ ] 도메인 연결 (manyak.xyz)
- [ ] Google AdSense 재심사 요청

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
| 2026-02-05 | 정적 빌드 (static export) | Next.js 16과 Cloudflare 어댑터 비호환, 정적 사이트로 충분 |
| 2026-02-05 | 사이트명 "만약..." | 확장성 있는 네이밍 ("만약... 내가 X라면?" 시리즈화 가능) |
| 2026-02-05 | AdSense 정적 스크립트 | Next.js Script 컴포넌트 대신 정적 <script> 태그 사용 (크롤러 감지용) |
| 2026-02-05 | dom-to-image-more | html2canvas가 배포 환경에서 작동 안함 → dom-to-image-more로 교체 |
| 2026-02-05 | 병렬 에이전트 포스트 작성 | 118개 원소 포스트를 6개 그룹으로 나눠 병렬 작성 (컨텍스트 효율화) |
| 2026-02-06 | html2canvas + 인라인 CSS | dom-to-image-more도 불안정 → html2canvas + 캡처영역 인라인 CSS로 최종 해결 |
| 2026-02-06 | 캡처 영역 분리 | 클릭 가능한 요소는 캡처 영역 밖에 배치하여 이미지/인터랙션 분리 |
| 2026-02-06 | 공유 컴포넌트 추출 | 결과/도감 두 페이지 디자인 통일 + 코드 중복 제거 (7개 컴포넌트) |

## 최근 추가 기능 (2026-02-06 업데이트)

### 1. 결과 사진 저장 기능
- **라이브러리**: html2canvas (dom-to-image-more에서 변경)
- **핵심**: 캡처 영역(`resultRef`)에 **인라인 CSS** 사용 (Tailwind 미지원)
- **동작**: 결과 카드를 PNG 이미지로 캡처
- **iOS 대응**: Safari에서는 새 탭에서 이미지 열기 방식
- **위치**: `handleSaveImage()` in page.tsx

### 2. 결과 화면 확장
- **성격 특성 차트**: 5가지 차원별 막대 그래프
- **발견 역사**: 원소 발견 배경
- **실생활 용도**: 4개 주요 용도
- **재미있는 사실**: 3가지 흥미로운 정보
- **궁합 정보**: 잘 맞는/안 맞는 원소
- **데이터 소스**: `/src/data/elementExtras.ts`

### 3. 블로그 포스트 시스템
- **목적**: AdSense 승인을 위한 고품질 콘텐츠
- **구조**: 원소당 3개 포스트 (총 354개 계획)
- **대상**: 중학생 수준의 흥미로운 과학 콘텐츠
- **페이지**:
  - `/elements/[symbol]/posts` - 포스트 목록
  - `/elements/[symbol]/posts/[slug]` - 포스트 상세
- **포스트 그룹**:
  - group1: He, Li, Be, B, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar, K, Ca (18개)
  - group2: Sc-Zr (20개)
  - group3: Nb-Nd (20개)
  - group4: Pm-Hg (20개)
  - group5: Tl-Fm (20개)
  - group6: Md-Og (18개)

## ✅ 해결된 문제점 (2026-02-06 업데이트)

### 1. ✅ 사진 저장 문제 (해결됨)
**해결 방법**:
- dom-to-image-more → **html2canvas**로 교체
- 캡처 영역(`resultRef`)에 **인라인 CSS** 적용
- iOS Safari: 새 탭에서 이미지 열기 방식 유지
- `package.json`: html2canvas 의존성 추가

### 2. 결과 창 ↔ 도감 창 디자인 일관성 (우선순위: 높음)
**현상**: 결과 화면(`page.tsx`)과 원소 상세 화면(`/elements/[symbol]/page.tsx`)의 디자인이 달라 일관성이 깨짐

**차이점 분석**:
| 요소 | 결과 창 | 도감 창 |
|------|--------|--------|
| 원소 심볼 크기 | 7xl | 8xl |
| 카테고리 배지 | 있음 | 있음 |
| 성격 설명 | 있음 | 있음 |
| 성격 지표 차트 | 있음 (캡처 영역 밖) | 있음 |
| 발견 역사/용도/재미있는 사실 | 있음 (캡처 영역 밖) | 있음 |
| 궁합 원소 | 있음 (캡처 영역 안) | 있음 (별도 카드) |
| 포스트 목록 | 없음 | 있음 |
| 공유/저장 버튼 | 있음 | 없음 |

**해결 방향**:
1. 공통 원소 카드 컴포넌트 추출 (`ElementCard.tsx`)
2. 결과 창에도 포스트 목록 섹션 추가
3. 도감 창에도 "공유하기" 버튼 추가 (해당 원소 URL 공유)
4. 카드 디자인 통일 (폰트 크기, 여백, 색상)

### 3. ✅ 관련 원소/도감 네비게이션 버튼 (해결됨)
**해결 방법**:
- **결과 창**: 같은 족 원소 섹션 + "전체 원소 도감 보기" 버튼 추가
- **도감 상세 창**:
  - "전체 도감 보기" 버튼
  - "이전/다음 원소" 네비게이션
  - "같은 족 원소" 섹션 (같은 category)
- **구현 위치**: `/src/app/elements/[symbol]/page.tsx`

### 4. ✅ 포스트 팩트체크 (완료)
**결과**: 354개 포스트 중 14건 수정 완료 (정확도 96%)

**그룹별 수정 내역**:
| 그룹 | 원소 범위 | 수정 건수 | 주요 수정 |
|------|----------|----------|----------|
| Group 1 | He~Ca | 2건 | He 밀도, Be 이름 유래 |
| Group 2 | Sc~Zr | 5건 | Co 연도, V 배터리, Mn 생산량, Zr 합성연도 |
| Group 3 | Nb~Nd | 1건 | Cd 반 고흐 안료 |
| Group 4 | Pm~Hg | 2건 | Gd 중성자 흡수, Tb 분리 연도 |
| Group 5 | Tl~Fm | 4건 | Bi, Pb, Ra, Tl 수치/연도 |
| Group 6 | Md~Og | 0건 | - |
| basePosts | H, C | 0건 | 모두 정확 |

### 5. ✅ 포스트 가독성 개선 (해결됨)
**해결 방법**:
- **제목 스타일**: h2: `text-3xl font-bold mt-10 mb-5`, h3: `text-2xl font-semibold mt-8 mb-4`
- **본문 스타일**: `text-lg leading-loose mb-6`
- **볼드 마크다운 파싱**: `parseBoldText()` 함수 추가 (`**text**` → `<strong>`)
- **리스트 스타일**: `space-y-3`, `pl-2 leading-relaxed`
- **수정 파일**: `/src/app/elements/[symbol]/posts/[slug]/page.tsx`

### 6. ✅ 결과 창에서 다른 원소 정보 보기 (해결됨)
**해결 방법**:
- 궁합 원소를 **캡처 영역 밖**에 클릭 가능한 `<Link>`로 구현
- 캡처 영역 안의 궁합 정보는 그대로 유지 (이미지 캡처용)
- 캡처 영역 밖에 "궁합 원소 더 알아보기" 섹션 추가
- 클릭 시 `/elements/[symbol]` 페이지로 이동
- **수정 파일**: `/src/app/page.tsx`

### 7. ✅ 홈 화면에 도감 버튼 추가 (해결됨)
**해결 방법**:
- 인트로 화면에 "🧪 원소 도감 둘러보기" 버튼 추가
- 위치: "시작하기" 버튼 아래
- 스타일: Secondary 버튼 (bg-white/70)
- **수정 파일**: `/src/app/page.tsx`

### 8. ✅ 결과 창/도감 창 디자인 통일 (해결됨)
**해결 방법**:
- **공유 컴포넌트 7개** 추출 (`/src/components/ElementSections.tsx`):
  - `TraitsChart`, `HistorySection`, `UsesSection`, `FunFactsSection`
  - `CompatibilitySection`, `SameCategorySection`, `PostsPreview`
- **도감 페이지 중복 데이터 제거**: 로컬 `elementExtras` 삭제 → `@/data/elementExtras` import
- **결과 페이지**: 캡처 영역 밖 섹션을 공유 컴포넌트로 교체 + 포스트 미리보기 추가
- **도감 페이지**: 공유 컴포넌트 사용 + ShareButton 추가
- **디자인 기준**: 도감 페이지의 여유있는 레이아웃으로 통일
- **캡처 영역**: html2canvas 인라인 CSS 유지 (변경 없음)
- **수정 파일**: `page.tsx`, `elements/[symbol]/page.tsx`
- **생성 파일**: `components/ElementSections.tsx`, `components/ShareButton.tsx`

---

## 작업 순서 (권장) - 2026-02-06 업데이트
1. ✅ **높음**: 사진 저장 문제 해결 (html2canvas + 인라인 CSS)
2. ✅ **높음**: 결과 창/도감 창 디자인 통일 (공유 컴포넌트 추출 완료)
3. ✅ **중간**: 네비게이션 버튼 추가
4. ✅ **중간**: 결과 창 궁합 원소 클릭 가능하게
5. ✅ **중간**: 포스트 가독성 개선
6. ✅ **중간**: 포스트 팩트체크 (14건 수정 완료)
7. ✅ **낮음**: 홈 화면 도감 버튼

---

## 다음 단계
1. ✅ 빌드 테스트 통과 (598페이지 정적 생성 확인)
2. ✅ AdSense 승인 대응 1-7번 완료
3. ✅ 포스트 인라인 이미지 삽입 + 결과 창 개선 + 퀴즈 개선
4. ⏳ **포스트 이미지 고도화** (아래 작업 프롬프트 참조)
5. ⏳ 도메인 연결 (manyak.xyz)
6. ⏳ AdSense 재심사 요청
7. ⏳ 이미지 저장 기능 실제 기기 테스트
8. ⏳ 정식 문의 이메일 생성 (현재 임시: jkgkgj@naver.com)

---

## ⏳ 포스트 이미지 고도화 작업 프롬프트

### 배경
현재 384개 포스트에 Unsplash 이미지가 삽입되어 있으나 다음 문제가 있음:
1. **동일 원소의 3개 포스트가 같은 이미지를 공유** (featured + inline 모두 동일)
2. **이미지 alt/캡션이 무의미** (제목을 그대로 복사하거나 "관련 이미지" 같은 generic 텍스트)
3. **일부 이미지 URL이 깨짐** (404 에러)
4. **모든 포스트가 동일한 이미지 배치** (글 상단에 featured 1개 + 본문 중간에 inline 1개)
   → 독립적으로 작성된 글처럼 보이지 않음

### 목표
- 각 포스트의 **글 내용에 맞는 고유 이미지** 사용 (같은 원소라도 포스트별로 다른 이미지)
- **이미지 개수 자유화**: 포스트별 0~4개 (글 길이/내용에 따라 자연스럽게)
- **이미지 위치 자유화**: 글 흐름에 맞게 배치 (상단/중간/하단 등)
- **alt 텍스트/캡션 의미있게 작성**: 이미지 내용을 실제로 설명
- **featured image(image 필드)도 포스트별로 고유하게**
- **깨진 이미지 URL 교체**: 유효한 URL만 사용

### 이미지 소스 전략
Unsplash Source API 활용 (검증된 접근):
```
https://images.unsplash.com/photo-{ID}?w=800&h=400&fit=crop
```
- 각 sub-agent는 WebSearch로 "unsplash {keyword}" 검색하여 실제 유효한 photo ID 확보
- 또는 Unsplash 직접 접속하여 주제 관련 이미지 URL 수집
- **중요**: 각 이미지 URL이 실제 로드되는지 확인 필수 (WebFetch로 HEAD 체크 권장)

### 마크다운 이미지 형식
```
![구체적인 이미지 설명](https://images.unsplash.com/photo-XXX?w=800&h=400&fit=crop)
```
- featured image: `image` 필드에 URL 저장
- inline image: 본문 content에 마크다운 형식으로 삽입

### 데이터 구조 (참고)
```typescript
interface Post {
  slug: string;
  title: string;
  summary: string;
  content: string;      // 마크다운 이미지를 여기에 자유롭게 배치
  tags: string[];
  image?: string;       // featured image URL
}
```

### 병렬 처리 (8개 sub-agent, sonnet 모델)

**Agent 0**: `src/data/posts.ts` — H(수소) 3개, C(탄소) 3개 = 6개 포스트
**Agent 1**: `src/data/posts/group1.ts` — He~Ca = 54개 포스트
**Agent 2**: `src/data/posts/group2.ts` — Sc~Zr = 60개 포스트
**Agent 3**: `src/data/posts/group3.ts` — Nb~ = 60개 포스트
**Agent 4**: `src/data/posts/group3_part2.ts` — 30개 포스트
**Agent 5**: `src/data/posts/group4.ts` — Pm~ = 60개 포스트
**Agent 6**: `src/data/posts/group5.ts` — Tl~ = 60개 포스트
**Agent 7**: `src/data/posts/group6.ts` — Md~Og = 54개 포스트

### Sub-agent 프롬프트 템플릿

```
## Task
`/Users/jun/Jun workstation/element-personality-test/{FILE_PATH}` 파일의 모든 포스트 이미지를 고도화하세요.

## 현재 문제
1. 같은 원소의 3개 포스트가 동일한 이미지를 사용
2. alt/캡션이 무의미 ("관련 이미지", 제목 복사 등)
3. 모든 포스트가 featured 1개 + inline 1개로 동일한 패턴

## 수정 원칙

### 이미지 개수 (포스트별로 자유롭게)
- 짧은 글: featured 1개 + inline 0~1개
- 중간 글: featured 1개 + inline 1~2개
- 긴 글: featured 1개 + inline 2~3개
- 일부 포스트는 featured만 있고 inline 없어도 됨
- **같은 원소의 3개 포스트라도 이미지 개수가 달라야 함**

### 이미지 위치 (자유 배치)
- inline 이미지는 글 내용의 흐름에 맞는 위치에 배치
- 반드시 첫 번째 섹션 아래일 필요 없음 — 중간, 후반부에도 가능
- **같은 원소의 3개 포스트라도 이미지 위치가 달라야 함**

### 이미지 선택 기준
- **글 내용과 직접적으로 관련된 이미지** (원소 자체가 아닌, 해당 포스트의 주제에 맞는)
  - 예: "수소 연료전지 미래" 포스트 → 전기차/수소차 이미지
  - 예: "힌덴부르크 참사" 포스트 → 비행선/역사 이미지
  - 예: "우주의 시작" 포스트 → 우주/은하 이미지
- **같은 원소의 포스트들이 서로 다른 이미지를 사용해야 함**

### alt 텍스트/캡션 작성
- 이미지에 실제로 보이는 것을 구체적으로 서술
- 예: ❌ "관련 이미지" / ❌ "과학적 발견"
- 예: ✅ "수소 연료전지로 구동되는 현대 넥쏘 자동차" / ✅ "1937년 힌덴부르크 비행선의 역사적 사진"

### 이미지 URL
- Unsplash 이미지 사용: `https://images.unsplash.com/photo-{ID}?w=800&h=400&fit=crop`
- WebSearch로 "site:unsplash.com {주제 키워드 영문}" 검색하여 유효한 이미지 URL 확보
- **각 포스트마다 고유한 이미지 URL 사용** (URL 재사용 금지)
- featured image(image 필드)와 inline image가 다른 URL이어야 함

### 수정 방법
1. 파일을 Read로 읽기
2. 각 포스트의 content를 분석하여 적절한 이미지 주제 결정
3. WebSearch로 이미지 URL 확보 (원소별로 검색어를 다르게)
4. 기존 이미지를 새 이미지로 교체 (Edit 사용)
5. 이미지 개수/위치를 포스트별로 자유롭게 조정
6. image 필드(featured)도 포스트에 맞게 교체

### 검색어 예시 (영문 키워드로)
- 수소 우주 포스트 → "site:unsplash.com galaxy nebula stars"
- 수소 연료전지 → "site:unsplash.com hydrogen fuel cell car"
- 철 건축 → "site:unsplash.com steel bridge construction"
- 금 역사 → "site:unsplash.com gold bars treasure"

## Expected Output
- 수정된 파일 (모든 포스트의 이미지가 고유하고 적절하게 배치됨)
- 변경한 포스트 수 및 총 이미지 수 요약

## Do NOT
- 이미지 외의 content 텍스트를 변경하지 말 것
- Post 인터페이스를 변경하지 말 것
- 기존 slug, title, summary, tags를 변경하지 말 것
```

### 통합 후 확인 절차
모든 sub-agent 완료 후:
1. `npm run build` 실행하여 빌드 확인
2. 이미지 URL 중복 검사 (같은 URL이 여러 포스트에 쓰이지 않는지)
3. Git commit + push

---

## 향후 확장 계획
사이트 구조 예시:
```
manyak.xyz/                    → 메인 (테스트 목록)
manyak.xyz/element/            → 만약... 내가 원소라면?
manyak.xyz/flower/             → 만약... 내가 꽃이라면?
manyak.xyz/animal/             → 만약... 내가 동물이라면?
```

## 명령어
```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```
