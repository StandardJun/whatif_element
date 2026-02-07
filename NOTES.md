# 만약... 내가 원소라면? (manyak.xyz)

## Current State
- Next.js 16 (App Router) + Tailwind + Cloudflare Pages (static export)
- 118개 원소 성격 테스트 + 도감 + 블로그 포스트 354+개
- GitHub: StandardJun/whatif_element → Cloudflare 자동 배포
- 전체 감사 수정 완료 + 크로스 원소 이미지 중복 해소 (빌드 통과)
- 정보 오류 제보 기능 구현 완료 (Supabase 연동, 빌드 통과, 미배포)

## Active Decisions
- 커스텀 마크다운 파서: `\n\n` 기준 블록 분리, 이미지/테이블/리스트/인라인 포맷팅
- Unsplash 대체 이미지: napi 내부 API로 photo ID 확보 → curl로 200 검증
- 정보 제보: Supabase (feedback 테이블) + ReportButton 클라이언트 컴포넌트

## Known Issues
- AdSense 미승인
- Supabase 프로젝트 미생성 → env 변수 설정 + 테이블/RLS 생성 필요

## Next Steps
1. ⏳ Supabase 프로젝트 생성 → env 설정 → Cloudflare 배포
2. ⏳ 도메인 연결 (manyak.xyz) / AdSense / 영어 번역
