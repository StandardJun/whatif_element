import type { Language } from './translations';

export interface QuestionOption {
  value: number;
  label: { ko: string; en: string };
}

export interface Question {
  id: number;
  text: { ko: string; en: string };
  dimension: 'activity' | 'sociability' | 'stability' | 'sensitivity' | 'originality';
  options: QuestionOption[];
}

export const questions: Question[] = [
  // 활동성 (Activity) - 2문항
  {
    id: 1,
    text: {
      ko: "갑자기 친구가 '지금 바로 한강 가자!'고 하면?",
      en: "Your friend suddenly says 'Let's go to the park right now!' What do you do?"
    },
    dimension: "activity",
    options: [
      { value: 5, label: { ko: "신발 신고 나간다 🏃", en: "Already putting on my shoes 🏃" } },
      { value: 4, label: { ko: "일단 긍정적으로 생각해본다", en: "Sounds like a good idea" } },
      { value: 3, label: { ko: "뭐... 상황 봐서?", en: "Hmm... depends on the situation" } },
      { value: 2, label: { ko: "오늘은 좀 그런데...", en: "Maybe not today..." } },
      { value: 1, label: { ko: "난 이불 밖은 위험해 🛋️", en: "Outside is dangerous 🛋️" } }
    ]
  },
  {
    id: 2,
    text: {
      ko: "배터리가 5%일 때, 나는 아직 한참 남았다고 느끼는 편이다",
      en: "When your phone battery is at 5%, do you feel like there's still plenty left?"
    },
    dimension: "activity",
    options: [
      { value: 5, label: { ko: "5%면 충분하지! 🔋", en: "5% is plenty! 🔋" } },
      { value: 4, label: { ko: "아직 쓸 만해", en: "Still usable" } },
      { value: 3, label: { ko: "은근 불안한데...", en: "Getting a bit anxious..." } },
      { value: 2, label: { ko: "충전기 찾아야 해", en: "Need to find a charger" } },
      { value: 1, label: { ko: "이미 저전력 모드 ON 🆘", en: "Low power mode already ON 🆘" } }
    ]
  },

  // 사교성 (Sociability) - 2문항
  {
    id: 3,
    text: {
      ko: "엘리베이터에서 모르는 사람과 눈이 마주치면?",
      en: "When you make eye contact with a stranger in an elevator?"
    },
    dimension: "sociability",
    options: [
      { value: 5, label: { ko: "먼저 인사하고 말 건다 👋", en: "Say hi and start chatting 👋" } },
      { value: 4, label: { ko: "미소 정도는 짓는다", en: "Give a friendly smile" } },
      { value: 3, label: { ko: "그냥 고개만 끄덕", en: "Just a quick nod" } },
      { value: 2, label: { ko: "폰을 꺼내든다", en: "Pull out my phone" } },
      { value: 1, label: { ko: "층수 버튼만 쳐다본다 🔢", en: "Stare at the floor buttons 🔢" } }
    ]
  },
  {
    id: 4,
    text: {
      ko: "단체 카톡방에서 나는 주로...",
      en: "In a group chat, I usually..."
    },
    dimension: "sociability",
    options: [
      { value: 5, label: { ko: "대화를 이끈다 💬", en: "Lead the conversation 💬" } },
      { value: 4, label: { ko: "적극적으로 참여하는 편", en: "Actively participate" } },
      { value: 3, label: { ko: "가끔 리액션은 한다", en: "React occasionally" } },
      { value: 2, label: { ko: "읽기만 한다 (읽씹 아님)", en: "Just read (not ignoring!)" } },
      { value: 1, label: { ko: "알림 꺼놓음 🔕", en: "Notifications off 🔕" } }
    ]
  },

  // 안정성 (Stability) - 2문항
  {
    id: 5,
    text: {
      ko: "여행 갈 때 숙소와 일정을 미리 다 정해놓는 편이다",
      en: "When traveling, do you plan everything in advance?"
    },
    dimension: "stability",
    options: [
      { value: 5, label: { ko: "분 단위 계획표 완성 📋", en: "Minute-by-minute itinerary 📋" } },
      { value: 4, label: { ko: "큰 틀은 짜놓는다", en: "Have a general plan" } },
      { value: 3, label: { ko: "숙소만 예약", en: "Just book accommodation" } },
      { value: 2, label: { ko: "대충 방향만 정함", en: "Roughly know the direction" } },
      { value: 1, label: { ko: "그날 기분 따라 움직인다 🎲", en: "Go with the flow 🎲" } }
    ]
  },
  {
    id: 6,
    text: {
      ko: "자주 가는 식당에 도착! 메뉴판을 보면?",
      en: "At your favorite restaurant, looking at the menu..."
    },
    dimension: "stability",
    options: [
      { value: 5, label: { ko: "늘 먹던 그 메뉴 ✨", en: "My usual order ✨" } },
      { value: 4, label: { ko: "80%는 단골 메뉴", en: "80% of the time, my regular" } },
      { value: 3, label: { ko: "기분 따라 다르다", en: "Depends on my mood" } },
      { value: 2, label: { ko: "새 메뉴 위주로 본다", en: "Check out new items" } },
      { value: 1, label: { ko: "전부 다 먹어봐야지 🍽️", en: "Gotta try everything 🍽️" } }
    ]
  },

  // 감성 (Sensitivity) - 2문항
  {
    id: 7,
    text: {
      ko: "유기견 보호소 영상을 보면?",
      en: "When watching animal shelter videos?"
    },
    dimension: "sensitivity",
    options: [
      { value: 5, label: { ko: "눈물 줄줄 😭", en: "Crying my eyes out 😭" } },
      { value: 4, label: { ko: "마음이 많이 아프다", en: "Feeling really sad" } },
      { value: 3, label: { ko: "안타깝긴 하다", en: "Feel a bit sorry" } },
      { value: 2, label: { ko: "그렇구나... 하고 넘김", en: "I see... move on" } },
      { value: 1, label: { ko: "담담하게 본다", en: "Watch calmly" } }
    ]
  },
  {
    id: 8,
    text: {
      ko: "친구가 '나 괜찮아'라고 하면?",
      en: "When your friend says 'I'm fine'..."
    },
    dimension: "sensitivity",
    options: [
      { value: 5, label: { ko: "표정만 봐도 다 안다 👀", en: "I can tell just by looking 👀" } },
      { value: 4, label: { ko: "뭔가 이상함을 느낀다", en: "Sense something's off" } },
      { value: 3, label: { ko: "말 그대로 받아들일 때도", en: "Sometimes take it literally" } },
      { value: 2, label: { ko: "괜찮다니까 괜찮겠지", en: "If they say so, must be fine" } },
      { value: 1, label: { ko: "아 그래? 다행이다", en: "Oh okay, good to hear" } }
    ]
  },

  // 독창성 (Originality) - 2문항
  {
    id: 9,
    text: {
      ko: "이케아 가구가 도착했다! 조립을 시작하면?",
      en: "IKEA furniture has arrived! When assembling..."
    },
    dimension: "originality",
    options: [
      { value: 5, label: { ko: "설명서? 그게 뭔데 🔧", en: "Manual? What's that 🔧" } },
      { value: 4, label: { ko: "일단 해보고 막히면 본다", en: "Try first, check if stuck" } },
      { value: 3, label: { ko: "대충 훑어보고 시작", en: "Quick skim then start" } },
      { value: 2, label: { ko: "설명서 따라 차근차근", en: "Follow instructions step by step" } },
      { value: 1, label: { ko: "영상 보면서 따라한다 📱", en: "Watch a tutorial video 📱" } }
    ]
  },
  {
    id: 10,
    text: {
      ko: "친구들과 가위바위보를 할 때",
      en: "When playing rock-paper-scissors with friends"
    },
    dimension: "originality",
    options: [
      { value: 5, label: { ko: "새로운 규칙을 제안한다 ✨", en: "Suggest new rules ✨" } },
      { value: 4, label: { ko: "변형 게임도 좋아한다", en: "Like variations too" } },
      { value: 3, label: { ko: "제안하면 따라는 함", en: "Go along with suggestions" } },
      { value: 2, label: { ko: "그냥 원래 룰이 좋다", en: "Prefer original rules" } },
      { value: 1, label: { ko: "가위바위보는 가위바위보지", en: "Classic is classic" } }
    ]
  }
];

// Helper function to get question text in specific language
export function getQuestionText(question: Question, lang: Language): string {
  return question.text[lang];
}

// Helper function to get option label in specific language
export function getOptionLabel(option: QuestionOption, lang: Language): string {
  return option.label[lang];
}
