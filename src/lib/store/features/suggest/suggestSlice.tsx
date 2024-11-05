import { createSlice } from "@reduxjs/toolkit";

const fakeSuggestionData = [
  {
    label: "Mathematics",
    content: "Master math concepts and ace your exams.",
    icon: "📘",
    category: "mathematics",
    assistantId: "asst_wu5H6HvbW3o0qLw443ojVx6V",
  },
  {
    label: "Physical Sciences",
    content: "Conquer science topics and excel in exams.",
    icon: "🧪",
    category: "physical-sciences",
    assistantId: "asst_mdg1VEgSqxVOKlHk6JlRXzTN",
  },
  {
    label: "English",
    content: "Enhance your English skills and boost your grades.",
    icon: "📚",
    category: "english",
    assistantId: "asst_vaBKqqnSfyus1suFdb8BGqvK",
  },
  {
    label: "Accounting",
    content: "Ace accounting principles and top your tests.",
    icon: "📊",
    category: "accounting",
    assistantId: "asst_accounting_id",
  },
];


const mockData = [
  {
    title: "📘 Mathematics",
    text: "Master math concepts and ace your exams.",
    category: "mathematics",
    assistantId: "asst_wu5H6HvbW3o0qLw443ojVx6V",
    suggest: [
      {
        label: "Practice Algebra Questions",
        content: "Can you provide algebra questions from past exams?",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Geometry Focus",
        content: "Help me practice geometry problems from past papers.",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Grade My Calculations",
        content: "Can you grade my solutions to these math problems?",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Improve Problem Solving",
        content: "How can I improve my approach to solving math problems?",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my math solutions and give feedback?",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for my math exam.",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my solution compare to the marking guidelines?",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Targeted Tutoring",
        content: "Which math topics should I focus on to boost my score?",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Retake Practice Problems",
        content: "Can I try another set of math problems and get feedback?",
        icon: "📘",
        category: "mathematics",
      },
      {
        label: "Understanding Formulas",
        content: "Can you explain key math formulas like the quadratic equation?",
        icon: "📘",
        category: "mathematics",
      },
    ],
  },
  {
    title: "🧪 Physical Sciences",
    text: "Conquer science topics and excel in exams.",
    category: "physical-sciences",
    assistantId: "asst_mdg1VEgSqxVOKlHk6JlRXzTN",
    suggest: [
      {
        label: "Practice Physics Questions",
        content: "Can you provide physics questions from past exams?",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Chemistry Focus",
        content: "Help me practice chemistry problems from past papers.",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Grade My Responses",
        content: "Can you grade my answers to these science questions?",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Improve Scientific Explanations",
        content: "How can I improve my explanations in science answers?",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my science answers and provide feedback?",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Physical Sciences.",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to the marking guidelines?",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Understanding Scientific Concepts",
        content: "Can you explain key concepts like Newton's laws?",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Targeted Tutoring",
        content: "Which science topics should I focus on to boost my grade?",
        icon: "🧪",
        category: "physical-sciences",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I try another set of science questions and get feedback?",
        icon: "🧪",
        category: "physical-sciences",
      },
    ],
  },
  {
    title: "📚 English",
    text: "Enhance your English skills and boost your grades.",
    category: "english",
    assistantId: "asst_vaBKqqnSfyus1suFdb8BGqvK",
    suggest: [
      {
        label: "Practice Essay Writing",
        content: "Can you provide essay prompts from past English exams?",
        icon: "📚",
        category: "english",
      },
      {
        label: "Comprehension Focus",
        content: "Help me practice comprehension questions from past papers.",
        icon: "📚",
        category: "english",
      },
      {
        label: "Grade My Essay",
        content: "Can you grade my essay and give feedback?",
        icon: "📚",
        category: "english",
      },
      {
        label: "Improve Writing Skills",
        content: "How can I improve my essay writing for exams?",
        icon: "📚",
        category: "english",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for my English exam.",
        icon: "📚",
        category: "english",
      },
      {
        label: "Review Marking Criteria",
        content: "How does my essay compare to the marking criteria?",
        icon: "📚",
        category: "english",
      },
      {
        label: "Targeted Tutoring",
        content: "Which English topics should I focus on to improve my score?",
        icon: "📚",
        category: "english",
      },
      {
        label: "Retake Practice Essays",
        content: "Can I try another essay prompt and get feedback?",
        icon: "📚",
        category: "english",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my English answers and provide suggestions?",
        icon: "📚",
        category: "english",
      },
      {
        label: "Understanding Literary Devices",
        content: "Can you explain literary devices like metaphors and symbolism?",
        icon: "📚",
        category: "english",
      },
    ],
  },
  {
    title: "💼 Economics",
    text: "Understand economics deeply and score high marks.",
    assistantId: "asst_stEGiVDTlMIeDM7XGiezPI28",
    suggest: [
      {
        label: "Practice Past Papers",
        content: "Can you provide questions from the 2020 Economics Paper 1?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Topic-Specific Practice",
        content: "Do you have past paper questions on supply and demand?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Grade My Answer",
        content: "Can you grade my response to this question?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Improve My Score",
        content: "How can I improve my answers on inflation topics?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my answer and give feedback?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Exam Prep Plan",
        content: "Can you help me create a study plan for Economics?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Review Marking Guidelines",
        content: "Can you show me how my answer compares to the marking guidelines?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Understanding Economic Terms",
        content: "Can you explain key economic terms like GDP and CPI?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Targeted Tutoring",
        content: "Which topics should I focus on to boost my grades?",
        icon: "📈",
        category: "economics",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I retry a question and get new feedback?",
        icon: "📈",
        category: "economics",
      },
    ],
  },
  {
    title: "📐 Mathematical Literacy",
    text: "Grasp math concepts and excel in exams.",
    category: "mathematical literacy",
    assistantId: "asst_wu5H6HvbW3o0qLw443ojVx6V",
    suggest: [
      {
        label: "Practice Statistics Questions",
        content: "Can you provide statistics questions from past exams?",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Finance Focus",
        content: "Help me practice financial math questions from past papers.",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Grade My Math Answer",
        content: "Can you grade my response to this math problem?",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Improve Problem Solving",
        content: "How can I improve my problem-solving in math literacy?",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my math literacy answers and provide feedback?",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Mathematical Literacy.",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my math answer compare to the marking guidelines?",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Targeted Tutoring",
        content: "Which math literacy topics should I focus on to improve my score?",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I try another math problem and get feedback?",
        icon: "📐",
        category: "maths-literacy",
      },
      {
        label: "Understanding Practical Math Concepts",
        content: "Can you explain practical concepts like interest calculations?",
        icon: "📐",
        category: "maths-literacy",
      },
    ],
  },
  {
    title: "📊 Accounting",
    text: "Ace accounting principles and top your tests.",
    suggest: [
      {
        label: "Practice Accounting Problems",
        content: "Can you provide accounting exercises on balance sheets?",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Financial Statement Analysis",
        content: "Help me analyze financial statements for exams.",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Grade My Accounting Solution",
        content: "Can you grade my accounting answers?",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Improve Accounting Skills",
        content: "How can I improve my accounting problem-solving?",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my accounting answers and provide feedback?",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Accounting.",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to the accounting guidelines?",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Understanding Financial Ratios",
        content: "Can you explain key financial ratios for analysis?",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Targeted Tutoring",
        content: "Which accounting topics should I focus on to boost my score?",
        icon: "📊",
        category: "accounting",
      },
      {
        label: "Retake Practice Problems",
        content: "Can I try another accounting problem and get feedback?",
        icon: "📊",
        category: "accounting",
      },
    ],
  },
  {
    title: "🌱 Life Sciences",
    text: "Master biology topics and crush your exams.",
    suggest: [
      {
        label: "Practice Biology Questions",
        content: "Can you provide biology questions from past exams?",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Genetics Focus",
        content: "Help me review genetics concepts for my biology test.",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Grade My Biology Responses",
        content: "Can you grade my biology exam answers?",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Improve Biology Understanding",
        content: "How can I improve my biology knowledge for exams?",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my biology answers and provide feedback?",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Life Sciences.",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my biology answer compare to the guidelines?",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Understanding Ecology Concepts",
        content: "Can you explain key concepts in ecology?",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Targeted Tutoring",
        content: "Which biology topics should I focus on to boost my grade?",
        icon: "🌱",
        category: "life-sciences",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I try another biology question and get feedback?",
        icon: "🌱",
        category: "life-sciences",
      },
    ],
  },
  {
    title: "💼 Business Studies",
    text: "Excel in business studies and ace every test.",
    suggest: [
      {
        label: "Business Case Studies",
        content: "Can you provide case studies to analyze for practice?",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Marketing Concepts",
        content: "Help me understand marketing strategies for my test.",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Grade My Business Answers",
        content: "Can you grade my responses to business studies questions?",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Improve Business Analysis",
        content: "How can I improve my business analysis skills?",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my business answers and provide feedback?",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Business Studies.",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to business guidelines?",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Understanding Economic Indicators",
        content: "Can you explain key economic indicators?",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Targeted Tutoring",
        content: "Which business topics should I focus on to boost my score?",
        icon: "💼",
        category: "business-studies",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I try another business question and get feedback?",
        icon: "💼",
        category: "business-studies",
      },
    ],
  },
  {
    title: "🌍 Geography",
    text: "Master geography topics and ace your exams.",
    suggest: [
      {
        label: "Geography Exam Questions",
        content: "Can you provide geography questions from past exams?",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Map Reading Practice",
        content: "Help me improve my map reading skills for the test.",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Grade My Geography Answers",
        content: "Can you grade my geography responses?",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Improve Geographical Knowledge",
        content: "How can I enhance my understanding of geographical concepts?",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my geography answers and provide feedback?",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Geography.",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to geography guidelines?",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Understanding Climate Zones",
        content: "Can you explain the different climate zones?",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Targeted Tutoring",
        content: "Which geography topics should I focus on to boost my score?",
        icon: "🌍",
        category: "geography",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I try another geography question and get feedback?",
        icon: "🌍",
        category: "geography",
      },
    ],
  },
];





interface SuggestState {
  suggest: any;
  suggests: any;
  focusSuggests: any;
}

const initialState: SuggestState = {
  suggest: fakeSuggestionData?.[0],
  suggests: fakeSuggestionData,
  focusSuggests: mockData,
};

export const suggestSlice = createSlice({
  name: "suggested",
  initialState,
  reducers: {
    setSuggests: (state, action) => {
      state.suggests = action.payload;
    },
    setSuggest: (state, action) => {
      state.suggest = action.payload;
    },
  },
});

export const { setSuggests, setSuggest } = suggestSlice.actions;

export default suggestSlice.reducer;
