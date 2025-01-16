import { createSlice } from "@reduxjs/toolkit"

export enum TutorAssistants {
  Mathematics = "asst_wu5H6HvbW3o0qLw443ojVx6V",
  MathsLiteracy = "asst_wu5H6HvbW3o0qLw443ojVx6V",
  English = "asst_vaBKqqnSfyus1suFdb8BGqvK",
  PhysicalSciences = "asst_mdg1VEgSqxVOKlHk6JlRXzTN",
  EconomicsTutor = "asst_stEGiVDTlMIeDM7XGiezPI28",
  Accounting = "asst_kosUuOZshZP2ULAD6zBOob4f",
}

export enum CareerCoachAssistants {
  BursaryFinder = "asst_e9SCWWWVAqsFGhIFB0f8RstS",
  CampusNavigator = "asst_p5JE3MZY94FUgL9Ow5CAJqbc",
  CareerExplorer = "asst_c6Z0XBtcSSw7Jy3F7zkzeryA",
  CareerXpert = "asst_yKj9zsjFZtcm4yZFhNzfzatn",
  PersonalityQuiz = "asst_YaKOJNycgzRZ62P271Od6hCP",
  SubjectWise = "asst_mpf05UMJdIybK5W0BWvFL04t"
}

export enum TeacherAssistants {
  LessonCraft = "asst_nxJVZh17j23ovTc4923NOdc4",
  AssessGenie = "asst_Vjl8Br7Coh1M2waAnahdbvZ7",
  InsightMax = "asst_BvSZyrPkHJUu27VBJgigiMgK",
  EngageAI = "asst_UFL50keGMUrmNRlR2Hdh1yfx",
  ClarityBot = "asst_h9xwAFmreZXrVWbjlDujBTrE",
  WellnessWatch = "asst_RDT2lipIUg4wCmvJL3Sedes8",
}

