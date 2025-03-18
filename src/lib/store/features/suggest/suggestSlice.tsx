import { createSlice } from "@reduxjs/toolkit"

export enum TutorAssistants {
  Mathematics = "asst_quosLWwOUiWyRxoUF3sn9RBE",
  MathsLiteracy = "asst_GNr95kfHSeLTztEukBB1v3We",
  English = "asst_vaBKqqnSfyus1suFdb8BGqvK",
  PhysicalSciences = "asst_PZLeW6lOto3Aq1Dbm4MId5Ji",
  EconomicsTutor = "asst_aTBwaKFPUyuF0Mf0jECA0ogY",
  Accounting = "asst_QwfjmzMvjalp9v5x6y1SAd68",
  History = "asst_Z51zCCMIQHcHIjskMTCdUShB",
  BusinessStudies = "asst_wQYJcKbahjyXKsqfEBj09lXz",
  LifeSciences = "asst_tmcVNihaQQXIJsgBBsmStbVh",
  Geography = "asst_7pMzMLlE5LixiysB2hFXJWKH",
  ComputerApplicationsTechnology = "asst_8ccbmmtDJWTZ7ABAdUSzbax8",
  InformationTechnology = "asst_ub7PKtIFXKBAPOlqqcFoYy7B",
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
  BusinessStudies = "asst_P5dJ8UFGPSa9A2BtYgDr84FD",
  Mathematics = "asst_DQhvAipfIA6bPsXFi8Az1sYw",
  MathematicalLiteracy = "asst_lgVcOWp45uuUf2BtodHO7gKS",
  PhysicalSciences = "asst_GqA9eIAqD6X4OEYfZRyNx6y0",
  english = "asst_H8YzZfwkoBySa9pGwz2zyz35"
}
// export enum TeacherAssistants {
//   // LessonCraft = "asst_nxJVZh17j23ovTc4923NOdc4",
//   // AssessGenie = "asst_Vjl8Br7Coh1M2waAnahdbvZ7",
//   // InsightMax = "asst_BvSZyrPkHJUu27VBJgigiMgK",
//   // EngageAI = "asst_UFL50keGMUrmNRlR2Hdh1yfx",
//   // ClarityBot = "asst_h9xwAFmreZXrVWbjlDujBTrE",
//   // WellnessWatch = "asst_RDT2lipIUg4wCmvJL3Sedes8", 
//   // LifeSciences = "asst_74NyBtJTV1VWDufZc6E0xjla",
//   // ComputerApplicationTechnology = "asst_8ccbmmtDJWTZ7ABAdUSzbax8",
//   // InformationTechnology = "asst_ub7PKtIFXKBAPOlqqcFoYy7B",
// }

