'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { questions, getQuestionText, getOptionLabel } from '@/data/questions';
import { translations, type Language } from '@/data/translations';
import { findMatchingElement, getCategoryNameKo, getCategoryColor } from '@/utils/matching';
import type { MatchResult } from '@/utils/matching';

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

      // Blob으로 변환
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const filename = `manyak-${result?.element.symbol || 'result'}.png`;

        // iOS Safari 체크
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (isIOS) {
          // iOS에서는 새 탭에서 이미지 열기 (길게 눌러서 저장)
          window.open(url, '_blank');
        } else {
          // 데스크톱 및 Android
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        // 메모리 해제
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
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

            <p className="mt-6 text-gray-400 text-sm">
              {t.questionCount}
            </p>
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
            {/* Capture Area */}
            <div ref={resultRef} className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 rounded-3xl">
              <div className="text-center mb-6">
                <p className="text-gray-500 mb-2">{t.resultFor(userName)}</p>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{t.yourElement}</h1>
              </div>

              {/* Main Result Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 mb-6 text-center border border-orange-100 shadow-lg">
              <div className={`inline-block px-3 py-1 rounded-full text-xs text-white mb-4 ${getCategoryColor(result.element.category)}`}>
                {getCategoryNameKo(result.element.category)}
              </div>

              <div className="mb-4">
                <span className="text-7xl font-bold text-gray-800">{result.element.symbol}</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">
                {lang === 'ko' ? result.element.nameKo : result.element.name}
              </h2>
              <p className="text-gray-500 mb-4">
                {lang === 'ko' ? result.element.name : result.element.nameKo} • {t.atomicNumber} {result.element.number}
              </p>

              <div className="bg-orange-50/50 rounded-2xl p-4 mb-4 border border-orange-100">
                <p className="text-gray-600 leading-relaxed text-left text-sm">
                  {result.element.description}
                </p>
              </div>

              <div className="text-gray-500 mb-4">
                {t.matchScore}: <span className="text-orange-500 font-bold">{result.score}%</span>
              </div>

              <Link
                href={`/elements/${result.element.symbol}`}
                className="inline-block text-orange-500 hover:text-orange-600 font-medium text-sm underline underline-offset-4 hover:no-underline transition-all"
              >
                {t.learnMore} →
              </Link>
            </div>

            {/* Compatibility */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Good Match */}
              <div className="bg-emerald-50/80 backdrop-blur-md rounded-2xl p-4 border border-emerald-200">
                <h3 className="text-emerald-600 font-medium mb-3 text-center text-sm">💚 {t.goodMatch}</h3>
                <div className="space-y-2">
                  {result.goodMatches.map(el => (
                    <div key={el.number} className="bg-white/70 rounded-xl p-2 text-center border border-emerald-100">
                      <span className="text-2xl font-bold text-gray-700">{el.symbol}</span>
                      <p className="text-emerald-600 text-xs">{lang === 'ko' ? el.nameKo : el.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bad Match */}
              <div className="bg-rose-50/80 backdrop-blur-md rounded-2xl p-4 border border-rose-200">
                <h3 className="text-rose-500 font-medium mb-3 text-center text-sm">💔 {t.badMatch}</h3>
                <div className="space-y-2">
                  {result.badMatches.map(el => (
                    <div key={el.number} className="bg-white/70 rounded-xl p-2 text-center border border-rose-100">
                      <span className="text-2xl font-bold text-gray-700">{el.symbol}</span>
                      <p className="text-rose-500 text-xs">{lang === 'ko' ? el.nameKo : el.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>
            {/* End Capture Area */}

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
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
