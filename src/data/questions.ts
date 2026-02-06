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
      ko: "주말 아침, 알람 없이 일찍 눈이 떠졌다!",
      en: "Saturday morning, you wake up early with no alarm!"
    },
    dimension: "activity",
    options: [
      { value: 5, label: { ko: "바로 밖으로 뛰쳐나간다 🌅", en: "Head out immediately 🌅" } },
      { value: 4, label: { ko: "오늘 뭐 하지? 일단 준비!", en: "What to do today? Let's get ready!" } },
      { value: 3, label: { ko: "느긋하게 일어나서 생각해본다", en: "Get up slowly and think about it" } },
      { value: 2, label: { ko: "폰 보다가 한 시간 눌러있음", en: "End up scrolling in bed for an hour" } },
      { value: 1, label: { ko: "다시 눈 감는다. 주말인데 🛌", en: "Close my eyes again. It's the weekend 🛌" } }
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
      ko: "매일 가는 출근·등교 길, 나의 루틴은?",
      en: "Your daily commute routine looks like..."
    },
    dimension: "stability",
    options: [
      { value: 5, label: { ko: "같은 시간, 같은 경로, 같은 음악 🎧", en: "Same time, same route, same playlist 🎧" } },
      { value: 4, label: { ko: "경로는 정해져 있고, 나머진 유동적", en: "Fixed route, rest is flexible" } },
      { value: 3, label: { ko: "대체로 비슷하지만 가끔 변화를 줌", en: "Usually similar, sometimes switch it up" } },
      { value: 2, label: { ko: "그때그때 빠른 길로 간다", en: "Take whatever route is fastest" } },
      { value: 1, label: { ko: "매일 다른 길이 재밌다 🗺️", en: "A different path every day is fun 🗺️" } }
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
      { value: 2, label: { ko: "잠깐 생각하고 넘긴다", en: "Think about it briefly, then move on" } },
      { value: 1, label: { ko: "담담하게 본다", en: "Watch calmly" } }
    ]
  },
  {
    id: 8,
    text: {
      ko: "친구가 웃으면서 '나 괜찮아'라고 하는데, 눈이 안 웃고 있다",
      en: "Your friend says 'I'm fine' with a smile, but their eyes aren't smiling"
    },
    dimension: "sensitivity",
    options: [
      { value: 5, label: { ko: "바로 알아채고 조용히 옆에 있어준다 🤝", en: "Notice right away and quietly stay by their side 🤝" } },
      { value: 4, label: { ko: "뭔가 이상해서 나중에 따로 연락한다", en: "Something feels off, text them later" } },
      { value: 3, label: { ko: "신경은 쓰이지만 먼저 물어보긴 어렵다", en: "It bothers me but hard to ask first" } },
      { value: 2, label: { ko: "좀 이상하다 싶다가도 금방 잊는다", en: "Seems a bit odd but I quickly forget" } },
      { value: 1, label: { ko: "괜찮다는데 뭘 😐", en: "They said they're fine, so... 😐" } }
    ]
  },

  // 독창성 (Originality) - 2문항
  {
    id: 9,
    text: {
      ko: "조별 과제에서 발표 방식을 정할 때",
      en: "When deciding the presentation format for a group project"
    },
    dimension: "originality",
    options: [
      { value: 5, label: { ko: "아무도 안 해본 형식을 제안한다 💡", en: "Propose a format nobody's tried before 💡" } },
      { value: 4, label: { ko: "기존 형식에 새로운 요소를 섞는다", en: "Mix new elements into a standard format" } },
      { value: 3, label: { ko: "참신한 아이디어가 있으면 따라간다", en: "Go along if someone has a fresh idea" } },
      { value: 2, label: { ko: "검증된 방식이 안전하다고 생각한다", en: "Think proven methods are safer" } },
      { value: 1, label: { ko: "PPT 틀 그대로 쓰면 되지 📊", en: "Just use the standard PPT template 📊" } }
    ]
  },
  {
    id: 10,
    text: {
      ko: "라면을 끓이는데 냉장고에 예상 밖의 재료가 있다!",
      en: "You're making ramen and find unexpected ingredients in the fridge!"
    },
    dimension: "originality",
    options: [
      { value: 5, label: { ko: "퓨전 창작 라면 탄생 🍜", en: "Fusion experimental ramen is born 🍜" } },
      { value: 4, label: { ko: "하나쯤은 넣어본다, 실패해도 OK", en: "Toss one in, it's okay if it fails" } },
      { value: 3, label: { ko: "어울릴 것 같은 것만 조심스럽게", en: "Carefully add only what seems to fit" } },
      { value: 2, label: { ko: "검색해보고 괜찮으면 넣는다", en: "Search first, add if reviews are good" } },
      { value: 1, label: { ko: "레시피대로가 맛있다 📖", en: "The original recipe is best 📖" } }
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
