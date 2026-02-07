# 만약... 내가 원소라면? (manyak.xyz)

## Current State
- Next.js 16 (App Router) + Tailwind + Cloudflare Pages (static export)
- 118개 원소 성격 테스트 + 도감 + 블로그 포스트 378개
- GitHub: StandardJun/whatif_element → Cloudflare 자동 배포
- 포스트 전수 스캔 완료 (07baaed): 404 이미지 205건 교체, 중복 98건 해소, 포맷 75건 수정
- 정보 오류 제보: Supabase 연동 완료 (d2650d3), 도감 토글 (db6cc02)
- Cloudflare env 변수 설정 필요 (미완)

## Active Decisions
- 커스텀 마크다운 파서: `\n\n` 기준 블록 분리
- Unsplash 이미지: napi search → urls.raw base URL + ?w=800&h=400&fit=crop
- 정보 제보: Supabase (feedback 테이블) + ReportButton 클라이언트 컴포넌트

## Known Issues
- AdSense 미승인
- Cloudflare Pages에 Supabase env 변수 미설정 → 프로덕션 제보 기능 미작동
- Cross-element 이미지 중복 3건 잔존 (기능적 문제 없음)

## Next Steps
1. ⏳ Cloudflare Pages env 변수 설정 → 재배포
2. ⏳ 도메인 연결 (manyak.xyz) / AdSense / 영어 번역
