export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    // Language selection
    selectLanguage: '언어를 선택하세요',

    // Intro
    title: '내가 원소라면?',
    subtitle: '118개의 원소 중 나와 가장 닮은 원소는?',
    namePlaceholder: '이름을 입력하세요',
    startButton: '테스트 시작하기',
    questionCount: '10개의 질문 • 약 2분 소요',

    // Quiz
    questionOf: (current: number, total: number) => `질문 ${current} / ${total}`,
    back: '이전',

    // Result
    resultFor: (name: string) => `${name}님의 결과`,
    yourElement: '당신과 가장 닮은 원소는...',
    atomicNumber: '원자번호',
    matchScore: '매칭 점수',
    learnMore: '이 원소에 대해 더 알아보기',
    goodMatch: '잘 맞는 궁합',
    badMatch: '안 맞는 궁합',
    shareResult: '결과 공유하기',
    restart: '다시 테스트하기',
    linkCopied: '링크가 복사되었습니다!',
    shareText: (element: string, symbol: string) =>
      `나는 ${element}(${symbol}) 같은 사람이래요! - 내가 원소라면?`,

    // Footer
    copyright: '© 2026 내가 원소라면? All rights reserved.',
  },
  en: {
    // Language selection
    selectLanguage: 'Select Language',

    // Intro
    title: 'What Element Are You?',
    subtitle: 'Which of the 118 elements matches your personality?',
    namePlaceholder: 'Enter your name',
    startButton: 'Start Test',
    questionCount: '10 questions • About 2 minutes',

    // Quiz
    questionOf: (current: number, total: number) => `Question ${current} / ${total}`,
    back: 'Back',

    // Result
    resultFor: (name: string) => `${name}'s Result`,
    yourElement: 'The element that matches you most is...',
    atomicNumber: 'Atomic Number',
    matchScore: 'Match Score',
    learnMore: 'Learn more about this element',
    goodMatch: 'Good Match',
    badMatch: 'Bad Match',
    shareResult: 'Share Result',
    restart: 'Try Again',
    linkCopied: 'Link copied!',
    shareText: (element: string, symbol: string) =>
      `I'm like ${element}(${symbol})! - What Element Are You?`,

    // Footer
    copyright: '© 2026 What Element Are You? All rights reserved.',
  }
} as const;

export type Translations = typeof translations.ko;
