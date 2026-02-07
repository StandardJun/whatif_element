# 만약... 내가 원소라면? (manyak.xyz)

## Current State
- Next.js 16 (App Router) + Tailwind + Cloudflare Pages (static export)
- 118개 원소 성격 테스트 + 도감 + 블로그 포스트 354+개
- GitHub: StandardJun/whatif_element → Cloudflare 자동 배포
- 전체 감사 기반 수정 완료: 5개 우선순위 + 크로스 원소 이미지 중복 (빌드 통과)

## Active Decisions
- 커스텀 마크다운 파서: `\n\n` 기준 블록 분리, 이미지/테이블/리스트/인라인 포맷팅
- 6개 병렬 sub-agent 패턴으로 118개 원소 콘텐츠 관리
- Unsplash 대체 이미지: napi 내부 API로 photo ID 확보 → curl로 200 검증

## Known Issues
- ~~Group3 triple newline 67건~~ ✅ 완료
- ~~Group6 이미지 중복 35건~~ ✅ 19건 교체 완료
- ~~Group1 featured=inline 30건~~ ✅ 30건 인라인 교체 완료
- ~~Group6 텍스트 중복 4건~~ ✅ Hs(2)+Mt(2) 제거 완료
- ~~의심 404 URL 2건~~ ✅ Cu(group2)+Pm(group4) 교체 완료
- ~~크로스 원소 이미지 중복~~ ✅ Group2(4건)+Group3(15건) 교체 완료
- AdSense 미승인

## Next Steps
1. ⏳ 도메인 연결 (manyak.xyz) / AdSense / 영어 번역
