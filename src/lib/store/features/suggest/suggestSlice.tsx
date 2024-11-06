import { createSlice } from "@reduxjs/toolkit";

export const defaultCareerCoachAssistant =  {
    label: "Career Coach Assistant",
    content: "Ask me any questions",
    icon: "📘",
    category: "career coach",
    assistantId: "asst_XizmVhjCdwImRlerh0Z5bh9e",
};

export const defaultTutor =  {
    label: "Tutor",
    content: "Ask me any questions",
    icon: "📘",
    category: "tutor",
    assistantId: "asst_kosUuOZshZP2ULAD6zBOob4f",
    instructions: `1 System settings:
      Tool use: enabled.

      Instructions:
      - You are an artificial intelligence agent responsible for helping test realtime voice capabilities
      - Please make sure to respond with a helpful voice via audio
      - Be kind, helpful, and curteous
      - It is okay to ask the user questions
      - Use tools and functions you have available liberally, it is part of the training apparatus
      - Be open to exploration and conversation
      - Remember: this is just for fun and testing!

      Personality:
      - Be upbeat and genuine
      - Try speaking quickly as if excited
      `
};

export const tutorSuggestionData = [
  {
    label: "Mathematics",
    content: "Master math concepts and ace your exams.",
    icon: "📘",
    category: "mathematics",
    assistantId: "asst_wu5H6HvbW3o0qLw443ojVx6V",
    instructions: `1 System settings:
      Tool use: enabled.

      Instructions:
      - You are an artificial intelligence agent responsible for helping test realtime voice capabilities
      - Please make sure to respond with a helpful voice via audio
      - Be kind, helpful, and curteous
      - It is okay to ask the user questions
      - Use tools and functions you have available liberally, it is part of the training apparatus
      - Be open to exploration and conversation
      - Remember: this is just for fun and testing!

      Personality:
      - Be upbeat and genuine
      - Try speaking quickly as if excited
      `
  },
  {
    label: "Physical Sciences",
    content: "Conquer science topics and excel in exams.",
    icon: "🧪",
    category: "physical-sciences",
    assistantId: "asst_mdg1VEgSqxVOKlHk6JlRXzTN",
    instructions: `2 System settings:
      Tool use: enabled.

      Instructions:
      - You are an artificial intelligence agent responsible for helping test realtime voice capabilities
      - Please make sure to respond with a helpful voice via audio
      - Be kind, helpful, and curteous
      - It is okay to ask the user questions
      - Use tools and functions you have available liberally, it is part of the training apparatus
      - Be open to exploration and conversation
      - Remember: this is just for fun and testing!

      Personality:
      - Be upbeat and genuine
      - Try speaking quickly as if excited
      `
  },
  {
    label: "English",
    content: "Enhance your English skills and boost your grades.",
    icon: "📚",
    category: "english",
    assistantId: "asst_vaBKqqnSfyus1suFdb8BGqvK",
    instructions: `3 System settings:
      Tool use: enabled.

      Instructions:
      - You are an artificial intelligence agent responsible for helping test realtime voice capabilities
      - Please make sure to respond with a helpful voice via audio
      - Be kind, helpful, and curteous
      - It is okay to ask the user questions
      - Use tools and functions you have available liberally, it is part of the training apparatus
      - Be open to exploration and conversation
      - Remember: this is just for fun and testing!

      Personality:
      - Be upbeat and genuine
      - Try speaking quickly as if excited
      `
  },
  {
    label: "Accounting",
    content: "Ace accounting principles and top your tests.",
    icon: "📊",
    category: "accounting",
    assistantId: "asst_accounting_id",
    instructions: `4 System settings:
      Tool use: enabled.

      Instructions:
      - You are an artificial intelligence agent responsible for helping test realtime voice capabilities
      - Please make sure to respond with a helpful voice via audio
      - Be kind, helpful, and curteous
      - It is okay to ask the user questions
      - Use tools and functions you have available liberally, it is part of the training apparatus
      - Be open to exploration and conversation
      - Remember: this is just for fun and testing!

      Personality:
      - Be upbeat and genuine
      - Try speaking quickly as if excited
      `
  },
];

