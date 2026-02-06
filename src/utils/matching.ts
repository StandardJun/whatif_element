import { elements, Element } from '@/data/elements';
import { questions } from '@/data/questions';

export interface UserTraits {
  activity: number;
  sociability: number;
  stability: number;
  sensitivity: number;
  originality: number;
}

export interface MatchResult {
  element: Element;
  score: number;
  goodMatches: Element[];
  badMatches: Element[];
}

// 사용자 응답을 5가지 차원 점수로 변환 (가중 평균)
// 각 차원의 첫 번째 질문에 0.6, 두 번째 질문에 0.4 가중치 적용
// → 차원당 가능값 9개→19개, 총 조합 59,049→2,476,099로 분해능 향상
export function calculateUserTraits(answers: Record<number, number>): UserTraits {
  const traits: UserTraits = {
    activity: 0,
    sociability: 0,
    stability: 0,
    sensitivity: 0,
    originality: 0
  };

  // 차원별 질문 순서 추적 (첫 번째: 0.6, 두 번째: 0.4)
  const dimensionOrder: Record<string, number> = {
    activity: 0,
    sociability: 0,
    stability: 0,
    sensitivity: 0,
    originality: 0
  };
  const weights = [0.6, 0.4];

  questions.forEach(q => {
    if (answers[q.id] !== undefined) {
      const order = dimensionOrder[q.dimension];
      const w = weights[order] ?? 0.5;
      traits[q.dimension] += answers[q.id] * w;
      dimensionOrder[q.dimension]++;
    }
  });

  return traits;
}

// 유클리드 거리 기반 유사도 계산
function calculateSimilarity(userTraits: UserTraits, elementTraits: Element['traits']): number {
  const diff = {
    activity: userTraits.activity - elementTraits.activity,
    sociability: userTraits.sociability - elementTraits.sociability,
    stability: userTraits.stability - elementTraits.stability,
    sensitivity: userTraits.sensitivity - elementTraits.sensitivity,
    originality: userTraits.originality - elementTraits.originality
  };

  const distance = Math.sqrt(
    diff.activity ** 2 +
    diff.sociability ** 2 +
    diff.stability ** 2 +
    diff.sensitivity ** 2 +
    diff.originality ** 2
  );

  // 최대 거리는 sqrt(5 * 4^2) = sqrt(80) ≈ 8.94
  // 유사도를 0-100 스케일로 변환
  const maxDistance = Math.sqrt(80);
  const similarity = ((maxDistance - distance) / maxDistance) * 100;

  return Math.max(0, Math.min(100, similarity));
}

// 가장 잘 맞는 원소 찾기
export function findMatchingElement(answers: Record<number, number>): MatchResult {
  const userTraits = calculateUserTraits(answers);

  let bestMatch: Element = elements[0];
  let bestScore = -1;

  elements.forEach(element => {
    const score = calculateSimilarity(userTraits, element.traits);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = element;
    }
  });

  // 좋은 궁합과 나쁜 궁합 원소 찾기
  const goodMatches = bestMatch.goodMatch
    .map(num => elements.find(e => e.number === num))
    .filter((e): e is Element => e !== undefined);

  const badMatches = bestMatch.badMatch
    .map(num => elements.find(e => e.number === num))
    .filter((e): e is Element => e !== undefined);

  return {
    element: bestMatch,
    score: Math.round(bestScore),
    goodMatches,
    badMatches
  };
}

// 원소 카테고리 한글 변환
export function getCategoryNameKo(category: string): string {
  const categoryMap: Record<string, string> = {
    'nonmetal': '비금속',
    'noble-gas': '비활성 기체',
    'alkali-metal': '알칼리 금속',
    'alkaline-earth': '알칼리 토금속',
    'metalloid': '준금속',
    'post-transition': '전이후 금속',
    'transition': '전이 금속',
    'lanthanide': '란타넘족',
    'actinide': '악티늄족',
    'halogen': '할로겐'
  };
  return categoryMap[category] || category;
}

// 카테고리별 색상
export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'nonmetal': 'bg-green-500',
    'noble-gas': 'bg-purple-500',
    'alkali-metal': 'bg-red-500',
    'alkaline-earth': 'bg-orange-500',
    'metalloid': 'bg-teal-500',
    'post-transition': 'bg-blue-400',
    'transition': 'bg-blue-600',
    'lanthanide': 'bg-pink-500',
    'actinide': 'bg-rose-600',
    'halogen': 'bg-yellow-500'
  };
  return colorMap[category] || 'bg-gray-500';
}