export const defaultCareerCoachAssistant = {
  label: "",
  content: "Ask me any questions",
  icon: "🔢",
  category: " I’m your Career Buddy",
  assistantId: "asst_XizmVhjCdwImRlerh0Z5bh9e",
  instructions: `System settings:
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

export const defaultTutor = {
  label: "",
  content: "Ask me any questions",
  icon: "🔢",
  category: " I’m your personal tutor",
  assistantId: "asst_kosUuOZshZP2ULAD6zBOob4f",
  instructions: `System settings:
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

export const defaultTeacher = {
  label: "LessonCraft",
  content: "CAPS-Aligned Lesson and Activity Designer",
  icon: "📚",
  category: "I'm your Teacher Assistant",
  assistantId: "asst_nxJVZh17j23ovTc4923NOdc4",
  instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - You are a teaching assistant focused on helping with CAPS-aligned lesson planning and engaging activities.
      - Be supportive, creative, and offer dynamic solutions to help teachers.
      - Provide assistance in structuring lesson plans, creating activities, and offering strategies for classroom management.
      - Be informative and tailored to the needs of educators.

      Personality:
      - Professional and knowledgeable.
      - Friendly and engaging when interacting with teachers.
  `
};

export const tutorSuggestionData = [
  {
    title: "🔢 Mathematics",
    text: "Master math concepts and ace your exams.",
    category: "I’m your personal Mathematics tutor ",
    assistantId: TutorAssistants.Mathematics,
    label: "Mathematics",
    isDefault: "true",
    suggest: [
      {
        label: "Practice Algebra Questions",
        content: "Can you provide algebra questions from past exams?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Geometry Focus",
        content: "Help me practice geometry problems from past papers.",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Grade My Calculations",
        content: "Can you grade my solutions to these math problems?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Improve Problem Solving",
        content: "How can I improve my approach to solving math problems?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my math solutions and give feedback?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for my math exam.",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my solution compare to the marking guidelines?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Targeted Tutoring",
        content: "Which math topics should I focus on to boost my score?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Retake Practice Problems",
        content: "Can I try another set of math problems and get feedback?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Understanding Formulas",
        content: "Can you explain key math formulas like the quadratic equation?",
        icon: "🔢",
        category: "mathematics",
      },
    ],
    content: "Master math concepts and ace your exams.",
    icon: "🔢",
    instructions: `System settings:
      Tool use: enabled.

      Instructions:
      You are an AI-powered Mathematics tutor designed to help South African high school students prepare for the National Senior Certificate (NSC) exams. Your role is to offer personalized math help through visual aids, homework support, and exam preparation. Your interaction must feel friendly, supportive, and easy to follow.
      Here is the structure of your interaction:
      1. **Ask the Student’s Name** and greet them using their name.
      2. **Ask for the Language Preference:** Offer these six languages for tutoring:
        *English, Xhosa, Zulu, seTswana, Sotho, or Afrikaans.*
      3. **Explain Your Capabilities Simply and Clearly:** Use friendly, conversational language.
      4. **Visual Aids and Problem Walkthroughs:** Provide graphs and step-by-step explanations for questions.
      5. **Homework Help through Photo Uploads:** Guide students with their homework by allowing them to upload photos.
      6. **Past Paper Practice:** Offer practice questions from NSC papers, and grade them with detailed feedback.
      7. **Interactive Tutoring Sessions:** Suggest sessions based on the student’s needs.
      ### **Example Opening Interaction:**
      Hi there! What’s your name?
      (Wait for response.)
      It’s great to meet you, [Student’s Name]! :blush: I’m here to help you with Mathematics today.
      Before we begin, which language would you like us to use? You can pick from:
      English, Xhosa, Zulu, seTswana, Sotho, or Afrikaans.
      (Wait for response.)
      Awesome! Let’s get started! Here’s how I can help you:
      Practice with Exam Papers: I’ve got past NSC math papers ready. You can solve them, and I’ll give you feedback.
      Homework Help: If you’re stuck on a problem, just upload a photo, and I’ll guide you step-by-step.
      Visual Learning: I can show you how to solve problems with graphs and diagrams, so it’s easier to understand.
      Interactive Sessions: We can work on tricky topics together, like algebra or calculus.
      Would you like to try a practice question from a past exam, or do you want to upload a problem you’re working on?
      ---
      ### **Example: Visual Aid for Functions**
      Here’s a quick example of how I explain graphs:
      Linear Function:
      𝑓
      (
      𝑥
      )
      =
      2
      𝑥
      +
      3
      f(x)=2x+3
      This graph is a straight line, and it crosses the y-axis at
      (
      0
      ,
      3
      )
      (0,3).
      Quadratic Function:
      𝑔
      (
      𝑥
      )
      =
      𝑥
      2
      −
      4
      𝑥
      +
      4
      g(x)=x
      2
      −4x+4
      This one forms a parabola with its lowest point at
      (
      2
      ,
      0
      )
      (2,0).
      Exponential Function:
      ℎ
      (
      𝑥
      )
      =
      2
      𝑥
      h(x)=2
      x
      It’s a curve that starts slowly and then grows fast, crossing the y-axis at
      (
      0
      ,
      1
      )
      (0,1).
      These graphs make it easier to understand how different functions behave. Want to try one of these?
      ---
      ### **Photo Upload Example:**
      If you upload a photo of a question, I’ll help you solve it step-by-step.
      Example:
      Solve for
      𝑥
      x in the equation:
      𝑥
      2
      −
      5
      𝑥
      +
      6
      =
      0
      x
      2
      −5x+6=0.
      Step 1: Factor the equation:
      (
      𝑥
      −
      2
      )
      (
      𝑥
      −
      3
      )
      =
      0
      (x−2)(x−3)=0
      Step 2: Solve for
      𝑥
      x:
      𝑥
      =
      2
      or
      𝑥
      =
      3
      x=2orx=3
      Do you need more help with this, or would you like to try a different question?
      ---
      ### **Grading and Feedback Example:**
      Here’s how I give feedback:
      Question: Solve for
      𝑥
      x in:
      2
      𝑥
      +
      3
      =
      7
      2x+3=7
      Step 1 (2/2): Subtract 3 from both sides:
      2
      𝑥
      =
      4
      2x=4
      Step 2 (2/2): Divide both sides by 2:
      𝑥
      =
      2
      x=2
      Total Score: 4/4
      Percentage: 100%
      Great job! Would you like to try something more challenging?
      ---
      ### **Summary of Capabilities:**
      Visual Learning Support: I’ll use graphs and diagrams to explain math problems.
      Homework Help: You can upload photos of questions, and I’ll guide you step-by-step.
      Past Paper Practice: I’ve got NSC questions ready for practice, with detailed feedback.
      Interactive Tutoring: We can focus on tough topics like algebra or geometry.
      What would you like to start with today, [Student’s Name]?
      `
  },
  {
    title: "🔬 Physical Sciences",
    text: "Conquer science topics and excel in exams.",
    category: "I’m your personal Physical Science tutor",
    label: "Physical Sciences",
    isDefault: "true",
    suggest: [
      {
        label: "Practice Physics Questions",
        content: "Can you provide physics questions from past exams?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Chemistry Focus",
        content: "Help me practice chemistry problems from past papers.",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Grade My Responses",
        content: "Can you grade my answers to these science questions?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Improve Scientific Explanations",
        content: "How can I improve my explanations in science answers?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my science answers and provide feedback?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Physical Sciences.",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to the marking guidelines?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Understanding Scientific Concepts",
        content: "Can you explain key concepts like Newton's laws?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Targeted Tutoring",
        content: "Which science topics should I focus on to boost my grade?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I try another set of science questions and get feedback?",
        icon: "🔬",
        category: "physical-sciences",
      },
    ],
    content: "Conquer science topics and excel in exams.",
    icon: "🔬",
    assistantId: TutorAssistants.PhysicalSciences,
    instructions: `System settings:
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
    title: "📖 English",
    text: "Enhance your English skills and boost your grades.",
    category: "I’m your personal English tutor",
    assistantId: TutorAssistants.English,
    label: "English",
    isDefault: "true",
    suggest: [
      {
        label: "Practice Essay Writing",
        content: "Can you provide essay prompts from past English exams?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Comprehension Focus",
        content: "Help me practice comprehension questions from past papers.",
        icon: "📖",
        category: "english",
      },
      {
        label: "Grade My Essay",
        content: "Can you grade my essay and give feedback?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Improve Writing Skills",
        content: "How can I improve my essay writing for exams?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for my English exam.",
        icon: "📖",
        category: "english",
      },
      {
        label: "Review Marking Criteria",
        content: "How does my essay compare to the marking criteria?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Targeted Tutoring",
        content: "Which English topics should I focus on to improve my score?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Retake Practice Essays",
        content: "Can I try another essay prompt and get feedback?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my English answers and provide suggestions?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Understanding Literary Devices",
        content: "Can you explain literary devices like metaphors and symbolism?",
        icon: "📖",
        category: "english",
      },
    ],
    content: "Enhance your English skills and boost your grades.",
    icon: "📖",
    instructions: `System settings:
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
    title: "💼 Accounting",
    text: "Ace accounting principles and top your tests.",
    label: "Accounting",
    isDefault: "true",
    suggest: [
      {
        label: "Practice Accounting Problems",
        content: "Can you provide accounting exercises on balance sheets?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Financial Statement Analysis",
        content: "Help me analyze financial statements for exams.",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Grade My Accounting Solution",
        content: "Can you grade my accounting answers?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Improve Accounting Skills",
        content: "How can I improve my accounting problem-solving?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my accounting answers and provide feedback?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Accounting.",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to the accounting guidelines?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Understanding Financial Ratios",
        content: "Can you explain key financial ratios for analysis?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Targeted Tutoring",
        content: "Which accounting topics should I focus on to boost my score?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Retake Practice Problems",
        content: "Can I try another accounting problem and get feedback?",
        icon: "💼",
        category: "accounting",
      },
    ],
    content: "Ace accounting principles and top your tests.",
    icon: "💼",
    category: "accounting",
    assistantId: TutorAssistants.Accounting,
    instructions: `System settings:
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
    title: "🧭 CoachXpert",
    text: "Guiding your career growth.",
    category: "I’m your personal Career Coach",
    assistantId: CareerCoachAssistants.CareerXpert,
    label: "CoachXpert",
    isDefault: "true",
    suggest: [
      {
        label: "🧭 Choosing Grade 9 Subjects",
        content: "What subjects should I choose in Grade 9?"
      },
      {
        label: "🧭 Aligning Subjects with Careers",
        content: "How do I align my subject choices with future career goals?"
      },
      {
        label: "🧭 Preparing for FET Phase",
        content: "How do I prepare for the transition from Grade 9 to FET?"
      },
      {
        label: "🧭 Creating a Study Plan",
        content: "How can I create an effective study plan for Grade 12?"
      },
      {
        label: "🧭 Exploring University Pathways",
        content: "Which university courses align with my subjects?"
      },
      {
        label: "🧭 Preparing for Bursary Applications",
        content: "How do I get ready to apply for bursaries?"
      },
      {
        label: "🧭 Setting Career Goals",
        content: "How do I set career goals while still in school?"
      },
      {
        label: "🧭 Exploring Vocational Training",
        content: "What are the best vocational training options in South Africa?"
      },
      {
        label: "🧭 Understanding TVET Colleges",
        content: "What are TVET colleges, and should I apply?"
      },
      {
        label: "🧭 Planning for High-Demand Careers",
        content: "Which high-demand careers should I consider?"
      },
      {
        label: "🧭 Finding Mentorship Opportunities",
        content: "How can I find a mentor in my field of interest?"
      },
      {
        label: "🧭 Balancing Studies and Extracurriculars",
        content: "How do I balance my studies with sports and hobbies?"
      }
    ],
    content: "Your Personalized South African Career Guide.",
    icon: "🧭",
    instructions: `System settings:
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
    title: "🏫 CampusNavigator",
    label: "CampusNavigator",
    text: "Discover your perfect school.",
    category: "I’m here to help you find a place to study",
    assistantId: CareerCoachAssistants.CampusNavigator,
    isDefault: "true",
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
    ],
    content: "Discover Your Future Career Path",
    icon: "🏫",
    instructions: `System settings:
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
    title: "📖 PersonalityQuiz",
    text: "Pursue the ideal courses.",
    category: "courses",
    assistantId: CareerCoachAssistants.PersonalityQuiz,
    label: "PersonalityQuiz",
    isDefault: "true",
    content: "What online courses can I take for free?",
    icon: "📚",
    suggest: [
      {
        label: "📚 Discover My Personality",
        content: "Can you help me discover my personality type before we dive into career suggestions?"
      },
      {
        label: "📚 Start My Personality Assessment",
        content: "I’d like to start the personality assessment to learn more about myself. How do I begin?"
      },
      {
        label: "📚 What’s My Personality Type?",
        content: "Can you help me find out my personality type first? I want to see how it affects my study habits."
      },
      {
        label: "📚 Take the Quiz for Personal Insights",
        content: "Could you guide me through the personality quiz? I’m curious about my strengths and weaknesses."
      },
      {
        label: "📚 Identify My Core Traits",
        content: "I want to know my core personality traits. Can I start with an assessment?"
      },
      {
        label: "📚 Discover Career Paths for My Personality",
        content: "Can you help me identify my personality type first, so I can see which careers might fit me?"
      },
      {
        label: "📚 Find Subjects that Match My Personality",
        content: "Can I take the personality assessment to see which school subjects might be a good match for me?"
      },
      {
        label: "📚 Get Started with Self-Discovery",
        content: "I’m ready to explore my personality type and see how it can help with my career goals. Can we start the quiz?"
      }
    ],

    instructions: `System settings:
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
    label: "BursaryFinder",
    title: "🎓 BursaryFinder",
    text: "Unlock scholarships for you.",
    category: "I’m here to help you find bursaries             ",
    assistantId: CareerCoachAssistants.BursaryFinder,
    isDefault: "true",
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
    ],
    content: "Where can I find bursaries for 2024?",
    icon: "🎓",
    instructions: `System settings:
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
  }
];

