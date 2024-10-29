import { createSlice } from "@reduxjs/toolkit";

const fakeSuggestionData = [
  {
    label: "Mathematics Update",
    content: "New exercises on calculus are now available for you to practice.",
    icon: "📐",
    category: "mathematics",
    assistantId: "asst_wu5H6HvbW3o0qLw443ojVx6V",
  },
  // {
  //   label: "Maths Literacy Tip",
  //   content: "Explore real-world examples to strengthen your financial math skills.",
  //   icon: "🧮",
  //   category: "maths-literacy",
  //   assistantId: "asst_wu5H6HvbW3o0qLw443ojVx6V",
  // },
  {
    label: "English Literature Insights",
    content: "Analyze Shakespeare's 'Hamlet' with a new guided walkthrough.",
    icon: "📚",
    category: "english",
    assistantId: "asst_vaBKqqnSfyus1suFdb8BGqvK",
  },
  {
    label: "Physics Experiment Idea",
    content: "Try a DIY project on Newton's laws with simple materials.",
    icon: "⚗️",
    category: "physical-sciences",
    assistantId: "asst_mdg1VEgSqxVOKlHk6JlRXzTN",
  },
  {
    label: "Economics Market Update",
    content: "Explore this week's trends in the stock market with a detailed report.",
    icon: "💹",
    category: "economics",
    assistantId: "asst_stEGiVDTlMIeDM7XGiezPI28",
  },
];


const mockData = [
  {
    title: "🗂️ Accounts",
    text: "Manage, track, and review accounts.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "🗂️",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "🗂️",
        category: "investment",
      },
    ],
  },
  {
    title: "🛍️ Spending",
    text: "Monitor and analyze spending habits.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "🛍️",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "🛍️",
        category: "investment",
      },
    ],
  },
  {
    title: "📊 Budgets",
    text: "Create and adjust financial budgets.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "📊",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "📊",
        category: "investment",
      },
    ],
  },
  {
    title: "🧑‍💼 Financial Advisor",
    text: "Expert guidance on financial strategies.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "🧑‍💼",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "🧑‍💼",
        category: "investment",
      },
    ],
  },
  {
    title: "💰 Cash Flow",
    text: "Ensure adequate funds for expenses.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "💰",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "💰",
        category: "investment",
      },
    ],
  },
  {
    title: "🎯 Goals",
    text: "Set and pursue financial targets.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "🎯",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "🎯",
        category: "investment",
      },
    ],
  },
  {
    title: "🛒 Financial Products",
    text: "Explore and compare financial offerings.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "🛒",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "🛒",
        category: "investment",
      },
    ],
  },
  {
    title: "📈 Net Worth",
    text: "Calculate and track total worth.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "📈",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "📈",
        category: "investment",
      },
    ],
  },
  {
    title: "🌤️ Cash Forecast",
    text: "Predict future financial status..",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "🌤️",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "🌤️",
        category: "investment",
      },
    ],
  },
  {
    title: "💸 Recent Transactionst",
    text: "Track and review recent expenses.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "💸",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "💸",
        category: "investment",
      },
    ],
  },
  {
    title: "🏠 Investment Holdings",
    text: "Manage and assess investment assets.",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "🏠",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "🏠",
        category: "investment",
      },
    ],
  },
  {
    title: "💳 Credit Card Usage",
    text: "Optimize and track card benefit..",
    suggest: [
      {
        label: "Expense Alert",
        content: "You spent $120 on groceries today.",
        icon: "💳",
        category: "expense",
      },
      {
        label: "Investment Update",
        content: "Your portfolio gained $500 in value this week.",
        icon: "💳",
        category: "investment",
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
