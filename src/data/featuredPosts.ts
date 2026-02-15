// AdSense 심사용 대표 포스트 목록
// 이 목록에 포함된 포스트만 index 허용, 나머지는 noindex 처리
// 승인 후 점진적으로 해제할 것 (ADSENSE_IMPROVEMENT.md 11번 참조)

export const FEATURED_POSTS: Array<{ symbol: string; slug: string }> = [
  // 비금속 / 기본 원소
  { symbol: 'H', slug: 'hydrogen-universe-beginning' },
  { symbol: 'C', slug: 'carbon-jekyll-hyde' },
  { symbol: 'N', slug: 'nitrogen-78-percent-air' },
  { symbol: 'O', slug: 'oxygen-fire-truth' },
  { symbol: 'P', slug: 'phosphorus-life-essential' },
  { symbol: 'S', slug: 'sulfur-volcano-yellow' },

  // 할로겐 / 비활성 기체
  { symbol: 'F', slug: 'fluorine-toothpaste-secret' },
  { symbol: 'Cl', slug: 'chlorine-water-treatment' },
  { symbol: 'I', slug: 'iodine-thyroid-secret' },
  { symbol: 'He', slug: 'helium-voice-science' },

  // 알칼리 / 알칼리 토금속
  { symbol: 'Na', slug: 'sodium-salt-body' },
  { symbol: 'Mg', slug: 'magnesium-fireworks-flash' },
  { symbol: 'Cs', slug: 'cesium-atomic-clock' },

  // 전이 금속
  { symbol: 'Fe', slug: 'iron-blood-red' },
  { symbol: 'Cu', slug: 'copper-first-metal-human' },
  { symbol: 'Zn', slug: 'zinc-cold-immune' },
  { symbol: 'Ag', slug: 'silver-photography-history' },
  { symbol: 'Pt', slug: 'platinum-catalytic-converter' },
  { symbol: 'Au', slug: 'gold-why-yellow' },
  { symbol: 'Ti', slug: 'titanium-strongest-lightest' },
  { symbol: 'W', slug: 'tungsten-light-bulb' },

  // 준금속 / 기타 금속
  { symbol: 'Al', slug: 'aluminum-can-recycle' },
  { symbol: 'Si', slug: 'silicon-chip-revolution' },
  { symbol: 'Sn', slug: 'tin-bronze-age' },
  { symbol: 'Pb', slug: 'lead-rome-fall' },

  // 란타넘족
  { symbol: 'Nd', slug: 'neodymium-strongest-magnet' },

  // 악티늄족
  { symbol: 'U', slug: 'uranium-nuclear-power' },
  { symbol: 'Ra', slug: 'radium-curie-discovery' },
];

export function isFeaturedPost(symbol: string, slug: string): boolean {
  return FEATURED_POSTS.some(p => p.symbol === symbol && p.slug === slug);
}