export const teacherSuggestionData = [
  {
    title: "📝📚 LessonCraft",
    text: "CAPS-Aligned Lesson and Activity Designer",
    category: "I’m your CAPS-Aligned Lesson and Activity Designer.",
    assistantId: TeacherAssistants.LessonCraft,
    label: "LessonCraft",
    isDefault: "true",
    suggest: [
      {
        label: "📝📚 Generate CAPS-Compliant Lesson Plans",
        content: "Provides structured lesson outlines aligned with CAPS requirements, ensuring curriculum consistency across subjects."
      },
      {
        label: "📝📚 Create Engaging Activities and Resources",
        content: "Suggests interactive and hands-on activities tailored to specific topics, making lessons dynamic and engaging for students."
      },
      {
        label: "📝📚 Localize Content for Cultural Relevance",
        content: "Customizes content with examples and references from South African contexts, making learning more relatable for students."
      },
      {
        label: "📝📚 Suggest Cross-Curricular Links",
        content: "Offers ideas for integrating concepts across subjects, such as connecting environmental studies in Geography with Physical Sciences."
      },
      {
        label: "📝📚 Differentiate for Diverse Learning Levels",
        content: "Designs activities and resources suitable for various proficiency levels, helping teachers support mixed-ability classes."
      },
      {
        label: "📝📚 Provide Multimedia and Technology Integration Tips",
        content: "Recommends digital tools and multimedia elements (like videos or slides) to enhance lesson delivery and student engagement."
      }
    ],
    content: "CAPS-Aligned Lesson and Activity Designer.",
    icon: "📝📚",
    instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - You are a teaching assistant focused on helping with CAPS-aligned lesson planning and engaging activities.
      - Be supportive, creative, and offer dynamic solutions to help teachers.
      - Provide assistance in structuring lesson plans, creating activities, and offering strategies for classroom management.
      - Be informative and tailored to the needs of educators.

      Personality:
      - Professional and knowledgeable.
      - Friendly and engaging when interacting with teachers.
    `
  },
  {
    title: "🧩📊 AssessGenie",
    text: "Flexible Assessment and CAPS-Consistent Grading Tool",
    category: "I’m a Flexible Assessment and CAPS-Consistent Grading Tool",
    assistantId: TeacherAssistants.AssessGenie,
    label: "AssessGenie",
    isDefault: "true",
    suggest: [
      {
        label: "🧩📊 Create CAPS-Aligned Assessments",
        content: "Generates quizzes, tests, and exams tailored to CAPS standards, saving teachers time and ensuring curriculum alignment."
      },
      {
        label: "🧩📊 Design Rubrics for Fair Grading",
        content: "Produces clear rubrics that outline grading criteria, promoting transparency and helping students understand expectations."
      },
      {
        label: "🧩📊 Generate Diverse Question Types",
        content: "Provides a range of question formats (e.g., multiple-choice, essays) to assess different skills, from factual recall to critical thinking."
      },
      {
        label: "🧩📊 Create Differentiated Assessments",
        content: "Adapts assessments to cater to various skill levels, ensuring every student can demonstrate their understanding effectively."
      },
      {
        label: "🧩📊 Offer Feedback Tips for Improvement",
        content: "Suggests feedback strategies that encourage growth, allowing students to understand strengths and areas for improvement."
      },
      {
        label: "🧩📊 Assist with Self and Peer Assessment Tools",
        content: "Provides tools for student self-assessment and peer evaluation, promoting reflective learning and collaboration."
      }
    ],
    content: "Flexible Assessment and CAPS-Consistent Grading Tool.",
    icon: "🧩📊",
    instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - You are a flexible assessment tool, providing CAPS-compliant grading solutions and customizable assessments.
      - Offer diverse question types, grading rubrics, and feedback mechanisms for teachers.
      - Ensure fair assessment practices while promoting student understanding.

      Personality:
      - Accurate and detailed in grading and feedback.
      - Helpful and thorough in assessment customization.
    `
  },
  {
    title: "🌐🔍 ClarityBot",
    text: "Multi-Language Explanation and Example Generator",
    category: "I’m your Multi-Language Explanation and Example Generator",
    assistantId: TeacherAssistants.ClarityBot,
    label: "ClarityBot",
    isDefault: "true",
    suggest: [
      {
        label: "🌐🔍 Translate Complex Concepts Across Languages",
        content: "Provides simplified explanations in multiple South African languages, improving comprehension in multilingual classrooms."
      },
      {
        label: "🌐🔍 Provide Definitions and Contextualized Vocabulary",
        content: "Supplies accessible definitions and vocabulary explanations, helping students grasp technical terms and academic language."
      },
      {
        label: "🌐🔍 Offer Step-by-Step Explanations",
        content: "Breaks down difficult concepts into manageable steps, ensuring clarity and reducing cognitive load for students."
      },
      {
        label: "🌐🔍 Adapt Explanations for Different Proficiency Levels",
        content: "Tailors explanations based on students’ language proficiency and comprehension level, ensuring accessibility for all learners."
      },
      {
        label: "🌐🔍 Generate Analogies and Real-World Examples",
        content: "Uses familiar, culturally relevant analogies to make abstract concepts easier to understand for diverse learners."
      },
      {
        label: "🌐🔍 Suggest Visual Aids and Diagrams",
        content: "Recommends visual aids and diagrams that complement verbal explanations, supporting varied learning styles and enhancing retention."
      }
    ],
    content: "Multi-Language Explanation and Example Generator.",
    icon: "🌐🔍",
    instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - Provide translations, cultural examples, and simplified explanations for complex topics.
      - Support teachers in bridging language gaps and improving student comprehension.
      - Be adaptive and culturally sensitive.

      Personality:
      - Clear, concise, and inclusive.
      - Focused on breaking barriers to understanding.
    `
  },
  {
    title: "📈🧭 InsightMax",
    text: "Student Progress Tracker with Tailored Support",
    category: "I’m your Student Progress Tracker with Tailored Support",
    assistantId: TeacherAssistants.InsightMax,
    label: "InsightMax",
    isDefault: "true",
    suggest: [
      {
        label: "📈🧭 Monitor Individual and Class-Wide Progress",
        content: "Tracks individual and overall class performance, providing teachers with insights into each student’s progress on specific topics."
      },
      {
        label: "📈🧭 Offer Data-Driven Insights for Lesson Adjustment",
        content: "Provides feedback on lesson effectiveness, helping teachers adjust teaching methods based on student performance data."
      },
      {
        label: "📈🧭 Identify Learning Gaps and Intervention Needs",
        content: "Highlights areas where students may need extra help, enabling timely intervention and targeted support for at-risk students."
      },
      {
        label: "📈🧭 Track Improvements Over Time",
        content: "Monitors progress over weeks or terms, allowing teachers to see improvements and make data-driven decisions on pacing."
      },
      {
        label: "📈🧭 Suggest Remediation Activities for Struggling Students",
        content: "Recommends targeted activities and resources to help struggling students catch up and close knowledge gaps."
      },
      {
        label: "📈🧭 Identify Common Misconceptions",
        content: "Recognizes patterns in student errors, enabling teachers to address common misconceptions early and improve concept clarity."
      }
    ],
    content: "Student Progress Tracker with Tailored Support.",
    icon: "📈🧭",
    instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - Provide tools and insights to track student progress and identify gaps in understanding.
      - Offer strategies for intervention, remediation, and improving overall class performance.
      - Be data-driven and supportive in providing actionable insights.

      Personality:
      - Analytical, supportive, and precise.
      - Focused on helping students and teachers succeed together.
    `
  }
];

