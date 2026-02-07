'use client';

import { useState } from 'react';
import Link from 'next/link';
import { elements } from '@/data/elements';
import { getCategoryColor } from '@/utils/matching';

const categories = [
  { id: 'alkali-metal', name: '알칼리 금속', description: '활발하고 반응성이 높은 금속들' },
  { id: 'alkaline-earth', name: '알칼리 토금속', description: '안정적이고 든든한 금속들' },
  { id: 'transition', name: '전이 금속', description: '다재다능하고 실용적인 금속들' },
  { id: 'post-transition', name: '전이후 금속', description: '유연하고 적응력 있는 금속들' },
  { id: 'metalloid', name: '준금속', description: '금속과 비금속의 특성을 모두 가진 원소들' },
  { id: 'nonmetal', name: '비금속', description: '생명과 에너지의 핵심 원소들' },
  { id: 'halogen', name: '할로겐', description: '반응성이 강하고 열정적인 원소들' },
  { id: 'noble-gas', name: '비활성 기체', description: '독립적이고 안정적인 기체들' },
  { id: 'lanthanide', name: '란타넘족', description: '희귀하고 특별한 희토류 원소들' },
  { id: 'actinide', name: '악티늄족', description: '강력하고 신비로운 방사성 원소들' },
];

const categoryBgColor: Record<string, string> = {
  'nonmetal': 'bg-green-100 border-green-300',
  'noble-gas': 'bg-purple-100 border-purple-300',
  'alkali-metal': 'bg-red-100 border-red-300',
  'alkaline-earth': 'bg-orange-100 border-orange-300',
  'metalloid': 'bg-teal-100 border-teal-300',
  'post-transition': 'bg-blue-100 border-blue-300',
  'transition': 'bg-sky-50 border-sky-200',
  'lanthanide': 'bg-pink-100 border-pink-300',
  'actinide': 'bg-rose-100 border-rose-300',
  'halogen': 'bg-yellow-100 border-yellow-300',
};

export default function ElementsPageContent() {
  const [view, setView] = useState<'category' | 'number'>('category');

  return (
    <>
      {/* Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white/80 rounded-xl border border-orange-100 p-1 shadow-sm">
          <button
            onClick={() => setView('category')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'category'
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            카테고리별
          </button>
          <button
            onClick={() => setView('number')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'number'
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            원자번호순
          </button>
        </div>
      </div>

      {view === 'category' ? (
        /* Category View */
        <div className="space-y-12">
          {categories.map(category => {
            const categoryElements = elements.filter(el => el.category === category.id);
            if (categoryElements.length === 0) return null;

            return (
              <section key={category.id} className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-orange-100 shadow-lg">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-4 h-4 rounded-full ${getCategoryColor(category.id)}`}></span>
                    <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                    <span className="text-gray-400 text-sm">({categoryElements.length}개)</span>
                  </div>
                  <p className="text-gray-500 ml-7">{category.description}</p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                  {categoryElements.map(element => (
                    <Link key={element.symbol} href={`/elements/${element.symbol}`} className="group block">
                      <div className="bg-white/70 hover:bg-white rounded-2xl p-3 border border-orange-100 hover:border-orange-300 transition-all duration-200 hover:shadow-md hover:scale-105 text-center">
                        <div className="text-xs text-gray-400 mb-1">{element.number}</div>
                        <div className="text-2xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                          {element.symbol}
                        </div>
                        <div className="text-xs text-gray-600 truncate">{element.nameKo}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* Atomic Number View */
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-orange-100 shadow-lg">
          {/* Legend */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full ${getCategoryColor(cat.id)}`}></span>
                <span className="text-xs text-gray-500">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-18 gap-1.5">
            {[...elements].sort((a, b) => a.number - b.number).map(element => (
              <Link key={element.symbol} href={`/elements/${element.symbol}`} className="group block">
                <div className={`rounded-lg p-1.5 border transition-all duration-200 hover:shadow-md hover:scale-110 text-center ${categoryBgColor[element.category] || 'bg-gray-100 border-gray-300'}`}>
                  <div className="text-[10px] text-gray-500 leading-none">{element.number}</div>
                  <div className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors leading-tight">
                    {element.symbol}
                  </div>
                  <div className="text-[9px] text-gray-500 truncate leading-none">{element.nameKo}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
