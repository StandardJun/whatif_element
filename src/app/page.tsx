'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { questions, getQuestionText, getOptionLabel } from '@/data/questions';
import { translations, type Language } from '@/data/translations';
import { findMatchingElement, getCategoryNameKo } from '@/utils/matching';
import type { MatchResult } from '@/utils/matching';
import { getElementExtras, traitNames } from '@/data/elementExtras';
import { elements } from '@/data/elements';
import { HistorySection, UsesSection, FunFactsSection, SameCategorySection, PostsPreview } from '@/components/ElementSections';
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
  const [showScoreInfo, setShowScoreInfo] = useState(false);

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
        onclone: (_clonedDoc: Document, clonedElement: HTMLElement) => {
          clonedElement.querySelectorAll('p, h1, h2, h3, h4, span, div').forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (!htmlEl.querySelector('p, h1, h2, h3, h4, span')) {
              htmlEl.style.transform = 'translateY(-1px)';
            }
          });
        },
      });

      const filename = `manyak-${result?.element.symbol || 'result'}.png`;

      // 모바일 감지
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      const isMobile = isIOS || isAndroid;

      if (isMobile) {
        // 모바일: blob을 생성하여 새 탭에서 열기 (길게 눌러 저장)
        canvas.toBlob((blob) => {
          if (!blob) {
            alert(lang === 'ko' ? '이미지 저장에 실패했습니다.' : 'Failed to save image.');
            return;
          }

          const blobUrl = URL.createObjectURL(blob);
          const newWindow = window.open(blobUrl, '_blank');

          if (!newWindow) {
            // 팝업 차단 시 fallback: dataURL 사용
            const dataUrl = canvas.toDataURL('image/png');
            const fallbackWindow = window.open();
            if (fallbackWindow) {
              fallbackWindow.document.write(`<img src="${dataUrl}" style="max-width:100%; height:auto;">`);
            } else {
              alert(lang === 'ko' ? '팝업 차단을 해제해주세요.' : 'Please allow popups.');
            }
          }

          // 메모리 정리 (5초 후)
          setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
        }, 'image/png');
      } else {
        // 데스크톱: 일반 다운로드
        const dataUrl = canvas.toDataURL('image/png');
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
                <p style={{ color: '#6b7280', margin: '0 0 8px 0', fontSize: '14px', lineHeight: '1.4' }}>{t.resultFor(userName)}</p>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', letterSpacing: '-0.025em', margin: 0, lineHeight: '1.3' }}>{t.yourElement}</h1>
              </div>

              {/* Main Result Card */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '24px',
                  padding: '32px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  border: '1px solid #fed7aa',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    lineHeight: '1.2',
                    color: 'white',
                    marginBottom: '16px',
                    backgroundColor: ({
                      'nonmetal': '#22c55e', 'noble-gas': '#a855f7', 'alkali-metal': '#ef4444',
                      'alkaline-earth': '#f97316', 'metalloid': '#14b8a6', 'post-transition': '#60a5fa',
                      'transition': '#2563eb', 'lanthanide': '#ec4899', 'actinide': '#e11d48', 'halogen': '#eab308',
                    } as Record<string, string>)[result.element.category] || '#6b7280',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}
                >
                  {getCategoryNameKo(result.element.category)}
                </div>

                <div style={{ marginBottom: '16px', lineHeight: '1' }}>
                  <span style={{ fontSize: '70px', fontWeight: 'bold', color: '#1f2937', lineHeight: '1' }}>{result.element.symbol}</span>
                </div>

                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0', letterSpacing: '-0.025em', lineHeight: '1.2' }}>
                  {lang === 'ko' ? result.element.nameKo : result.element.name}
                </h2>
                <p style={{ color: '#6b7280', margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.4' }}>
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
                  <p style={{ color: '#4b5563', lineHeight: '1.625', textAlign: 'left', fontSize: '14px', margin: 0 }}>
                    {result.element.description}
                  </p>
                </div>

                <div style={{ color: '#6b7280', fontSize: '14px', position: 'relative', textAlign: 'center', lineHeight: '18px' }}>
                  <span style={{ lineHeight: '18px', verticalAlign: 'middle' }}>{t.matchScore}: <span style={{ color: '#f97316', fontWeight: 'bold' }}>{result.score}%</span></span>
                  {' '}
                  <span
                    onClick={() => setShowScoreInfo(prev => !prev)}
                    onMouseEnter={() => setShowScoreInfo(true)}
                    onMouseLeave={() => setShowScoreInfo(false)}
                    style={{
                      display: 'inline-block',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: '1.5px solid #9ca3af',
                      color: '#9ca3af',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      userSelect: 'none' as const,
                      lineHeight: '16px',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}
                  >
                    i
                  </span>
                  {showScoreInfo && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '28px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1f2937',
                        color: '#f3f4f6',
                        fontSize: '12px',
                        lineHeight: '1.5',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        width: '260px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 50,
                        textAlign: 'left',
                      }}
                    >
                      {lang === 'ko'
                        ? '5가지 성격 차원(활동성, 사교성, 안정성, 감성, 독창성)에서 나와 이 원소가 얼마나 닮았는지를 나타내요. 100%에 가까울수록 찰떡궁합! 실제로는 대부분 70~95% 사이에서 나와요.'
                        : 'Shows how similar you are to this element across 5 personality dimensions. Closer to 100% = better match! Most results fall between 70-95%.'}
                    </div>
                  )}
                </div>
              </div>

              {/* Traits Chart - inline CSS for capture */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  marginBottom: '12px',
                  border: '1px solid #fed7aa',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 14px 0', lineHeight: '1.3' }}>
                  {lang === 'ko' ? '성격 지표' : 'Personality Traits'}
                </h3>
                <div>
                  {Object.entries(result.element.traits).map(([key, value], idx) => (
                    <div key={key} style={{ display: 'table', width: '100%', marginBottom: idx < Object.keys(result.element.traits).length - 1 ? '10px' : '0' }}>
                      <div style={{ display: 'table-cell', width: '72px', verticalAlign: 'middle', paddingRight: '12px' }}>
                        <span style={{ color: '#4b5563', fontSize: '13px', lineHeight: '1.3' }}>
                          {traitNames[key]}
                        </span>
                      </div>
                      <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                        <div style={{ height: '10px', backgroundColor: '#fef3c7', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${(value / 5) * 100}%`,
                            background: 'linear-gradient(to right, #fb923c, #fb7185)',
                            borderRadius: '9999px',
                          }} />
                        </div>
                      </div>
                      <div style={{ display: 'table-cell', width: '40px', verticalAlign: 'middle', paddingLeft: '12px', textAlign: 'right' }}>
                        <span style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.3' }}>
                          {value}/5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatibility - inline CSS for capture */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Good Matches */}
                <div style={{
                  backgroundColor: 'rgba(236, 253, 245, 0.8)',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #a7f3d0',
                }}>
                  <h3 style={{ color: '#047857', fontWeight: 'bold', fontSize: '14px', margin: '0 0 10px 0', lineHeight: '1.3' }}>
                    {lang === 'ko' ? '💚 잘 맞는 궁합' : '💚 Good Match'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {result.goodMatches.map((el) => (
                      <Link key={el.symbol} href={`/elements/${el.symbol}`} style={{
                        display: 'block',
                        backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '10px',
                        padding: '10px 12px', border: '1px solid #d1fae5',
                        textDecoration: 'none',
                      }}>
                        <div style={{ display: 'table', width: '100%' }}>
                          <div style={{ display: 'table-cell', width: '40px', verticalAlign: 'middle', paddingRight: '10px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#374151', display: 'block', textAlign: 'center', lineHeight: '1' }}>
                              {el.symbol}
                            </span>
                          </div>
                          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                            <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '13px', lineHeight: '1.3', marginBottom: '1px' }}>{el.nameKo}</div>
                            <div style={{ color: '#059669', fontSize: '11px', lineHeight: '1.2' }}>{el.name}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bad Matches */}
                <div style={{
                  backgroundColor: 'rgba(255, 241, 242, 0.8)',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #fecdd3',
                }}>
                  <h3 style={{ color: '#e11d48', fontWeight: 'bold', fontSize: '14px', margin: '0 0 10px 0', lineHeight: '1.3' }}>
                    {lang === 'ko' ? '💔 안 맞는 궁합' : '💔 Bad Match'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {result.badMatches.map((el) => (
                      <Link key={el.symbol} href={`/elements/${el.symbol}`} style={{
                        display: 'block',
                        backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '10px',
                        padding: '10px 12px', border: '1px solid #ffe4e6',
                        textDecoration: 'none',
                      }}>
                        <div style={{ display: 'table', width: '100%' }}>
                          <div style={{ display: 'table-cell', width: '40px', verticalAlign: 'middle', paddingRight: '10px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#374151', display: 'block', textAlign: 'center', lineHeight: '1' }}>
                              {el.symbol}
                            </span>
                          </div>
                          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                            <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '13px', lineHeight: '1.3', marginBottom: '1px' }}>{el.nameKo}</div>
                            <div style={{ color: '#f43f5e', fontSize: '11px', lineHeight: '1.2' }}>{el.name}</div>
                          </div>
                        </div>
                      </Link>
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
                <div className="space-y-6 mt-6">
                  <HistorySection history={extras.history} />
                  <UsesSection uses={extras.uses} />
                  <FunFactsSection funFacts={extras.funFacts} />
                </div>
              );
            })()}

            <div className="mt-8">
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
                <div className="mt-8">
                  <PostsPreview symbol={result.element.symbol} elementNameKo={lang === 'ko' ? result.element.nameKo : result.element.name} posts={posts} />
                </div>
              );
            })()}

            {/* Element Encyclopedia Button */}
            <Link
              href="/elements"
              className="block w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-bold text-lg text-center hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mb-4"
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
      </div>
    </div>
  );
}