export const defaultCareerCoachAssistant = {
  label: "",
  content: "Ask me any questions",
  icon: "🔢",
  category: " I’m your Espen",
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
  assistantId: "asst_QwfjmzMvjalp9v5x6y1SAd68",
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
    category: "I’m your personal Mathematics tutor",
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
  {
    "title": "📐 Mathematical Literacy",
    "text": "Grasp math concepts and excel in exams.",
    "label": "Mathematical Literacy",
    "isDefault": "true",
    "suggest": [
      {
        "label": "Practice Statistics Questions",
        "content": "Can you provide statistics questions from past exams?",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Finance Focus",
        "content": "Help me practice financial math questions from past papers.",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Grade My Math Answer",
        "content": "Can you grade my response to this math problem?",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Improve Problem Solving",
        "content": "How can I improve my problem-solving in math literacy?",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Detailed Feedback",
        "content": "Can you review my math literacy answers and provide feedback?",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Review Marking Scheme",
        "content": "How does my math answer compare to the marking guidelines?",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Targeted Tutoring",
        "content": "Which math literacy topics should I focus on to improve my score?",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Retake Practice Questions",
        "content": "Can I try another math problem and get feedback?",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Exam Prep Plan",
        "content": "Help me create a study plan for Mathematical Literacy.",
        "icon": "📐",
        "category": "maths-literacy"
      },
      {
        "label": "Understanding Practical Math Concepts",
        "content": "Can you explain practical concepts like interest calculations?",
        "icon": "📐",
        "category": "maths-literacy"
      }
    ],
    "content": "Grasp math concepts and excel in exams.",
    "icon": "📐",
    "category": "maths-literacy",
    "assistantId": TutorAssistants.MathsLiteracy,
    "instructions": "System settings:\n  Tool use: enabled.\n\n  Instructions:\n  - You are an artificial intelligence agent responsible for helping test real-time voice capabilities\n  - Please make sure to respond with a helpful voice via audio\n  - Be kind, helpful, and courteous\n  - It is okay to ask the user questions\n  - Use tools and functions you have available liberally, it is part of the training apparatus\n  - Be open to exploration and conversation\n  - Remember: this is just for fun and testing!\n\n  Personality:\n  - Be upbeat and genuine\n  - Try speaking quickly as if excited"
  }
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
    title: "📚 Business Studies",
    text: "Deliver CAPS-aligned, NSC-ready lessons and assessments for Grades 10-12. Equip your students with real-world business insights through engaging activities tailored to South Africa's unique business context.",
    category: "I’m your CAPS-aligned Business Studies Assistant.",
    assistantId: TeacherAssistants.BusinessStudies,
    label: "BusinessStudies",
    isDefault: "true",
    suggest: [
      {
        "label": "📚 CAPS-Aligned Lesson and Activity Designer",
        "content": "Design a Grade 10 lesson plan on 'Forms of Ownership,' including objectives, key content, and a group activity related to South African businesses."
      },
      {
        "label": "📝 Flexible Assessment and CAPS-Consistent Grading Tool",
        "content": "Generate a Grade 12 mid-year exam paper on 'Management and Leadership,' with a detailed memorandum and CAPS-aligned rubrics."
      },
      {
        "label": "🔍 Multi-Language Explanation and Example Generator",
        "content": "Explain 'SWOT Analysis' for Grade 10 in simple terms, with an example of a local South African startup."
      },
      {
        "label": "📊 Student Progress Tracker with Tailored Support",
        "content": "Analyze Grade 12 learners’ performance in 'Investment and Insurance' and recommend intervention strategies."
      },
      {
        "label": "💡 Interactive Learning and Critical Thinking Enhancer",
        "content": "Design a role-play activity for Grade 12 on 'Business Ethics,' where students debate ethical dilemmas in advertising."
      },
      {
        "label": "💙 Mental Health and Classroom Wellbeing Monitor",
        "content": "Provide time-saving strategies for Grade 12 teachers during exam preparation for 'Business Roles.'"
      }
    ],
    content: "CAPS-aligned Business Studies Assistant.",
    icon: "📚",
    instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - You are a teaching assistant focused on CAPS-aligned lessons and engaging activities for Business Studies.
      - Provide real-world insights and examples tailored to South Africa’s business context.
      - Be supportive and dynamic in assisting teachers with structured plans and strategies.

      Personality:
      - Professional and resourceful.
      - Engaging and culturally relevant in your approach.
    `
  },
  {
    title: "➕ Mathematics",
    text: "Simplify your Grade 10-12 math teaching with CAPS-aligned problem sets, step-by-step solutions, and differentiated strategies, all tailored to the NSC curriculum.",
    category: "I’m your Mathematics Assistant.",
    assistantId: TeacherAssistants.Mathematics,
    label: "Mathematics",
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
    content: "CAPS-aligned Mathematics Assistant.",
    icon: "➕",
    instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - Provide CAPS-aligned problem sets and assessments for Mathematics.
      - Offer step-by-step solutions and strategies tailored to the NSC curriculum.
      - Be detailed, structured, and engaging in your support for math educators.

      Personality:
      - Analytical and accurate.
      - Clear and supportive in simplifying complex concepts.
    `
  },
  {
    title: "📊 Mathematical Literacy",
    text: "Empower your Grade 10-12 students to apply math in real-life scenarios with CAPS-aligned, NSC-focused lessons and practical activities designed for South African contexts.",
    category: "I’m your Mathematical Literacy Assistant.",
    assistantId: TeacherAssistants.MathematicalLiteracy,
    label: "MathematicalLiteracy",
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
    content: "CAPS-aligned Mathematical Literacy Assistant.",
    icon: "📊",
    instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - Assist with Mathematical Literacy lessons and activities.
      - Provide real-world examples and culturally relevant scenarios for practical learning.
      - Be engaging and adaptable to the diverse needs of students.

      Personality:
      - Practical and relatable.
      - Focused on connecting math with everyday applications.
    `
  },
  {
    title: "🧪 Physical Sciences",
    text: "Bring science to life for Grade 10-12 learners with CAPS-aligned, NSC-ready experiments, simulations, and clear explanations that simplify complex concepts.",
    category: "I’m your Physical Sciences Assistant.",
    assistantId: TeacherAssistants.PhysicalSciences,
    label: "PhysicalSciences",
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
    content: "CAPS-aligned Physical Sciences Assistant.",
    icon: "🧪",
    instructions: `
      System settings:
      Tool use: enabled.

      Instructions:
      - Offer CAPS-aligned experiments, simulations, and concept explanations.
      - Simplify complex science topics to make them accessible for all learners.
      - Be clear, hands-on, and supportive in assisting teachers.

      Personality:
      - Precise and scientific.
      - Interactive and practical in approach.
    `
  }
];


export const tutor = [
  {
    title: "🔢 Mathematics",
    text: "Master math concepts and excel in exams.",
    category: "I’m your personal Mathematics tutor",
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
    text: "Master science concepts and boost your exam marks.",
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
    title: "📈 Economics",
    category: "I’m your personal Economics tutor ",
    text: "Master economic concepts and maximize your grades.",
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
    text: "Grasp key math skills and succeed in tests.",
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
    text: "Learn accounting principles and achieve top results.",
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
    title: "🧬 Life Sciences",
    text: "Learn biology concepts and excel in exams.",
    assistantId: TutorAssistants.LifeSciences,
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
    text: "Understand business principles and ace every exam.",
    assistantId: TutorAssistants.BusinessStudies,
    suggest: [
      {
        label: "CAPS-Aligned Lesson and Activity Designer",
        content: "Design a Grade 10 lesson plan on 'Forms of Ownership,' including objectives, key content, and a group activity related to South African businesses.",
        icon: "📚",
        category: "lesson-craft",
      },
      {
        label: "Flexible Assessment and CAPS-Consistent Grading Tool",
        content: "Generate a Grade 12 mid-year exam paper on 'Management and Leadership,' with a detailed memorandum and CAPS-aligned rubrics.",
        icon: "📝",
        category: "assess-genie",
      },
      {
        label: "Multi-Language Explanation and Example Generator",
        content: "Explain 'SWOT Analysis' for Grade 10 in simple terms, with an example of a local South African startup.",
        icon: "🔍",
        category: "clarity-bot",
      },
      {
        label: "Student Progress Tracker with Tailored Support",
        content: "Analyze Grade 12 learners’ performance in 'Investment and Insurance' and recommend intervention strategies.",
        icon: "📊",
        category: "insight-max",
      },
      {
        label: "Interactive Learning and Critical Thinking Enhancer",
        content: "Design a role-play activity for Grade 12 on 'Business Ethics,' where students debate ethical dilemmas in advertising.",
        icon: "💡",
        category: "engage-ai",
      },
      {
        label: "Mental Health and Classroom Wellbeing Monitor",
        content: "Provide time-saving strategies for Grade 12 teachers during exam preparation for 'Business Roles.'",
        icon: "💙",
        category: "wellness-watch",
      },
    ],

  },
  {
    title: "🌍 Geography",
    text: "Understand global systems and score high in exams.",
    assistantId: TutorAssistants.Geography,
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
  {
    title: "🖥️ Information Technology",
    text: "Develop coding and problem-solving skills.",
    category: "I’m your Information Technology Assistant.",
    assistantId: TutorAssistants.InformationTechnology,
    suggest: [
      {
        label: "💡🤝 Generate Group Activity Ideas",
        content: "Suggests engaging group activities like debates, projects, and role-plays, promoting collaboration and critical thinking in class."
      },
      {
        label: "💡🤝 Facilitate Peer-Led Discussions",
        content: "Offers guidance on structuring peer discussions, helping students practice communication skills and build confidence in sharing ideas."
      }
    ]
  },
  {
    title: "⏳ History",
    text: "Explore historical events and their lasting impact.",
    category: "I’m your History Assistant.",
    assistantId: TutorAssistants.History,
    suggest: []
  },
  {
    title: "💻 Computer Applications Technology",
    text: " Build digital skills with, CAPS-aligned lessons.",
    category: "I’m your Computer Applications Technology Assistant.",
    assistantId: TutorAssistants.ComputerApplicationsTechnology,
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
    category: "I'm here to help you discover your personality type and align it with the best career path for you",
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
    category: "Hi Niev! I'm here to guide you through your Grade 10 subject selection and help you make the best choices for your future. Let’s get started!",
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
    title: "📚 Business Studies",
    text: "Deliver CAPS-aligned, NSC-ready lessons and assessments for Grades 10-12. Equip your students with real-world business insights through engaging activities tailored to South Africa's unique business context.",
    category: "I’m your CAPS-aligned Business Studies Assistant.",
    assistantId: TeacherAssistants.BusinessStudies,
    suggest: [
      {
        "label": "📚 CAPS-Aligned Lesson and Activity Designer",
        "content": "Design a Grade 10 lesson plan on 'Forms of Ownership,' including objectives, key content, and a group activity related to South African businesses."
      },
      {
        "label": "📝 Flexible Assessment and CAPS-Consistent Grading Tool",
        "content": "Generate a Grade 12 mid-year exam paper on 'Management and Leadership,' with a detailed memorandum and CAPS-aligned rubrics."
      },
      {
        "label": "🔍 Multi-Language Explanation and Example Generator",
        "content": "Explain 'SWOT Analysis' for Grade 10 in simple terms, with an example of a local South African startup."
      },
      {
        "label": "📊 Student Progress Tracker with Tailored Support",
        "content": "Analyze Grade 12 learners’ performance in 'Investment and Insurance' and recommend intervention strategies."
      },
      {
        "label": "💡 Interactive Learning and Critical Thinking Enhancer",
        "content": "Design a role-play activity for Grade 12 on 'Business Ethics,' where students debate ethical dilemmas in advertising."
      },
      {
        "label": "💙 Mental Health and Classroom Wellbeing Monitor",
        "content": "Provide time-saving strategies for Grade 12 teachers during exam preparation for 'Business Roles.'"
      }
    ],
  },
  {
    title: "➕ Mathematics",
    text: "Simplify your Grade 10-12 math teaching with CAPS-aligned problem sets, step-by-step solutions, and differentiated strategies, all tailored to the NSC curriculum.",
    category: "I’m your Mathematics Assistant.",
    assistantId: TeacherAssistants.Mathematics,
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
    title: "📊 Mathematical Literacy",
    text: "Empower your Grade 10-12 students to apply math in real-life scenarios with CAPS-aligned, NSC-focused lessons and practical activities designed for South African contexts.",
    category: "I’m your Mathematical Literacy Assistant.",
    assistantId: TeacherAssistants.MathematicalLiteracy,
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
    title: "🧪 Physical Sciences",
    text: "Bring science to life for Grade 10-12 learners with CAPS-aligned, NSC-ready experiments, simulations, and clear explanations that simplify complex concepts.",
    category: "I’m your Physical Sciences Assistant.",
    assistantId: TeacherAssistants.PhysicalSciences,
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
  // {
  //   title: "🌱 Life Sciences",
  //   text: "Teach Grade 10-12 students the wonders of biology with CAPS-aligned, NSC-focused lessons and activities that connect key concepts to South Africa’s biodiversity and health challenges.",
  //   category: "I’m your Life Sciences Assistant.",
  //   assistantId: TeacherAssistants.LifeSciences,
  //   suggest: [
  //     {
  //       label: "💡🤝 Generate Group Activity Ideas",
  //       content: "Suggests engaging group activities like debates, projects, and role-plays, promoting collaboration and critical thinking in class."
  //     },
  //     {
  //       label: "💡🤝 Facilitate Peer-Led Discussions",
  //       content: "Offers guidance on structuring peer discussions, helping students practice communication skills and build confidence in sharing ideas."
  //     },
  //     {
  //       label: "💡🤝 Create Culturally Relevant Discussion Prompts",
  //       content: "Provides prompts based on local issues and cultural contexts, helping students connect course material with real-world relevance."
  //     },
  //     {
  //       label: "💡🤝 Encourage Creative Problem-Solving Activities",
  //       content: "Suggests problem-solving tasks that challenge students to think creatively, helping them apply concepts to new situations."
  //     },
  //     {
  //       label: "💡🤝 Design Role-Play and Simulation Exercises",
  //       content: "Helps teachers set up simulations and role-plays to explore topics in depth, encouraging hands-on learning and empathy."
  //     },
  //     {
  //       label: "💡🤝 Introduce Reflective Thinking Prompts",
  //       content: "Provides reflective questions that encourage students to analyze their learning, fostering self-awareness and metacognitive skills."
  //     }
  //   ]
  // },
  {
    title: "📖 English",
    text: "Enhance your English skills and boost your grades.",
    category: "I’m your personal English tutor",
    assistantId: TeacherAssistants.english,
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
  }
];


interface SuggestState {
  suggest: any;
  suggests: any;
  focusSuggests: any;
  prompt: any;
}

const initialState: SuggestState = {
  suggest: {},
  suggests: [],
  focusSuggests: [],
  prompt: [],
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
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
  },
});

export const { setSuggests, setSuggest, setFocusSuggests, setPrompt } = suggestSlice.actions;

export default suggestSlice.reducer;
