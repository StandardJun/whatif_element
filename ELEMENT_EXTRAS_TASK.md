# 원소 콘텐츠 보강 작업 (103개 원소)

## 배경
`elementExtras.ts`에 현재 15개 원소(H, He, Li, C, N, O, Fe, Cu, Ag, Au, U, Na, Cl, Si, Al)만 고유 데이터가 있음.
나머지 103개는 카테고리별 generic fallback 사용 → Google AdSense가 "저품질 콘텐츠"로 판단.

## 실행 방법
`/delegate` 명령 후 아래 내용을 전달하세요:

---

## 작업 설명
`/Users/jun/Jun workstation/element-personality-test/src/data/elementExtras.ts` 파일의 `elementExtrasData` 객체에 103개 원소의 고유 데이터를 추가해야 합니다.

### 모델: sonnet (구현 작업)

### 데이터 형식
```typescript
Symbol: {
  history: string,   // 발견 역사 (2-3문장, 발견자/연도/이름 유래 포함)
  uses: string[],    // 실생활 용도 (4개)
  funFacts: string[], // 재미있는 사실 (3개)
}
```

### 기존 예시 (참고용)
```typescript
Fe: {
  history: '고대부터 사용된 금속으로, 철기시대를 열었습니다. 라틴어 ferrum에서 기호가 유래했습니다.',
  uses: ['건축 구조물', '자동차', '가전제품', '수술 도구'],
  funFacts: ['지구 핵의 주성분입니다', '혈액의 헤모글로빈에 들어있습니다', '가장 많이 사용되는 금속입니다'],
},
```

### 품질 기준
- history: 발견자, 연도, 이름 유래 중 최소 2가지 포함. 한국어로 작성
- uses: 구체적이고 다양한 용도 4개 (너무 일반적이면 안 됨)
- funFacts: 흥미롭고 검증 가능한 사실 3개 (숫자/비교 포함 권장)
- **팩트체크 필수**: 연도, 인명, 수치가 정확해야 함

### 병렬 처리 (6그룹)

**Group 1** (20개): Be, B, F, Ne, Mg, P, S, Ar, K, Ca, Sc, Ti, V, Cr, Mn, Co, Ni, Zn, Ga, Ge
**Group 2** (20개): As, Se, Br, Kr, Rb, Sr, Y, Zr, Nb, Mo, Tc, Ru, Rh, Pd, Cd, In, Sn, Sb, Te, I
**Group 3** (20개): Xe, Cs, Ba, La, Ce, Pr, Nd, Pm, Sm, Eu, Gd, Tb, Dy, Ho, Er, Tm, Yb, Lu, Hf, Ta
**Group 4** (20개): W, Re, Os, Ir, Pt, Hg, Tl, Pb, Bi, Po, At, Rn, Fr, Ra, Ac, Th, Pa, Np, Pu, Am
**Group 5** (20개): Cm, Bk, Cf, Es, Fm, Md, No, Lr, Rf, Db, Sg, Bh, Hs, Mt, Ds, Rg, Cn, Nh, Fl, Mc
**Group 6** (3개): Lv, Ts, Og

### Sub-agent 프롬프트 템플릿

```
## Task
`/Users/jun/Jun workstation/element-personality-test/src/data/elementExtras.ts` 파일을 수정하여
elementExtrasData 객체에 [GROUP] 원소들의 고유 데이터를 추가하세요.

## 대상 원소
[ELEMENT_LIST]

## 데이터 형식
각 원소에 대해:
- history: 발견 역사 2-3문장 (발견자, 연도, 이름 유래)
- uses: 실생활 용도 4개 (구체적)
- funFacts: 재미있는 사실 3개 (숫자/비교 포함)

## 품질 기준
- 한국어로 작성
- 팩트체크 필수 (연도, 인명, 수치 정확성)
- 중학생도 이해할 수 있는 수준

## 파일 수정 방법
elementExtrasData 객체의 마지막 항목(현재 Al) 뒤에 새 항목들을 추가하세요.
기존 데이터는 절대 수정하지 마세요.

## Expected Output
- 수정된 파일
- 추가된 원소 목록 확인
```

### 통합 후 확인
모든 그룹 완료 후:
1. `npm run build` 실행하여 빌드 확인
2. 118개 원소 모두 고유 데이터가 있는지 검증
3. Git commit + push
