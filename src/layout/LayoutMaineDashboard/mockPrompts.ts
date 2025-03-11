type Tool = {
    icon: string;
    label: string;
    content: string;
    toolsId: string;
};

export const subjectsData: Record<string, { tools: Tool[]; prompts: Record<string, Record<string, string[]>> }> = {
    mathematics: {
        tools: [
            { icon: "🏆", label: "Exam Mastery", content: "Want to practice real past math papers? I’ll grade your answers, provide feedback based on official marking guidelines, and help you strengthen your skills!", toolsId: "exam_mastery" },
            { icon: "📸", label: "Homework Hero", content: "Stuck on a tricky math problem? Take a photo, and I’ll guide you step by step to the correct solution.", toolsId: "homework_hero" },
            { icon: "🎯", label: "AI-Powered Personalized Tutoring", content: "Struggling with calculus, algebra, or statistics? I’ll break them down into easy-to-follow steps, ensuring you understand every detail. Plus, I’ll track your progress and create a personalized study plan to help you improve!", toolsId: "ai_tutoring" },
            { icon: "✍️", label: "Smart Math Notes Generator", content: "I’ll generate customized study notes based on your topics, making revision easier and more effective!", toolsId: "math_notes" }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Provide a past NSC exam question on basic trigonometry and grade my answer with feedback.",
                    "Share an algebraic factorization question from a Grade 10 NSC paper and assess my response using official guidelines.",
                    "Show me a past exam question on linear functions for Grade 10 and guide me through it step by step.",
                    "Offer a geometry question from a previous Grade 10 NSC exam and evaluate my solution for errors."
                ],
                grade_11: [
                    "Give me a past NSC exam question on geometric sequences and grade my answer with feedback.",
                    "Provide a probability question involving the basic principle of counting for Grade 11 and mark my response using official guidelines.",
                    "Show me a past NSC exam question on quadratic functions and solve it step by step.",
                    "Give me a question from a previous NSC exam on analytical geometry and check my approach for errors."
                ],
                grade_12: [
                    "Give me a past NSC exam question on calculus (derivatives or integrals) and grade my answer with feedback.",
                    "Provide a probability question from a Grade 12 NSC paper and mark my response using official guidelines.",
                    "Show me a past NSC exam question on trigonometry identities and help me solve it step by step.",
                    "Give me a complex numbers question from a previous NSC exam and check my solution for errors."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I have a geometry question on parallelograms. Let me upload a photo—walk me through the solution.",
                    "Assist me with solving this simultaneous equation step by step.",
                    "Help solve a Grade 10 word problem involving percentages.",
                    "Provide guidance on a simple probability question and explain the solution using a probability tree."
                ],
                grade_11: [
                    "I have a trigonometry question involving angles of elevation. Let me upload a photo—guide me through the solution.",
                    "Help me solve this complex number equation step by step.",
                    "Assist with solving a Grade 11 word problem involving growth and decay.",
                    "Walk me through a statistical question using grouped data with step-by-step explanations."
                ],
                grade_12: [
                    "I have a trigonometry question on 3D problems. Let me upload a photo—guide me through the solution.",
                    "Help me solve this logarithm equation step by step.",
                    "I need help solving a financial math problem involving compound interest.",
                    "Guide me through a probability question using a tree diagram to explain the steps."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Go over quadratic equations with a worked past paper example for Grade 10.",
                    "Take me through interpreting points of intersection for linear and quadratic functions.",
                    "Explain a past paper question on the importance of congruency in triangles and its applications.",
                    "Guide me through solving area problems involving circles using a past paper example."
                ],
                grade_11: [
                    "Explain the concept of functions and transformations with a practical example from past papers.",
                    "Take me through solving inequalities and discuss critical points with visual aids.",
                    "Break down a past paper question on the binomial theorem.",
                    "Discuss solving angles in a circle using properties of cyclic quadrilaterals."
                ],
                grade_12: [
                    "Explain arithmetic and geometric sequences with a worked NSC past paper example.",
                    "Take me through a cubic function sketching question, including turning points and intercepts.",
                    "Break down a past paper question on the second derivative test and how to apply it.",
                    "Explain how to solve a Grade 12 NSC exam question on solving simultaneous equations graphically."
                ]
            },
            math_notes: {
                grade_10: [
                    "Create concise study notes on properties of parallel lines and angles.",
                    "Summarize key formulas for solving basic algebraic expressions in Grade 10.",
                    "Generate a cheat sheet for basic statistical concepts and their uses.",
                    "Prepare a quick study guide on simple interest calculations and applications."
                ],
                grade_11: [
                    "Generate concise study notes on the laws of exponents.",
                    "Create a summary of key concepts in analytical geometry for the Grade 11 syllabus.",
                    "Prepare a revision cheat sheet for sequences and series with example questions.",
                    "Provide a quick study guide on transformations in mathematics with diagrams."
                ],
                grade_12: [
                    "Generate concise study notes on differentiation rules and their applications.",
                    "Summarize key formulas and concepts for probability and statistics in the NSC syllabus.",
                    "Create a revision cheat sheet for trigonometry identities and their proofs.",
                    "Give me a quick study guide on financial mathematics, including annuities and present value."
                ]
            }
        },
    },
    physical_sciences: {
        tools: [
            { icon: "🏆", label: "Exam Mastery", content: "Want to tackle real NSC past Physical Sciences papers? I’ll grade your responses, offer feedback aligned with official marking schemes, and boost your exam readiness!", toolsId: "exam_mastery" },
            { icon: "📸", label: "Homework Hero", content: "Stuck on a challenging Physics or Chemistry problem? Snap a photo, and I'll guide you step by step to the solution with clear explanations.", toolsId: "homework_hero" },
            { icon: "🎯", label: "AI-Powered Personalized Tutoring", content: "Struggling with mechanics, electricity, or waves? I'll simplify complex topics into manageable steps, ensuring you understand completely, while tracking your progress and tailoring a study plan just for you!", toolsId: "ai_tutoring" },
            { icon: "✍️", label: "Smart Study Notes Generator", content: "I'll craft personalized study notes based on your chosen topics, making your Physical Sciences revision efficient and focused!", toolsId: "science_notes" }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Provide me with a past NSC exam question on motion in one dimension and evaluate my response with detailed feedback.",
                    "Give a question on energy conservation from a past exam and help me solve it step by step.",
                    "Find a prior exam question on chemical bonding and assess my solution for accuracy."
                ],
                grade_11: [
                    "Provide me with a past NSC exam question on work, energy, and power and evaluate my response with feedback.",
                    "Show me a Grade 11 NSC exam question on gravitational fields and mark my answer using official guidelines.",
                    "Give a question on acids and bases and assess my solution for accuracy."
                ],
                grade_12: [
                    "Give me a past NSC exam question on projectile motion and grade my answer with detailed feedback.",
                    "Provide a past NSC exam question on energy conservation and mark my response using guidelines.",
                    "Give me a past NSC exam question on electric circuits and guide me through it step-by-step.",
                    "Provide a past NSC exam question on wave interference and check my solution for any errors."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I have a challenging question on forces and vectors. Let me upload a photo—guide me through solving it.",
                    "Help me solve this chemical reaction setup step by step.",
                    "I need assistance with a thermal expansion problem—guide me through the calculations.",
                    "Guide me through a question on separating mixtures using physical methods."
                ],
                grade_11: [
                    "I have a challenging kinematics question. Let me upload a photo—guide me through solving it.",
                    "Help me solve this complex equation step by step.",
                    "Assist me with an electric circuits problem—guide me through the calculations.",
                    "Guide me through a question on the molecular structure using covalent bonds."
                ],
                grade_12: [
                    "I'm stuck on a projectile motion problem; can you walk me through the solution step by step if I upload my photo?",
                    "Help me see the step-by-step energy transformation in a system by providing a clear, detailed explanation from my uploaded problem.",
                    "Assist me with an electric circuits problem? I’ve snapped a photo of the question and need a step-by-step breakdown.",
                    "I’m stuck with a wave phenomenon question—upload my photo and guide me through a detailed, stepwise solution."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Explain the principles of electricity and circuits with a worked past paper example.",
                    "Take me through a question about the kinetic theory of gases step by step.",
                    "Break down an NSC exam question on acids and bases, covering the concept of pH.",
                    "Explain how to solve a Grade 10 past exam question on lever systems."
                ],
                grade_11: [
                    "Explain chemical bonding theories with a worked past paper example.",
                    "Take me through a rotational motion question step by step.",
                    "Break down a question on gravitational fields from an NSC paper.",
                    "Explain how to solve a Grade 11 past exam question on heat and temperature."
                ],
                grade_12: [
                    "Break down the principles of energy conservation for me with a step-by-step tutorial and check questions.",
                    "Help me understand electric circuits and electromagnetic induction with tailored explanations and problem-solving examples.",
                    "Walk me through wave interference and diffraction concepts in detail, and provide practice exercises to monitor my progress."
                ]
            },
            science_notes: {
                grade_10: [
                    "Generate concise study notes on the types of chemical reactions.",
                    "Summarize key concepts and equations for mechanics in the NSC syllabus.",
                    "Create a revision cheat sheet for the laws of motion and examples.",
                    "Give me a quick study guide on electromagnetism, including basic concepts and applications."
                ],
                grade_11: [
                    "Generate concise study notes on capacitor circuits, including formulas and examples."
                ],
                grade_12: [
                    "Generate concise study notes on projectile motion, including key formulas and concepts for quick review.",
                    "Create exam-focused notes on energy conservation, highlighting essential points for fast recall.",
                    "Summarize the key concepts and formulas of electric circuits and electromagnetism in a clear, digestible guide.",
                    "Prepare a broad, comprehensive summary of wave phenomena, covering interference and diffraction for fast revision."
                ]
            }
        }
    },
    economics: {
        tools: [
            { icon: "🏆", label: "Exam Mastery", content: "Ready to ace Economics past exam papers? I'll provide detailed grading and feedback based on official marking guidelines to enhance your exam preparedness!", toolsId: "exam_mastery" },
            { icon: "📸", label: "Homework Hero", content: "Facing a tough Economics problem? Snap a photo, and I'll walk you through the solution with clear, step-by-step explanations.", toolsId: "homework_hero" },
            { icon: "🎯", label: "AI-Powered Personalized Tutoring", content: "Having trouble with microeconomics, macroeconomics, or economic indicators? I'll break down complex concepts into easy steps, track your learning, and customize a study plan for you!", toolsId: "ai_tutoring" },
            { icon: "✍️", label: "Smart Study Notes Generator", content: "I'll create personalized notes for your selected Economics topics, making your study sessions more focused and efficient!", toolsId: "economics_notes" }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Give me a past exam question on the basic economic problem and mark my response with feedback.",
                    "Provide a demand and supply question from a Grade 10 test paper and help grade my answer.",
                    "Show me a question on production factors from a previous exam and guide me to solve it step by step.",
                    "Provide a consumer price index problem from past test papers and assess my solution for accuracy."
                ],
                grade_11: [
                    "Give me a past test question on the business cycle phases and grade my response.",
                    "Provide a question from a Grade 11 paper on exchange rates and assess my answer.",
                    "Show me a fiscal policy question from past exams and help me solve it step by step.",
                    "Provide a balance of payments problem from previous test papers and check my solution for errors."
                ],
                grade_12: [
                    "Give me a past NSC exam question on economic environments and grade my answer with feedback.",
                    "Provide a question on inflation targeting from an NSC paper and help mark my response.",
                    "Show me a past NSC exam question on monetary policy and assist in solving it step by step.",
                    "Give me a macroeconomic problem from a previous NSC exam and evaluate my solution for errors."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I have a question on the circular flow model. Let me upload a photo—guide me through the solution.",
                    "Help me understand a question about market structures with a detailed walkthrough.",
                    "I need assistance with a problem on monetary policy implications.",
                    "Guide me through an elasticity question and explain the steps."
                ],
                grade_11: [
                    "I have a question on inflation causes. Let me upload a photo—guide me through the solution.",
                    "Help me interpret a GDP calculation problem with clear explanations.",
                    "I need help understanding a labor market question involving unemployment types.",
                    "Guide me through a monetary policy question and explain how it impacts the economy."
                ],
                grade_12: [
                    "I have a question on exchange rate models. Let me upload a photo—guide me through the solution.",
                    "Help me solve this question on tax policy implications step by step.",
                    "I need help understanding a question about the impact of economic activities on development.",
                    "Guide me through a competition policy question using practical examples."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Explain absolute and comparative advantage with a worked example from past exams.",
                    "Take me through a demand curve shift explanation, including causes and effects.",
                    "Break down a marginal utility question and how it's calculated.",
                    "Explain how to solve an equilibrium price and quantity question with a worked example."
                ],
                grade_11: [
                    "Explain market structures with a worked example from a past paper.",
                    "Take me through a question on the impact of trade barriers on the economy.",
                    "Break down how to analyze an income distribution problem using Lorenz curves.",
                    "Explain how to tackle a past exam question on economic growth indicators."
                ],
                grade_12: [
                    "Explain the Keynesian model of economics with a worked NSC past paper example.",
                    "Help me understand a question on analyzing fiscal policy effects on the economy.",
                    "Break down a past paper question on price stabilization policies and their uses.",
                    "Explain how to approach a Grade 12 NSC exam question on socio-economic issues."
                ]
            },
            economics_notes: {
                grade_10: [
                    "Generate concise study notes on the basic economic problem and opportunity cost.",
                    "Summarize key concepts for demand and supply dynamics.",
                    "Create a revision cheat sheet for factors influencing elasticity.",
                    "Give me a quick study guide on the circular flow model and its components."
                ],
                grade_11: [
                    "Generate concise study notes on business cycles and economic indicators.",
                    "Summarize key differences between monetary and fiscal policy.",
                    "Create a revision cheat sheet for government intervention in the economy.",
                    "Give me a quick study guide on international trade and its benefits."
                ],
                grade_12: [
                    "Generate concise notes on economic growth models and their applications.",
                    "Summarize key aspects of South Africa's economic policy framework from the NSC syllabus.",
                    "Create a revision cheat sheet for different types of inflation and their causes.",
                    "Give me a quick study guide on economic development indicators and their interpretation."
                ]
            }
        }
    },
    mathematical_literacy: {
        tools: [
            { icon: "🏆", label: "Exam Mastery", content: "Dive into real past Mathematical Literacy exam papers. I'll evaluate your responses, provide feedback using official marking schemes and enhance your confidence for exam success!", toolsId: "exam_mastery" },
            { icon: "📸", label: "Homework Hero", content: "Encountering a tricky Mathematical Literacy problem? Just snap a photo, and I'll guide you through a step-by-step solution with clear, understandable explanations.", toolsId: "homework_hero" },
            { icon: "🎯", label: "AI-Powered Personalized Tutoring", content: "Stuck on challenging Mathematical Literacy concepts like finance systems or measurement? I'll break down these topics into simple steps, ensuring thorough understanding, while tracking your progress and tailoring a study plan for your needs.", toolsId: "ai_tutoring" },
            { icon: "✍️", label: "Smart Study Notes Generator", content: "Allow me to create personalized study notes based on your specific Mathematical Literacy topics, making your revision effective and targeted to what you need most.", toolsId: "math_notes" }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Provide a past exam question on measurement conversions and grade my answer with feedback.",
                    "Can you give me a question on financial documents from a past test paper and mark my response?",
                    "Show me a past exam question on basic statistics and guide me through the solution.",
                    "Find a geometry question involving angles from a test paper, and check my work for accuracy."
                ],
                grade_11: [
                    "Find a question on simple and compound interest from past papers and grade my work.",
                    "Provide a question on data handling from a past exam and check my answer using guidelines.",
                    "Show me a past paper question about interpreting graphs and assist with a solution step by step.",
                    "Give me a question about scale drawings from a previous test and evaluate my response."
                ],
                grade_12: [
                    "Provide a past exam question on analyzing financial statements and check my answer.",
                    "Find a probability question from a Grade 12 paper and evaluate my solution with guidelines.",
                    "Show me a past exam question on interpreting complex graphs and help me solve it step by step.",
                    "Give me a taxation question from previous exams and review my calculations for any errors."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I have a measurement question about converting units. Let me upload a photo—help me solve it.",
                    "Assist me in calculating the cost of an item with a discount, step by step.",
                    "I need help interpreting a simple bar graph for a school project.",
                    "Guide me through understanding and calculating tax as shown in a photograph."
                ],
                grade_11: [
                    "I have an interest calculation problem. Let me upload a photo—guide me through it.",
                    "Help me understand how to analyze a data set to find the mean and median, with steps.",
                    "I need assistance calculating the cost of living expenses using photos of my budget.",
                    "Guide me through the steps to create a scale drawing from a given blueprint."
                ],
                grade_12: [
                    "I have a complex financial math question. Let me upload a photo—walk me through it.",
                    "Assist me in creating a budget based on my monthly income and expenses.",
                    "Need help solving a question on currency conversion, with a clear explanation.",
                    "Help me understand and solve a probability question with a tree diagram."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Explain the concept of area and perimeter with a worked past paper example.",
                    "Show me how to interpret a map with scales using a test paper question.",
                    "Break down how to work with ratios in real-life contexts.",
                    "Explain how to analyze basic data from a test paper question on surveys."
                ],
                grade_11: [
                    "Explain how VAT works with an example from past test papers.",
                    "Take me through a past paper question on time management and scheduling.",
                    "Guide me on solving problems involving travel distance using maps.",
                    "Explain how to compare various banking options using real examples."
                ],
                grade_12: [
                    "Explain loan repayment plans with an example from past papers.",
                    "Guide me through a question on interpreting inflation rates and their effects.",
                    "Break down how to compare investment options using past paper examples.",
                    "Explain how to approach a Grade 12 NSC exam question on socio-economic issues."
                ]
            },
            math_notes: {
                grade_10: [
                    "Generate notes on how to convert between different units of measurement.",
                    "Create a summary of key terms related to personal and household finance.",
                    "Summarize the steps to calculate area and perimeter.",
                    "Give me a quick guide on interpreting graphs and charts."
                ],
                grade_11: [
                    "Create study notes on calculating interest rates and their implications.",
                    "Summarize key concepts in data analysis and probability.",
                    "Make a revision guide focusing on budgeting and financial planning.",
                    "Give me a quick overview of how to interpret and use maps effectively."
                ],
                grade_12: [
                    "Generate notes on analyzing and interpreting financial documents.",
                    "Create a summary of essential concepts in data analysis and probability.",
                    "Prepare a study guide for understanding taxes and financial planning.",
                    "Give me an outline of key steps for evaluating different savings plans."
                ]
            }
        }
    },
    accounting: {
        tools: [
            { icon: "🏆", label: "Exam Mastery", content: "Struggling with Accounting test papers? I'll assess your responses, provide feedback aligned with official guidelines, and elevate your exam performance!", toolsId: "exam_mastery" },
            { icon: "📸", label: "Homework Hero", content: "Facing a difficult Accounting problem? Snap a photo, and I'll walk you through it with step-by-step guidance and detailed explanations.", toolsId: "homework_hero" },
            { icon: "🎯", label: "AI-Powered Personalized Tutoring", content: "Need help with accruals, depreciation, or ratio analysis? I'll break down complex topics into easy steps, track your progress, and customize a study plan just for you!", toolsId: "ai_tutoring" },
            { icon: "✍️", label: "Smart Study Notes Generator", content: "I'll create personalized notes on your chosen Accounting topics, making your revision targeted and effective!", toolsId: "accounting_notes" }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Provide a past NSC exam question on basic double-entry accounting and evaluate my response with feedback.",
                    "Show me an introductory financial statements question from a Grade 10 NSC paper and grade my answer according to official guidelines.",
                    "Help me solve a past NSC exam question on accounting concepts and principles step by step.",
                    "Give me a transactions recording question from a previous NSC exam and review my solution for accuracy."
                ],
                grade_11: [
                    "Give me a past NSC exam question on bank reconciliation statements and grade my answer with feedback.",
                    "Provide a Grade 11 NSC question on debtors' age analysis and evaluate my response using official guidelines.",
                    "Show me a break-even analysis question from a past NSC exam and help me work through it step by step.",
                    "Give me a question on partnerships from a previous NSC exam and check my solution for errors."
                ],
                grade_12: [
                    "Give me a past NSC exam question on company financial statements and grade my answer with feedback.",
                    "Provide a Grade 12 NSC paper question on fixed assets and evaluate my response using official guidelines.",
                    "Show me a manufacturing accounts question from a past NSC exam and help me solve it step by step.",
                    "Give me an analysis of cash flow statements question from a previous NSC exam and check my solution for errors."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I have an accounting equation problem. Let me upload a photo—guide me through the solution.",
                    "Help me construct a simple balance sheet, step by step.",
                    "Assist me in solving a homework problem related to cash receipts journals.",
                    "Guide me through calculating inventory using the periodic stock system."
                ],
                grade_11: [
                    "I have a VAT calculations problem. Let me upload a photo—guide me through the solution.",
                    "Help me solve a balance sheet equation step by step.",
                    "Assist me with a homework problem related to ledger accounts.",
                    "Guide me through preparing a cash flow statement using direct and indirect methods."
                ],
                grade_12: [
                    "I have a problem on depreciation methods. Let me upload a photo—guide me through the solution.",
                    "Help me solve a budget variance analysis question step by step.",
                    "Assist me with a homework problem involving shareholders' equity.",
                    "Guide me through analyzing a company's liquidity using current and quick ratios."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Explain the basics of double-entry bookkeeping with a worked example from a past paper.",
                    "Take me through the process of preparing a simple financial statement.",
                    "Break down a past NSC question on the accounting equation and how to solve it.",
                    "Explain how to record transactions in a journal with an example from the syllabus."
                ],
                grade_11: [
                    "Explain the preparation of income statements with a worked example from past papers.",
                    "Take me through an accounting entry exercise involving transactions affecting various accounts.",
                    "Break down a past paper question on interpreting financial ratios.",
                    "Explain the concept and application of inventory valuation methods."
                ],
                grade_12: [
                    "Explain the preparation of cash flow statements with a worked NSC past paper example.",
                    "Take me through a complex question on ratio analysis and its interpretation.",
                    "Break down calculation and presentation steps for depreciation and asset disposal.",
                    "Explain how to analyze past paper data on solvency and liquidity ratios."
                ]
            },
            accounting_notes: {
                grade_10: [
                    "Generate concise study notes on the principles of double-entry accounting.",
                    "Summarize key concepts for preparing financial statements as per the Grade 10 curriculum.",
                    "Create a cheat sheet for the accounting cycle steps.",
                    "Give me a quick study guide on recording transactions and their effects on financial statements."
                ],
                grade_11: [
                    "Generate concise study notes on bank reconciliation procedures.",
                    "Summarize key formulas for analyzing income statements.",
                    "Create a cheat sheet for partnership accounting.",
                    "Provide a quick guide on accounting for VAT and its implications."
                ],
                grade_12: [
                    "Generate concise study notes on company financial statement preparations and analysis.",
                    "Summarize key concepts and formulas for ratio analysis critical for NSC exams.",
                    "Create a revision cheat sheet for fixed asset accounting, including disposals.",
                    "Provide a quick study guide on manufacturing and inventory control."
                ]
            }
        }
    },
    business_studies: {
        tools: [
            { icon: "🏆", label: "Exam Mastery", content: "Ready to ace your Business Studies tests? I'll assess your responses to past papers, provide feedback using official marking guidelines, and enhance your exam skills!", toolsId: "exam_mastery" },
            { icon: "📸", label: "Homework Hero", content: "Facing a challenging business problem? Upload a photo, and I'll walk you through it step-by-step with clear, concise explanations.", toolsId: "homework_hero" },
            { icon: "🎯", label: "AI-Powered Personalized Tutoring", content: "Need help with entrepreneurship, financial management, or market analysis? I'll break down complex topics into simple steps, ensuring you fully grasp each concept while tailoring a study plan to fit your needs!", toolsId: "ai_tutoring" },
            { icon: "✍️", label: "Smart Study Notes Generator", content: "Want focused Business Studies revision? I'll create personalized study notes on your chosen topics, making your study sessions efficient and effective!", toolsId: "business_notes" }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Show me a past NSC exam question on the introduction to business environment, and help me structure my answer.",
                    "Give me a question about economic systems from a Grade 10 NSC paper and guide me in crafting a thorough response.",
                    "Provide a past exam question on types of businesses and check my explanation for completeness.",
                    "Help me analyze a question on consumer rights from a past paper."
                ],
                grade_11: [
                    "Provide a past exam question on business environments and mark my response.",
                    "Show me a Grade 11 NSC exam question about entrepreneurship and provide step-by-step feedback on my answer.",
                    "Give me a logistics and distribution question from a previous exam and check my approach for errors.",
                    "Provide an NSC exam question on forms of ownership and evaluate my response."
                ],
                grade_12: [
                    "Give me a past NSC exam question on business management strategies and evaluate my answer with feedback.",
                    "Provide a question from a Grade 12 NSC exam on the impact of recent legislation on businesses and grade my response using official guidelines.",
                    "Show me a past NSC exam question on corporate social responsibility and assist me in developing a comprehensive answer.",
                    "Give me a financial management question from a previous NSC exam and check my calculation for accuracy."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I need clarity on a question about factors of production. Let me send a photo and assist me.",
                    "Explain a class exercise on consumer goods and services.",
                    "Guide me through understanding the role of entrepreneurs in a practical activity.",
                    "Help with understanding different forms of business ownership with a visual example."
                ],
                grade_11: [
                    "I need help with a question on sources of capital. Let me upload a photo for detailed guidance.",
                    "Help me understand the economic sector analysis with this exercise I have.",
                    "I'm struggling with a task on business operations. Can you guide me step by step?",
                    "Explain a question on teamwork and conflict management, focusing on solutions."
                ],
                grade_12: [
                    "I have a challenging marketing question. Let me upload a photo, and guide me through the solution.",
                    "Help me analyze a business plan problem step by step.",
                    "I'm stuck on a corporate governance problem. Assist me in understanding the key concepts.",
                    "Guide me through a financial statement analysis question, explaining the steps clearly."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Discuss what a business opportunity is, with illustrations from NSC past papers.",
                    "Walk me through basic business calculations with past paper examples.",
                    "Break down a question on the role of government in business settings as seen in exams.",
                    "Explain consumer protection laws with a related Grade 10 exam question."
                ],
                grade_11: [
                    "Discuss the challenges of starting a new business with an NSC past paper example.",
                    "Outline a past exam question addressing the impact of technology on business.",
                    "Illustrate the decision-making process in business with real past exam scenarios.",
                    "Explain the importance of quality in the business environment using Grade 11 examples."
                ],
                grade_12: [
                    "Explain the business cycle with an NSC past paper example.",
                    "Take me through the strategic management process, including SWOT analysis.",
                    "Break down a past exam question on human resource management and its application.",
                    "Explain how to interpret financial ratios from a Grade 12 NSC exam question."
                ]
            },
            business_notes: {
                grade_10: [
                    "Generate notes on different economic sectors and their functions.",
                    "Summarize essential points about the business environment factors.",
                    "Prepare a compact revision guide for understanding market structures.",
                    "Provide concise notes on entrepreneurship and its significance."
                ],
                grade_11: [
                    "Generate study notes on different business sectors and their characteristics.",
                    "Summarize the key challenges in operations management according to the NSC syllabus.",
                    "Create a cheat sheet for understanding market structures.",
                    "Prepare a quick study guide on risk analysis and conflict resolution."
                ],
                grade_12: [
                    "Generate concise study notes on ethics in business.",
                    "Summarize key principles of ethics and professionalism in business according to the NSC syllabus.",
                    "Create a revision sheet for different leadership styles and their impacts.",
                    "Give me a quick study guide on financial statements and ratio analysis."
                ]
            }
        }
    },
    geography: {
        tools: [
            { icon: "🏆", label: "Exam Mastery", content: "Eager to excel using real past Geography papers? I'll evaluate your answers, provide feedback using official marking guidelines, and enhance your exam preparedness!", toolsId: "exam_mastery" },
            { icon: "📸", label: "Homework Hero", content: "Encountered a tough Geography problem? Snap a photo, and I'll guide you through the solution with clear, step-by-step explanations.", toolsId: "homework_hero" },
            { icon: "🎯", label: "AI-Powered Personalized Tutoring", content: "Struggling with geomorphology, population dynamics, or climate change? I'll break down complex topics into easy-to-understand steps, track your progress, and customize a study plan tailored to you.", toolsId: "ai_tutoring" },
            { icon: "✍️", label: "Smart Study Notes Generator", content: "I'll create personalized study notes based on your selected Geography topics, ensuring your revision is efficient and targeted!", toolsId: "geo_notes" }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Show me a past exam question on map skills and guide me through answering it.",
                    "Provide a question on ecosystems from a test paper and review my answer with feedback.",
                    "Give me a question from a past exam on weather patterns and help me solve it step by step.",
                    "Provide a past geography test question on population distribution and assess my response."
                ],
                grade_11: [
                    "Show me a past test paper question on urban settlements and outline the solution process.",
                    "Provide a question on plate tectonics from past papers and critique my answer.",
                    "Give me a previous test question on river profiles and help me solve it step by step.",
                    "Present a past exam question on climate zones and evaluate my response."
                ],
                grade_12: [
                    "Provide a past exam question on geomorphology (catchment and river management) and evaluate my answer.",
                    "Give me a climatology question from a Grade 12 paper and mark my response using official guidelines.",
                    "Show me a past exam question on urban land use and help me solve it step by step.",
                    "Present a question from a previous exam on development geography and check my analysis."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I have a question on river systems. Let me upload a photo—guide me through the solution.",
                    "Help me understand the process of erosion with a specific example.",
                    "Explain the steps to solve a climate-related question I'm struggling with.",
                    "Guide me through a question on demographic statistics using a chart."
                ],
                grade_11: [
                    "I need help with a geomorphology question. Let me upload a photo—walk me through it.",
                    "Help me understand urban land use models with a practical example.",
                    "Explain step by step how to categorize a climate graph.",
                    "Guide me in interpreting a question on population data using diagrams."
                ],
                grade_12: [
                    "I have a complex question on climate regions. Let me upload a photo—guide me through it.",
                    "Help me solve a question on GIS applications step by step.",
                    "Explain how to analyze economic activities in a given area with an example.",
                    "Guide me through a question on sustainable development using diagrams or maps."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Break down the factors affecting weather and climate with an example question.",
                    "Explain the processes of rock formation with past paper examples.",
                    "Take me through a question on sustainable resource use with detailed steps.",
                    "Help me understand map scale calculations with a solved test question."
                ],
                grade_11: [
                    "Explain the concept of plate boundaries with a past paper example.",
                    "Take me through a question on rural-urban migration with clear explanations.",
                    "Help me understand deforestation effects with a detailed example.",
                    "Walk me through the process of analyzing aerial photographs with test examples."
                ],
                grade_12: [
                    "Break down a question on river management strategies with a worked past paper example.",
                    "Explain the impacts of urban growth with step-by-step solutions.",
                    "Help me understand climate adaptation measures with a detailed past paper question.",
                    "Take me through solving a geomorphological problem with labeled diagrams."
                ]
            },
            geo_notes: {
                grade_10: [
                    "Create concise study notes on different types of maps and their uses.",
                    "Summarize the weather systems and their effects on South Africa.",
                    "Generate study notes on the carbon cycle with key concepts highlighted.",
                    "Provide a quick reference guide on factors affecting population growth."
                ],
                grade_11: [
                    "Create a quick guide on types of settlements and their characteristics.",
                    "Summarize the Earth's structure and significant geological features.",
                    "Generate detailed notes on global warming and climate change impacts.",
                    "Provide a concise overview of demographic transition models."
                ],
                grade_12: [
                    "Generate study notes on river systems and management practices.",
                    "Summarize key concepts and case studies in urban geography.",
                    "Create a revision guide on climatology, focusing on weather systems.",
                    "Provide a concise study sheet on human-environmental interactions and sustainability."
                ]
            }
        }
    }
};
