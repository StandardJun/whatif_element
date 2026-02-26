# 만약... 내가 원소라면? (manyak.xyz)

## Current State
- Next.js 16 (App Router) + Tailwind + Cloudflare Pages (static export)
- 118개 원소 성격 테스트 + 도감 + 블로그 포스트 378개
- GitHub: StandardJun/whatif_element → Cloudflare 자동 배포
- 포스트 전수 스캔 완료 (07baaed): 404 이미지 205건 교체, 중복 98건 해소, 포맷 75건 수정
- 정보 오류 제보: Supabase 연동 완료 (d2650d3), 도감 토글 (db6cc02)
- Cloudflare env 변수 설정 필요 (미완)

## AdSense 승인 작업 (2026-02-16 완료)
- noindex 시스템: 27개 featured 포스트만 index, 351개 noindex
- featured 포스트 전체 1500자+ 콘텐츠 확장 완료 (f570b9e)
- 포스트 구조 다양화: 표, blockquote, FAQ, 번호 리스트 등
- 저자 정보 카드 + 참고 자료 섹션 전체 추가
- JSON-LD: BlogPosting (datePublished/dateModified), Organization, BreadcrumbList, WebSite
- OG 이미지 (1200x630), ads.txt, Canonical URL
- 헤더 네비게이션 + SVG 로고 (원자 궤도 아이콘 + 그라디언트 텍스트) (24bf499)
- 소셜 공유 버튼 (X, Facebook, 링크 복사)
- 홈페이지 Featured 포스트 6개 섹션
- 크로스 원소 관련 글 추천 (태그 기반)
- 커스텀 404 페이지
- 텍스트 오버플로우 수정 (overflow-wrap + table-layout: fixed) (53a5c97)
- 중복 footer 제거 (about/privacy/terms)
- 상세: ADSENSE_IMPROVEMENT.md 참조

## Active Decisions
- 커스텀 마크다운 파서: `\n\n` 기준 블록 분리
- Unsplash 이미지: napi search → urls.raw base URL + ?w=800&h=400&fit=crop
- 정보 제보: Supabase (feedback 테이블) + ReportButton 클라이언트 컴포넌트
- AdSense 재신청: 거절 후 2주 대기 필요 (2026-02 중 거절)

## Known Issues
- AdSense 미승인 (재신청 대기 중)
- Cloudflare Pages에 Supabase env 변수 미설정 → 프로덕션 제보 기능 미작동
- Cross-element 이미지 중복 3건 잔존 (기능적 문제 없음)
- images.unoptimized: true (static export 필수 제약)

## Next Steps
1. ⏳ AdSense 재신청 (거절 후 2주 대기)
2. ⏳ Cloudflare Pages env 변수 설정 → 재배포
3. ⏳ 영어 번역 (UI 텍스트 → featured 포스트 27개 → 도감)
4. ⏳ 댓글 기능 (Supabase)
5. ⏳ Core Web Vitals 점검
6. ⏳ 승인 후: noindex 포스트 점진적 해제 (주 10-20개)
