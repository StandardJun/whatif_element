'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { questions, getQuestionText, getOptionLabel } from '@/data/questions';
import { translations, type Language } from '@/data/translations';
import { findMatchingElement, getCategoryNameKo, getCategoryColor } from '@/utils/matching';
import type { MatchResult } from '@/utils/matching';
import { getElementExtras, traitNames } from '@/data/elementExtras';
import { elements } from '@/data/elements';
import { TraitsChart, HistorySection, UsesSection, FunFactsSection, CompatibilitySection, SameCategorySection, PostsPreview } from '@/components/ElementSections';
import { getPostsBySymbol } from '@/data/posts';

type Step = 'intro' | 'quiz' | 'result';

export default function Home() {
  const [step, setStep] = useState<Step>('intro');
  const [lang, setLang] = useState<Language>('ko');
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<MatchResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(prev => prev === 'ko' ? 'en' : 'ko');
  };

  const handleStart = () => {
    if (userName.trim()) {
      setStep('quiz');
    }
  };

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const matchResult = findMatchingElement(newAnswers);
      setResult(matchResult);
      setStep('result');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      setStep('intro');
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setUserName('');
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const handleShare = () => {
    if (result) {
      const text = t.shareText(result.element.nameKo, result.element.symbol);
      if (navigator.share) {
        navigator.share({ title: t.title, text, url: window.location.href });
      } else {
        navigator.clipboard.writeText(text + ' ' + window.location.href);
        alert(t.linkCopied);
      }
    }
  };

  const handleSaveImage = async () => {
    if (!resultRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#fef7ed',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const filename = `manyak-${result?.element.symbol || 'result'}.png`;

      // iOS Safari 체크
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isIOS) {
        // iOS에서는 새 탭에서 이미지 열기 (길게 눌러서 저장)
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<img src="${dataUrl}" style="max-width:100%">`);
        }
      } else {
        // 데스크톱 및 Android
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        link.click();
      }
    } catch (error) {
      console.error('Failed to save image:', error);
      alert(lang === 'ko' ? '이미지 저장에 실패했습니다.' : 'Failed to save image.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Language Toggle - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-orange-200 shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
        >
          <span className={lang === 'ko' ? 'text-orange-500' : 'text-gray-400'}>KO</span>
          <span className="text-gray-300">|</span>
          <span className={lang === 'en' ? 'text-orange-500' : 'text-gray-400'}>EN</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">

        {/* Intro Screen */}
        {step === 'intro' && (
          <div className="text-center max-w-md w-full animate-fadeIn">
            <div className="mb-8">
              <div className="text-6xl mb-4">⚛️</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">{t.title}</h1>
              <p className="text-gray-500">{t.subtitle}</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 mb-6 border border-orange-100 shadow-lg">
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                className="w-full px-4 py-3 rounded-2xl bg-orange-50/50 text-gray-700 placeholder-gray-400 border border-orange-200 focus:outline-none focus:border-orange-300 focus:bg-white text-center text-lg transition-all duration-200"
                maxLength={20}
              />
            </div>

            <button
              onClick={handleStart}
              disabled={!userName.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-lg hover:from-orange-500 hover:to-rose-500 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.startButton}
            </button>

            <Link
              href="/elements"
              className="block w-full py-3 mt-3 rounded-2xl bg-white/70 hover:bg-white border border-orange-200 text-gray-600 font-medium text-center transition-all duration-200"
            >
              {lang === 'ko' ? '🧪 원소 도감 둘러보기' : '🧪 Browse Element Encyclopedia'}
            </Link>

            <p className="mt-6 text-gray-400 text-sm">
              {t.questionCount}
            </p>

            {/* SEO Content - 크롤러용 사이트 설명 */}
            <div className="mt-10 text-left bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-100">
              <h2 className="text-lg font-bold text-gray-700 mb-3">
                {lang === 'ko' ? '🧪 나와 닮은 원소 찾기' : '🧪 Find Your Element'}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {lang === 'ko'
                  ? '활동성, 사교성, 안정성, 감성, 독창성 — 5가지 성격 차원을 기반으로 118개 원소 중 당신과 가장 잘 맞는 원소를 찾아드립니다. 재미있는 상황 기반 질문 10개에 답하고, 나만의 원소를 발견해보세요!'
                  : 'Based on 5 personality dimensions — Activity, Sociability, Stability, Sensitivity, and Originality — we match you with the most fitting element among 118. Answer 10 fun situational questions and discover your element!'}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="px-2 py-1 bg-orange-50 rounded-full">118개 원소</span>
                <span className="px-2 py-1 bg-orange-50 rounded-full">10개 질문</span>
                <span className="px-2 py-1 bg-orange-50 rounded-full">5가지 성격 차원</span>
                <span className="px-2 py-1 bg-orange-50 rounded-full">350+ 블로그 포스트</span>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Screen */}
        {step === 'quiz' && (
          <div className="max-w-lg w-full">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-gray-500 text-sm mb-2">
                <span>{t.questionOf(currentQuestion + 1, questions.length)}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2.5 bg-orange-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-rose-400 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 mb-6 border border-orange-100 shadow-lg animate-slideUp">
              <h2 className="text-xl text-gray-700 font-medium text-center leading-relaxed">
                {getQuestionText(questions[currentQuestion], lang)}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = answers[questions[currentQuestion].id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full py-3.5 px-5 rounded-2xl border font-medium transition-all duration-200 text-left hover:translate-x-1 hover:shadow-md ${
                      isSelected
                        ? 'bg-orange-100 border-orange-300 text-orange-700'
                        : 'bg-white/70 hover:bg-white border-orange-100 hover:border-orange-300 text-gray-700'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {getOptionLabel(option, lang)}
                  </button>
                );
              })}
            </div>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="mt-6 w-full py-3 rounded-2xl bg-white/50 hover:bg-white/70 border border-gray-200 text-gray-500 hover:text-gray-700 font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>←</span> {t.back}
            </button>
          </div>
        )}

        {/* Result Screen */}
        {step === 'result' && result && (
          <div className="max-w-lg w-full animate-fadeIn">
            {/* Capture Area - 인라인 스타일 사용 (html2canvas 호환) */}
            <div
              ref={resultRef}
              style={{
                background: 'linear-gradient(to bottom right, #fffbeb, #fff7ed, #fff1f2)',
                padding: '16px',
                borderRadius: '24px',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <p style={{ color: '#6b7280', marginBottom: '8px', fontSize: '14px' }}>{t.resultFor(userName)}</p>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', letterSpacing: '-0.025em' }}>{t.yourElement}</h1>
              </div>

              {/* Main Result Card */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '24px',
                  padding: '32px',
                  marginBottom: '24px',
                  textAlign: 'center',
                  border: '1px solid #fed7aa',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    color: 'white',
                    marginBottom: '16px',
                    backgroundColor: getCategoryColor(result.element.category) === 'bg-red-500' ? '#ef4444' :
                                    getCategoryColor(result.element.category) === 'bg-blue-500' ? '#3b82f6' :
                                    getCategoryColor(result.element.category) === 'bg-green-500' ? '#22c55e' :
                                    getCategoryColor(result.element.category) === 'bg-purple-500' ? '#a855f7' :
                                    getCategoryColor(result.element.category) === 'bg-yellow-500' ? '#eab308' :
                                    getCategoryColor(result.element.category) === 'bg-pink-500' ? '#ec4899' :
                                    getCategoryColor(result.element.category) === 'bg-orange-500' ? '#f97316' :
                                    getCategoryColor(result.element.category) === 'bg-teal-500' ? '#14b8a6' :
                                    getCategoryColor(result.element.category) === 'bg-indigo-500' ? '#6366f1' : '#6b7280',
                  }}
                >
                  {getCategoryNameKo(result.element.category)}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '70px', fontWeight: 'bold', color: '#1f2937' }}>{result.element.symbol}</span>
                </div>

                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px', letterSpacing: '-0.025em' }}>
                  {lang === 'ko' ? result.element.nameKo : result.element.name}
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
                  {lang === 'ko' ? result.element.name : result.element.nameKo} • {t.atomicNumber} {result.element.number}
                </p>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 247, 237, 0.5)',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '16px',
                    border: '1px solid #fed7aa',
                  }}
                >
                  <p style={{ color: '#4b5563', lineHeight: '1.625', textAlign: 'left', fontSize: '14px' }}>
                    {result.element.description}
                  </p>
                </div>

                <div style={{ color: '#6b7280', fontSize: '14px' }}>
                  {t.matchScore}: <span style={{ color: '#f97316', fontWeight: 'bold' }}>{result.score}%</span>
                </div>
              </div>

              {/* Compatibility */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {/* Good Match */}
                <div
                  style={{
                    backgroundColor: 'rgba(236, 253, 245, 0.8)',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #a7f3d0',
                  }}
                >
                  <h3 style={{ color: '#059669', fontWeight: '500', marginBottom: '12px', textAlign: 'center', fontSize: '14px' }}>💚 {t.goodMatch}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {result.goodMatches.map(el => (
                      <div
                        key={el.number}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          borderRadius: '12px',
                          padding: '8px',
                          textAlign: 'center',
                          border: '1px solid #d1fae5',
                        }}
                      >
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#374151' }}>{el.symbol}</span>
                        <p style={{ color: '#059669', fontSize: '12px' }}>{lang === 'ko' ? el.nameKo : el.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bad Match */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 241, 242, 0.8)',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #fecdd3',
                  }}
                >
                  <h3 style={{ color: '#f43f5e', fontWeight: '500', marginBottom: '12px', textAlign: 'center', fontSize: '14px' }}>💔 {t.badMatch}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {result.badMatches.map(el => (
                      <div
                        key={el.number}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          borderRadius: '12px',
                          padding: '8px',
                          textAlign: 'center',
                          border: '1px solid #ffe4e6',
                        }}
                      >
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#374151' }}>{el.symbol}</span>
                        <p style={{ color: '#f43f5e', fontSize: '12px' }}>{lang === 'ko' ? el.nameKo : el.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* End Capture Area */}

            {/* Extended Info - Using shared components */}
            {(() => {
              const extras = getElementExtras(result.element.symbol);
              return (
                <div className="space-y-4 mt-4">
                  <TraitsChart traits={result.element.traits} traitNames={traitNames} />
                  <HistorySection history={extras.history} />
                  <UsesSection uses={extras.uses} />
                  <FunFactsSection funFacts={extras.funFacts} />
                </div>
              );
            })()}

            <div className="mt-4">
              <CompatibilitySection goodMatches={result.goodMatches} badMatches={result.badMatches} lang={lang} />
            </div>

            <div className="mt-4">
              <SameCategorySection
                elements={elements.filter(el => el.category === result.element.category && el.symbol !== result.element.symbol)}
                categoryName={getCategoryNameKo(result.element.category)}
                currentSymbol={result.element.symbol}
                lang={lang}
                maxDisplay={8}
              />
            </div>

            {/* Posts Preview */}
            {(() => {
              const posts = getPostsBySymbol(result.element.symbol);
              if (posts.length === 0) return null;
              return (
                <div className="mt-4">
                  <PostsPreview symbol={result.element.symbol} elementNameKo={lang === 'ko' ? result.element.nameKo : result.element.name} posts={posts} />
                </div>
              );
            })()}

            {/* Element Encyclopedia Button */}
            <Link
              href="/elements"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-bold text-lg text-center hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mb-4"
            >
              {lang === 'ko' ? '🧪 전체 원소 도감 보기' : '🧪 View All Elements'}
            </Link>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSaveImage}
                className="w-full py-4 rounded-2xl bg-white/70 hover:bg-white border border-orange-200 hover:border-orange-300 text-gray-600 font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                📷 {t.saveAsImage}
              </button>
              <button
                onClick={handleShare}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-lg hover:from-orange-500 hover:to-rose-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.shareResult}
              </button>
              <button
                onClick={handleRestart}
                className="w-full py-4 rounded-2xl bg-white/70 hover:bg-white border border-orange-200 hover:border-orange-300 text-gray-600 font-medium transition-all duration-200"
              >
                {t.restart}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-xs">
          <p>{t.copyright}</p>
        </footer>
      </div>
    </div>
  );
}
