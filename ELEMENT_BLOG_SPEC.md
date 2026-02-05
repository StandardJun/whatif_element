# 원소 블로그 페이지 구현 명세서

## 목적
Google AdSense 승인을 위한 고품질 콘텐츠 페이지 추가. 각 원소에 대한 정보를 블로그 형식으로 제공하고, 테스트 결과 페이지에서 해당 원소의 상세 페이지로 이동할 수 있게 함.

## 구현 요구사항

### 1. 라우팅 구조
```
/elements          → 원소 목록 페이지 (블로그 인덱스)
/elements/[symbol] → 개별 원소 상세 페이지 (예: /elements/Au, /elements/Fe)
```

### 2. 원소 목록 페이지 (`/elements`)
- 118개 원소를 카테고리별로 그룹화하여 표시
- 각 원소 카드 클릭 시 상세 페이지로 이동
- 검색 기능 (선택사항)
- 현재 디자인 톤과 일관성 유지 (파스텔 톤, 따뜻한 색상)

### 3. 원소 상세 페이지 (`/elements/[symbol]`)
- 원소 기본 정보 표시:
  - 원소 기호, 한글명, 영문명, 원자번호
  - 카테고리 (알칼리 금속, 전이금속 등)
  - 성격 설명 (이미 elements.ts에 있는 description)
- 추가 콘텐츠 (AdSense를 위한 풍부한 콘텐츠):
  - 원소의 발견 역사
  - 실생활 용도
  - 재미있는 사실
  - 이 원소와 잘 맞는 성격 유형
- 관련 원소 추천 (궁합 좋은 원소들)
- "테스트 해보기" 버튼 (메인 페이지로 이동)

### 4. 결과 페이지 수정 (`page.tsx`)
- 결과 카드에 "이 원소에 대해 더 알아보기" 버튼 추가
- 클릭 시 `/elements/[symbol]` 페이지로 이동

### 5. 디자인 가이드라인
- 배경: `bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50`
- 카드: `bg-white/80 backdrop-blur-md rounded-3xl border border-orange-100 shadow-lg`
- 버튼: `bg-gradient-to-r from-orange-400 to-rose-400`
- 텍스트: `text-gray-800`, `text-gray-500`, `text-gray-600`

### 6. 데이터 구조 확장
`src/data/elements.ts`에 각 원소별 추가 정보가 필요할 수 있음:
```typescript
interface ElementExtended {
  // 기존 필드들...
  history?: string;      // 발견 역사
  uses?: string[];       // 실생활 용도
  funFacts?: string[];   // 재미있는 사실
}
```

### 7. SEO 고려사항
- 각 원소 페이지에 적절한 메타데이터 설정
- 시맨틱 HTML 사용 (article, header, section 등)
- 구조화된 데이터 (선택사항)

## 참고 파일
- `/src/data/elements.ts` - 원소 데이터
- `/src/app/page.tsx` - 메인 페이지 (결과 화면 수정 필요)
- `/src/app/globals.css` - 스타일
- `/src/utils/matching.ts` - 매칭 유틸리티

## 주의사항
- 기존 테스트 기능에 영향 주지 않기
- 빌드 에러 없이 완료하기
- 디자인 일관성 유지