export const careerCoachAssistantSuggestionData = [
  {
    label: "CoachXpert",
    content: "What are top skills needed in South Africa?",
    icon: "🎓",
    category: "career",
    assistantId: "asst_yKj9zsjFZtcm4yZFhNzfztn"
  },
  {
    label: "CampusNavigator",
    content: "Which universities offer computer science?",
    icon: "🏫",
    category: "education",
    assistantId: "asst_p5JE3MZY94FUgL9Ow5CAJqbc"
  },
  {
    label: "CourseQuest",
    content: "What online courses can I take for free?",
    icon: "📚",
    category: "courses",
    assistantId: ""
  },
  {
    label: "BursaryFinder",
    content: "Where can I find bursaries for 2024?",
    icon: "💰",
    category: "scholarships",
    assistantId: "asst_e9SCWWWVAqsFGhIFB0f8RstS"
  }
];

export const tutor = [
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
    category: "economics",
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

export const careerCoach = [
  {
    title: "🎓 CoachXpert",
    text: "Guiding your career growth.",
    category: "career",
    assistantId: "asst_yKj9zsjFZtcm4yZFhNzfztn",
    suggest: [
      {
        label: "Choosing Grade 9 Subjects",
        content: "What subjects should I choose in Grade 9?"
      },
      {
        label: "Aligning Subjects with Careers",
        content: "How do I align my subject choices with future career goals?"
      },
      {
        label: "Preparing for FET Phase",
        content: "How do I prepare for the transition from Grade 9 to FET?"
      },
      {
        label: "Creating a Study Plan",
        content: "How can I create an effective study plan for Grade 12?"
      },
      {
        label: "Exploring University Pathways",
        content: "Which university courses align with my subjects?"
      },
      {
        label: "Preparing for Bursary Applications",
        content: "How do I get ready to apply for bursaries?"
      },
      {
        label: "Setting Career Goals",
        content: "How do I set career goals while still in school?"
      },
      {
        label: "Exploring Vocational Training",
        content: "What are the best vocational training options in South Africa?"
      },
      {
        label: "Understanding TVET Colleges",
        content: "What are TVET colleges, and should I apply?"
      },
      {
        label: "Planning for High-Demand Careers",
        content: "Which high-demand careers should I consider?"
      },
      {
        label: "Finding Mentorship Opportunities",
        content: "How can I find a mentor in my field of interest?"
      },
      {
        label: "Balancing Studies and Extracurriculars",
        content: "How do I balance my studies with sports and hobbies?"
      }
    ]
  },
  {
    title: "💰 BursaryFinder",
    text: "Unlock scholarships for you.",
    category: "scholarships",
    assistantId: "asst_e9SCWWWVAqsFGhIFB0f8RstS",
    suggest: [
      {
        label: "2024 Bursaries",
        content: "Where can I find bursaries for 2024?"
      },
      {
        label: "SA Bursaries",
        content: "Which companies offer bursaries in South Africa?"
      },
      {
        label: "Bursary Application",
        content: "How do I apply for a bursary?"
      },
      {
        label: "First-Year Bursaries",
        content: "Are there bursaries for first-year students?"
      },
      {
        label: "Study Abroad Bursaries",
        content: "Can I get a bursary for studying abroad?"
      },
      {
        label: "Engineering Bursaries",
        content: "What bursaries are available for engineering?"
      },
      {
        label: "Bursary Motivation Letter",
        content: "How do I write a bursary motivation letter?"
      },
      {
        label: "Postgrad Bursaries",
        content: "Are there bursaries for postgraduate studies?"
      },
      {
        label: "Field-Specific Bursaries",
        content: "How can I get a bursary for my field?"
      },
      {
        label: "Bursary Deadlines",
        content: "When is the deadline for bursary applications?"
      },
      {
        label: "Rural Bursaries",
        content: "Are there bursaries for rural students?"
      },
      {
        label: "Women in STEM",
        content: "What bursaries are available for women in STEM?"
      }
    ]
  },
  {
    title: "🏫 CampusNavigator",
    text: "Discover your perfect school.",
    category: "education",
    assistantId: "asst_p5JE3MZY94FUgL9Ow5CAJqbc",
    suggest: [
      {
        label: "Top TVET Colleges",
        content: "How do I find a top TVET college?"
      },
      {
        label: "Best Technical Universities",
        content: "What's the best technical university in SA?"
      },
      {
        label: "Private Engineering Colleges",
        content: "Which private colleges offer engineering courses?"
      },
      {
        label: "TVET College Application",
        content: "How do I apply to a TVET college?"
      },
      {
        label: "University vs TVET",
        content: "What's the difference between universities and TVET colleges?"
      },
      {
        label: "Study Graphic Design",
        content: "Where can I study graphic design in SA?"
      },
      {
        label: "Public vs Private Colleges",
        content: "How do I choose between public and private colleges?"
      },
      {
        label: "Online Degree Programs",
        content: "Which universities offer online degree programs?"
      },
      {
        label: "Find Right Campus",
        content: "How do I find the right campus for me?"
      },
      {
        label: "Top Business Schools",
        content: "What are the top-rated business schools in South Africa?"
      },
      {
        label: "Evening Classes",
        content: "Which universities offer evening classes?"
      },
      {
        label: "Local University Scholarships",
        content: "How do I find scholarships for local universities?"
      }
    ]
  },
  {
    title: "🔍 CareerExplorer",
    text: "Find your passion, shape future.",
    category: "career-exploration",
    assistantId: "asst_c6ZOXBtcSSw7Jy3F7zkzeryA",
    suggest: [
      {
        label: "Careers in Demand",
        content: "What careers are in demand in South Africa?"
      },
      {
        label: "Explore Career Options",
        content: "How do I explore different career options?"
      },
      {
        label: "Emerging SA Careers",
        content: "What are emerging careers in SA?"
      },
      {
        label: "Find Your Passion",
        content: "How do I find my passion?"
      },
      {
        label: "Creative Careers",
        content: "What's a good career for creatives?"
      },
      {
        label: "Top-Paying Careers",
        content: "Which careers pay the most in SA?"
      },
      {
        label: "Renewable Energy Careers",
        content: "How can I start a career in renewable energy?"
      },
      {
        label: "Introvert-Friendly Careers",
        content: "What's the best career for introverts?"
      },
      {
        label: "Become a Data Scientist",
        content: "How do I become a data scientist?"
      },
      {
        label: "Helping Professions",
        content: "What careers suit someone who loves helping others?"
      },
      {
        label: "Career Trends",
        content: "What are the top career trends in SA?"
      },
      {
        label: "Start in AI",
        content: "How do I start a career in AI?"
      }
    ]
  },
  {
    title: "📚 CourseQuest",
    text: "Pursue the ideal courses.",
    category: "courses",
    assistantId: "",
    suggest: []
  },
  {
    title: "🏛 EduPathfinder",
    text: "Helping you find the best places to study.",
    category: "education-path",
    assistantId: "",
    suggest: []
  }
];




interface SuggestState {
  suggest: any;
  suggests: any;
  focusSuggests: any;
}

const initialState: SuggestState = {
  suggest: {},
  suggests: [],
  focusSuggests: [],
};

export const suggestSlice = createSlice({
  name: "suggested",
  initialState,
  reducers: {
    setSuggests: (state, action) => {
      state.suggests = action.payload;
    },
    setFocusSuggests: (state, action) => {
      state.focusSuggests = action.payload;
    },
    setSuggest: (state, action) => {
      state.suggest = action.payload;
    },
  },
});

export const { setSuggests, setSuggest, setFocusSuggests } = suggestSlice.actions;

export default suggestSlice.reducer;