export const tutor = [
  {
    title: "🔢 Mathematics",
    text: "Master math concepts and ace your exams.",
    category: "I’m your personal Mathematics tutor ",
    assistantId: TutorAssistants.Mathematics,
    suggest: [
      {
        label: "Practice Algebra Questions",
        content: "Can you provide algebra questions from past exams?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Geometry Focus",
        content: "Help me practice geometry problems from past papers.",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Grade My Calculations",
        content: "Can you grade my solutions to these math problems?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Improve Problem Solving",
        content: "How can I improve my approach to solving math problems?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my math solutions and give feedback?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for my math exam.",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my solution compare to the marking guidelines?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Targeted Tutoring",
        content: "Which math topics should I focus on to boost my score?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Retake Practice Problems",
        content: "Can I try another set of math problems and get feedback?",
        icon: "🔢",
        category: "mathematics",
      },
      {
        label: "Understanding Formulas",
        content: "Can you explain key math formulas like the quadratic equation?",
        icon: "🔢",
        category: "mathematics",
      },
    ],
  },
  {
    title: "🔬 Physical Sciences",
    text: "Conquer science topics and excel in exams.",
    category: "I’m your personal Physical Science tutor",
    assistantId: TutorAssistants.PhysicalSciences,
    suggest: [
      {
        label: "Practice Physics Questions",
        content: "Can you provide physics questions from past exams?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Chemistry Focus",
        content: "Help me practice chemistry problems from past papers.",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Grade My Responses",
        content: "Can you grade my answers to these science questions?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Improve Scientific Explanations",
        content: "How can I improve my explanations in science answers?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my science answers and provide feedback?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Physical Sciences.",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to the marking guidelines?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Understanding Scientific Concepts",
        content: "Can you explain key concepts like Newton's laws?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Targeted Tutoring",
        content: "Which science topics should I focus on to boost my grade?",
        icon: "🔬",
        category: "physical-sciences",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I try another set of science questions and get feedback?",
        icon: "🔬",
        category: "physical-sciences",
      },
    ],
  },
  {
    title: "📖 English",
    text: "Enhance your English skills and boost your grades.",
    category: "I’m your personal English tutor",
    assistantId: TutorAssistants.English,
    suggest: [
      {
        label: "Practice Essay Writing",
        content: "Can you provide essay prompts from past English exams?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Comprehension Focus",
        content: "Help me practice comprehension questions from past papers.",
        icon: "📖",
        category: "english",
      },
      {
        label: "Grade My Essay",
        content: "Can you grade my essay and give feedback?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Improve Writing Skills",
        content: "How can I improve my essay writing for exams?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for my English exam.",
        icon: "📖",
        category: "english",
      },
      {
        label: "Review Marking Criteria",
        content: "How does my essay compare to the marking criteria?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Targeted Tutoring",
        content: "Which English topics should I focus on to improve my score?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Retake Practice Essays",
        content: "Can I try another essay prompt and get feedback?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my English answers and provide suggestions?",
        icon: "📖",
        category: "english",
      },
      {
        label: "Understanding Literary Devices",
        content: "Can you explain literary devices like metaphors and symbolism?",
        icon: "📖",
        category: "english",
      },
    ],
  },
  {
    title: "📈 Economics",
    category: "I’m your personal Economics tutor ",
    text: "Understand economics deeply and score high marks.",
    assistantId: TutorAssistants.EconomicsTutor,
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
    category: "I’m your personal Math Literacy tutor",
    assistantId: TutorAssistants.MathsLiteracy,
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
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Mathematical Literacy.",
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
    title: "💼 Accounting",
    text: "Ace accounting principles and top your tests.",
    category: "I’m your accounting tutor",
    assistantId: TutorAssistants.Accounting,
    suggest: [
      {
        label: "Practice Accounting Problems",
        content: "Can you provide accounting exercises on balance sheets?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Financial Statement Analysis",
        content: "Help me analyze financial statements for exams.",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Grade My Accounting Solution",
        content: "Can you grade my accounting answers?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Improve Accounting Skills",
        content: "How can I improve my accounting problem-solving?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my accounting answers and provide feedback?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Accounting.",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to the accounting guidelines?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Understanding Financial Ratios",
        content: "Can you explain key financial ratios for analysis?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Targeted Tutoring",
        content: "Which accounting topics should I focus on to boost my score?",
        icon: "💼",
        category: "accounting",
      },
      {
        label: "Retake Practice Problems",
        content: "Can I try another accounting problem and get feedback?",
        icon: "💼",
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
    title: "📊 Business Studies",
    text: "Excel in business studies and ace every test.",
    suggest: [
      {
        label: "Business Case Studies",
        content: "Can you provide case studies to analyze for practice?",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Marketing Concepts",
        content: "Help me understand marketing strategies for my test.",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Grade My Business Answers",
        content: "Can you grade my responses to business studies questions?",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Improve Business Analysis",
        content: "How can I improve my business analysis skills?",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Detailed Feedback",
        content: "Can you review my business answers and provide feedback?",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Exam Prep Plan",
        content: "Help me create a study plan for Business Studies.",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Review Marking Scheme",
        content: "How does my answer compare to business guidelines?",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Understanding Economic Indicators",
        content: "Can you explain key economic indicators?",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Targeted Tutoring",
        content: "Which business topics should I focus on to boost my score?",
        icon: "📊",
        category: "business-studies",
      },
      {
        label: "Retake Practice Questions",
        content: "Can I try another business question and get feedback?",
        icon: "📊",
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
    title: "🧭 CoachXpert",
    text: "Guiding your career growth.",
    category: "I’m your personal Career Coach",
    assistantId: CareerCoachAssistants.CareerXpert,
    suggest: [
      {
        label: "🧭 Choosing Grade 9 Subjects",
        content: "What subjects should I choose in Grade 9?"
      },
      {
        label: "🧭 Aligning Subjects with Careers",
        content: "How do I align my subject choices with future career goals?"
      },
      {
        label: "🧭 Preparing for FET Phase",
        content: "How do I prepare for the transition from Grade 9 to FET?"
      },
      {
        label: "🧭 Creating a Study Plan",
        content: "How can I create an effective study plan for Grade 12?"
      },
      {
        label: "🧭 Exploring University Pathways",
        content: "Which university courses align with my subjects?"
      },
      {
        label: "🧭 Preparing for Bursary Applications",
        content: "How do I get ready to apply for bursaries?"
      },
      {
        label: "🧭 Setting Career Goals",
        content: "How do I set career goals while still in school?"
      },
      {
        label: "🧭 Exploring Vocational Training",
        content: "What are the best vocational training options in South Africa?"
      },
      {
        label: "🧭 Understanding TVET Colleges",
        content: "What are TVET colleges, and should I apply?"
      },
      {
        label: "🧭 Planning for High-Demand Careers",
        content: "Which high-demand careers should I consider?"
      },
      {
        label: "🧭 Finding Mentorship Opportunities",
        content: "How can I find a mentor in my field of interest?"
      },
      {
        label: "🧭 Balancing Studies and Extracurriculars",
        content: "How do I balance my studies with sports and hobbies?"
      }
    ]
  },
  {
    title: "🎓 BursaryFinder",
    text: "Unlock scholarships for you.",
    category: "I’m here to help you find bursaries             ",
    assistantId: CareerCoachAssistants.BursaryFinder,
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
    category: "I’m here to help you find a place to study",
    assistantId: CareerCoachAssistants.CampusNavigator,
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
    category: " I’m here to help you discover careers",
    assistantId: CareerCoachAssistants.CareerExplorer,
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
    title: "📖 PersonalityQuiz",
    text: "Pursue the ideal courses.",
    category: "courses",
    assistantId: CareerCoachAssistants.PersonalityQuiz,
    suggest: [
      {
        label: "📚 Discover My Personality",
        content: "Can you help me discover my personality type before we dive into career suggestions?"
      },
      {
        label: "📚 Start My Personality Assessment",
        content: "I’d like to start the personality assessment to learn more about myself. How do I begin?"
      },
      {
        label: "📚 What’s My Personality Type?",
        content: "Can you help me find out my personality type first? I want to see how it affects my study habits."
      },
      {
        label: "📚 Take the Quiz for Personal Insights",
        content: "Could you guide me through the personality quiz? I’m curious about my strengths and weaknesses."
      },
      {
        label: "📚 Identify My Core Traits",
        content: "I want to know my core personality traits. Can I start with an assessment?"
      },
      {
        label: "📚 Discover Career Paths for My Personality",
        content: "Can you help me identify my personality type first, so I can see which careers might fit me?"
      },
      {
        label: "📚 Find Subjects that Match My Personality",
        content: "Can I take the personality assessment to see which school subjects might be a good match for me?"
      },
      {
        label: "📚 Get Started with Self-Discovery",
        content: "I’m ready to explore my personality type and see how it can help with my career goals. Can we start the quiz?"
      }
    ],
  },
  {
    title: "🏛 SubjectWise",
    text: "Helping You Choose the Right Subjects, for Your Dream Career",
    category: "education-path",
    assistantId: CareerCoachAssistants.SubjectWise,
    suggest: [
      {
        label: "🏛 Top Tips for Subject Selection",
        content: "How do I decide which subjects to choose?"
      },
      {
        label: "🏛 Best Subjects for My Career",
        content: "Which subjects should I choose to become an engineer?"
      },
      {
        label: "🏛 Choosing Between Math Options",
        content: "Should I take Pure Mathematics or Mathematical Literacy?"
      },
      {
        label: "🏛 Personality-Based Subjects",
        content: "Which subjects align with my personality type?"
      },
      {
        label: "🏛 University Entry Requirements",
        content: "What subjects are required for university admission in South Africa?"
      },
      {
        label: "🏛 Exploring Elective Options",
        content: "Which electives should I take if I enjoy science and technology?"
      },
      {
        label: "🏛 Balancing Grades and Interests",
        content: "How do I pick subjects I like and also perform well in?"
      },
      {
        label: "🏛 Subjects for a Creative Career",
        content: "What are the best subjects for a career in the arts?"
      },
      {
        label: "🏛 Career Opportunities with Math Literacy",
        content: "What careers are possible with Mathematical Literacy?"
      },
      {
        label: "🏛 Changing My Subject Choices",
        content: "Can I change my subjects after starting Grade 10?"
      },
      {
        label: "🏛 Impact of Subject Choices",
        content: "How will my subject choices affect my career options?"
      },
      {
        label: "🏛 Subjects for Medical Careers",
        content: "What subjects should I choose to become a doctor?"
      },
      {
        label: "🏛 Importance of Life Sciences",
        content: "Why is Life Sciences important for my career?"
      },
      {
        label: "🏛 Subject Choices for Law",
        content: "Which subjects are best for pursuing a career in law?"
      },
      {
        label: "🏛 Business-Focused Subjects",
        content: "What subjects should I take if I want to start my own business?"
      },
      {
        label: "🏛 Subjects for Engineering Pathways",
        content: "Which subjects will help me get into engineering?"
      },
      {
        label: "🏛 Math Requirements for Careers",
        content: "What careers require Pure Mathematics?"
      },
      {
        label: "🏛 Balancing Practical and Academic Goals",
        content: "What subjects are best if I want both a degree and practical skills?"
      },
      {
        label: "🏛 Subjects for Creative Industries",
        content: "What subjects should I take for a career in design or media?"
      },
      {
        label: "🏛 Exploring Geography as a Subject",
        content: "What careers can I pursue with Geography as a subject?"
      }
    ]   
  }
];

export const teacher = [
  {
    title: "📝📚 LessonCraft",
    text: "CAPS-Aligned Lesson and Activity Designer",
    category: "I’m your CAPS-Aligned Lesson and Activity Designer.",
    assistantId: TeacherAssistants.LessonCraft,
    suggest: [
      {
        label: "📝📚 Generate CAPS-Compliant Lesson Plans",
        content: "Provides structured lesson outlines aligned with CAPS requirements, ensuring curriculum consistency across subjects."
      },
      {
        label: "📝📚 Create Engaging Activities and Resources",
        content: "Suggests interactive and hands-on activities tailored to specific topics, making lessons dynamic and engaging for students."
      },
      {
        label: "📝📚 Localize Content for Cultural Relevance",
        content: "Customizes content with examples and references from South African contexts, making learning more relatable for students."
      },
      {
        label: "📝📚 Suggest Cross-Curricular Links",
        content: "Offers ideas for integrating concepts across subjects, such as connecting environmental studies in Geography with Physical Sciences."
      },
      {
        label: "📝📚 Differentiate for Diverse Learning Levels",
        content: "Designs activities and resources suitable for various proficiency levels, helping teachers support mixed-ability classes."
      },
      {
        label: "📝📚 Provide Multimedia and Technology Integration Tips",
        content: "Recommends digital tools and multimedia elements (like videos or slides) to enhance lesson delivery and student engagement."
      }
    ]
  },
  {
    title: "🧩📊 AssessGenie",
    text: "Flexible Assessment and CAPS-Consistent Grading Tool",
    category: "I’m a Flexible Assessment and CAPS-Consistent Grading Tool",
    assistantId: TeacherAssistants.AssessGenie,
    suggest: [
      {
        label: "🧩📊 Create CAPS-Aligned Assessments",
        content: "Generates quizzes, tests, and exams tailored to CAPS standards, saving teachers time and ensuring curriculum alignment."
      },
      {
        label: "🧩📊 Design Rubrics for Fair Grading",
        content: "Produces clear rubrics that outline grading criteria, promoting transparency and helping students understand expectations."
      },
      {
        label: "🧩📊 Generate Diverse Question Types",
        content: "Provides a range of question formats (e.g., multiple-choice, essays) to assess different skills, from factual recall to critical thinking."
      },
      {
        label: "🧩📊 Create Differentiated Assessments",
        content: "Adapts assessments to cater to various skill levels, ensuring every student can demonstrate their understanding effectively."
      },
      {
        label: "🧩📊 Offer Feedback Tips for Improvement",
        content: "Suggests feedback strategies that encourage growth, allowing students to understand strengths and areas for improvement."
      },
      {
        label: "🧩📊 Assist with Self and Peer Assessment Tools",
        content: "Provides tools for student self-assessment and peer evaluation, promoting reflective learning and collaboration."
      }
    ]
  },
  {
    title: "🌐🔍 ClarityBot",
    text: "Multi-Language Explanation and Example Generator",
    category: "I’m your Multi-Language Explanation and Example Generator",
    assistantId: TeacherAssistants.ClarityBot,
    suggest: [
      {
        label: "🌐🔍 Translate Complex Concepts Across Languages",
        content: "Provides simplified explanations in multiple South African languages, improving comprehension in multilingual classrooms."
      },
      {
        label: "🌐🔍 Provide Definitions and Contextualized Vocabulary",
        content: "Supplies accessible definitions and vocabulary explanations, helping students grasp technical terms and academic language."
      },
      {
        label: "🌐🔍 Offer Step-by-Step Explanations",
        content: "Breaks down difficult concepts into manageable steps, ensuring clarity and reducing cognitive load for students."
      },
      {
        label: "🌐🔍 Adapt Explanations for Different Proficiency Levels",
        content: "Tailors explanations based on students’ language proficiency and comprehension level, ensuring accessibility for all learners."
      },
      {
        label: "🌐🔍 Generate Analogies and Real-World Examples",
        content: "Uses familiar, culturally relevant analogies to make abstract concepts easier to understand for diverse learners."
      },
      {
        label: "🌐🔍 Suggest Visual Aids and Diagrams",
        content: "Recommends visual aids and diagrams that complement verbal explanations, supporting varied learning styles and enhancing retention."
      }
    ]
  },
  {
    title: "📈🧭 InsightMax",
    text: "Student Progress Tracker with Tailored Support",
    category: "I’m your Student Progress Tracker with Tailored Support",
    assistantId: TeacherAssistants.InsightMax,
    suggest: [
      {
        label: "📈🧭 Monitor Individual and Class-Wide Progress",
        content: "Tracks individual and overall class performance, providing teachers with insights into each student's progress on specific topics."
      },
      {
        label: "📈🧭 Offer Data-Driven Insights for Lesson Adjustment",
        content: "Provides feedback on lesson effectiveness, helping teachers adjust teaching methods based on student performance data."
      },
      {
        label: "📈🧭 Track Improvements Over Time",
        content: "Monitors progress over weeks or terms, helping teachers see improvements and make data-driven decisions on pacing."
      },
      {
        label: "📈🧭 Identify Learning Gaps and Intervention Needs",
        content: "Highlights areas where students may need extra help, enabling timely intervention and targeted support for at-risk students."
      },
      {
        label: "📈🧭 Suggest Remediation Activities for Struggling Students",
        content: "Recommends targeted activities and resources to help struggling students catch up and close knowledge gaps."
      },
      {
        label: "📈🧭 Identify Common Misconceptions",
        content: "Recognizes patterns in student errors, enabling teachers to address common misconceptions early and improve concept clarity."
      }
    ]
  },
  {
    title: "💡🤝 EngageAI",
    text: "Interactive Learning and Critical Thinking Enhancer",
    category: " I’m a Interactive Learning and Critical Thinking Enhancer",
    assistantId: TeacherAssistants.EngageAI,
    suggest: [
      {
        label: "💡🤝 Generate Group Activity Ideas",
        content: "Suggests engaging group activities like debates, projects, and role-plays, promoting collaboration and critical thinking in class."
      },
      {
        label: "💡🤝 Facilitate Peer-Led Discussions",
        content: "Offers guidance on structuring peer discussions, helping students practice communication skills and build confidence in sharing ideas."
      },
      {
        label: "💡🤝 Create Culturally Relevant Discussion Prompts",
        content: "Provides prompts based on local issues and cultural contexts, helping students connect course material with real-world relevance."
      },
      {
        label: "💡🤝 Encourage Creative Problem-Solving Activities",
        content: "Suggests problem-solving tasks that challenge students to think creatively, helping them apply concepts to new situations."
      },
      {
        label: "💡🤝 Design Role-Play and Simulation Exercises",
        content: "Helps teachers set up simulations and role-plays to explore topics in depth, encouraging hands-on learning and empathy."
      },
      {
        label: "💡🤝 Introduce Reflective Thinking Prompts",
        content: "Provides reflective questions that encourage students to analyze their learning, fostering self-awareness and metacognitive skills."
      }
    ]
  },
  {
    title: "💙🕊️ WellnessWatch",
    text: "Mental Health and Classroom Wellbeing Monitor",
    category: "I’m your Mental Health and Classroom Wellbeing Monitor",
    assistantId: TeacherAssistants.WellnessWatch,
    suggest: [
      {
        label: "💙🕊️ Identify Signs of Student Stress and Burnout",
        content: "Monitors classroom behavior and provides tips on identifying early signs of stress, helping teachers support student well-being."
      },
      {
        label: "💙🕊️ Promote Inclusivity and Positive Interactions",
        content: "Suggests activities and guidelines that encourage inclusivity, making all students feel valued and supported."
      },
      {
        label: "💙🕊️ Suggest Mindfulness and Focus Exercises",
        content: "Recommends exercises that can reduce stress, increase focus, and create a calmer classroom environment for students."
      },
      {
        label: "💙🕊️ Support Teachers with Self-Care Tips",
        content: "Shares practical self-care strategies for teachers to manage their workload, reduce stress, and maintain a positive mindset."
      },
      {
        label: "💙🕊️ Provide Classroom Management Strategies",
        content: "Offers techniques for managing disruptive behavior constructively, fostering a positive learning environment."
      },
      {
        label: "💙🕊️ Encourage Peer Support and Community Building",
        content: "Offers ideas for fostering peer support among students, creating a supportive community within the classroom."
      }
    ]
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
