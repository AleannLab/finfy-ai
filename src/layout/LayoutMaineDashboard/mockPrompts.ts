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
                    "Show me a Grade 10 NSC exam question about the periodic table and mark my answer using official guidelines.",
                    "Give a question on energy transformation from a past exam and help me solve it step by step.",
                    "Find a prior exam question on chemical bonding and assess my solution for accuracy."
                ],
                grade_11: [
                    "Provide me with a past NSC exam question on work, energy, and power and evaluate my response with feedback.",
                    "Show me a Grade 11 NSC exam question regarding chemical equilibrium and mark my answer using official guidelines.",
                    "Give a question on the electromagnetic spectrum from a past exam and help me solve it step by step.",
                    "Find a prior exam question on acids and bases and assess my solution for accuracy."
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
                    "Help me solve this chemical reaction equation step by step.",
                    "I need assistance with a thermal expansion problem—guide me through the calculations.",
                    "Guide me through a question on separating mixtures using physical methods."
                ],
                grade_11: [
                    "I have a challenging kinematics question. Let me upload a photo—guide me through solving it.",
                    "Help me solve this chemical rate equation step by step.",
                    "I need assistance with an electric circuits problem—guide me through the calculations.",
                    "Guide me through a question on the molecular structure using covalent bonds."
                ],
                grade_12: [
                    "I'm stuck on a projectile motion problem; can you walk me through the solution step by step after I upload my photo?",
                    "Help me solve this energy transformation question by providing a clear, detailed explanation from my uploaded problem.",
                    "Can you assist me with an electric circuits problem? I’ve snapped a photo of the question and need a step-by-step breakdown.",
                    "I need help with a wave phenomena question—upload my photo and guide me through a detailed, stepwise breakdown."
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
                    "Break down the principles of energy conservation for me with a step-by-step tutorial and practice questions.",
                    "Help me understand electric circuits and electromagnetic induction with tailored explanations and problem-solving examples.",
                    "Walk me through wave interference and diffraction concepts in detail, and provide practice exercises to monitor my progress.",
                    "Explain advanced quantum mechanics concepts related to energy levels and photon interactions."
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
                    "Generate concise study notes on the conservation of energy.",
                    "Summarize key laws and equations related to wave properties in the NSC syllabus.",
                    "Create a revision cheat sheet for chemical reactions and their types.",
                    "Give me a quick study guide on capacitor circuits, including formulas and examples "
                ],
                grade_12: [
                    "Generate concise study notes on projectile motion, including key formulas and concepts for quick review.",
                    "Create exam-focused notes on energy conservation, highlighting essential points for efficient review.",
                    "Summarize the key concepts and formulas of electric circuits and electromagnetism in a clear, digestible guide.",
                    "Provide a brief, comprehensive summary of wave phenomena, covering interference and diffraction for fast revision."
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
    },
    life_sciences: {
        tools: [
            {
                "icon": "🏆",
                "label": "Exam Mastery",
                "content": "Ready to excel in Life Sciences tests and exams? I'll assess your responses to real past papers, provide detailed feedback using official marking guidelines, and help you achieve exam success!",
                "toolsId": "exam_mastery"
            },
            {
                "icon": "📸",
                "label": "Homework Hero",
                "content": "Facing a tricky Life Sciences question? Snap a photo, and I'll walk you through the solution step by step, clarifying key concepts along the way.",
                "toolsId": "homework_hero"
            },
            {
                "icon": "🎯",
                "label": "AI-Powered Personalized Tutoring",
                "content": "Having difficulty with genetics, reproduction, or ecology? I'll break down complex topics into clear, manageable steps, track your learning progress, and create a customized study plan just for you.",
                "toolsId": "ai_tutoring"
            },
            {
                "icon": "✍️",
                "label": "Smart Study Notes Generator",
                "content": "I'll generate tailored study notes on Life Sciences topics you choose, making your revision more efficient and focused for better results!",
                "toolsId": "study_notes"
            }
        ],
        prompts: {
            "exam_mastery": {
                "grade_10": [
                    "Give me a past exam question on cell structure and grade my response with feedback.",
                    "Provide a question on the process of photosynthesis from a past paper and review my solution using official feedback.",
                    "Show me a past exam question on the biosphere and help me work through it step by step.",
                    "Find a question on human impact on the environment from past tests and assess my answer with detailed feedback."
                ],
                "grade_11": [
                    "Provide me with a past question on genetics and evaluate my answer.",
                    "Give me a question on biodiversity from previous exams and mark my response.",
                    "Show me a question about cell biology from past tests and help me answer with official marking criteria.",
                    "Find a question on the human circulatory system from past exams and guide me through solving it."
                ],
                "grade_12": [
                    "Provide a past NSC Grade 12 exam question on evolution and grade my answer.",
                    "Give me a challenging question on human reproduction from a past NSC paper and mark my solution.",
                    "Find an exam question on genetic engineering and help me solve it with feedback.",
                    "Show me a Grade 12 question on homeostasis and rate my response with detailed comments."
                ]
            },
            "homework_hero": {
                "grade_10": [
                    "I have a question about the transport systems in plants, let me upload a photo—guide me through the solution.",
                    "Help me solve a question on food webs by explaining each component.",
                    "I’m stuck on a question about cell division—can I send a photo and get step-by-step help?",
                    "Assist me with a water cycle problem by providing a clear breakdown of each step."
                ],
                "grade_11": [
                    "I have an issue with a question on population ecology—let me upload a photo and guide me through the solution.",
                    "Guide me in understanding the carbon cycle with a practical problem.",
                    "I’m stuck on a question on nitrogen cycles—I'll send a picture. Assist with a clear breakdown.",
                    "Assist with a challenging question on mineral cycling by breaking down the processes involved."
                ],
                "grade_12": [
                    "I need help with a biotechnology problem. I'll upload a photo—could you walk me through it?",
                    "Assist me in solving a Menstrual cycle question step-by-step.",
                    "I’m confused about meiosis stages, can I send a photo and get some thorough guidance?",
                    "Help me with a DNA replication problem by explaining each step thoroughly!"
                ]
            },
            "ai_tutoring": {
                "grade_10": [
                    "Explain the role of enzymes with a worked example from past tests.",
                    "Take me through a question on the human respiratory system, including functions and structure.",
                    "Help me understand plant reproduction using real-life examples.",
                    "Guide me in solving ecosystem-related questions with practical examples."
                ],
                "grade_11": [
                    "Explain natural selection with examples from past exams.",
                    "Help me understand plant reproduction through past paper practice.",
                    "Clarify the concepts of symbiotic relationships with practical examples.",
                    "Provide insights into energy transfer through trophic levels using past paper questions."
                ],
                "grade_12": [
                    "Explain Mendelian genetics using a detailed example from past papers.",
                    "Take me through a complex question on the nervous system from an NSC past paper.",
                    "Clarify the mechanism of action of hormones using real-world examples.",
                    "Help me with understanding ecological succession with examples from exams."
                ]
            },
            "study_notes": {
                "grade_10": [
                    "Generate concise study notes on ecosystems and energy flow in the biosphere.",
                    "Create a revision guide for cell organelles and their functions.",
                    "Summarize the key points about the impact of human activities on ecosystems.",
                    "Provide a quick overview of photosynthesis stages and related processes."
                ],
                "grade_11": [
                    "Summarize key concepts of animal nutrition for Grade 11 Life Sciences.",
                    "Create a cheat sheet on human impact on the environment and its implications.",
                    "Summarize the roles of hormones in the human body for easy revision.",
                    "Provide a clear explanation of evolutionary theory concepts for quick study."
                ],
                "grade_12": [
                    "Create detailed study notes on DNA replication and protein synthesis.",
                    "Summarize the key concepts of homeostasis and feedback mechanisms.",
                    "Outline the process of cellular respiration for a quick review.",
                    "Provide study notes on evolutionary biology to aid quick revisions."
                ]
            }
        }
    },
    information_technology: {
        tools: [
            {
                icon: "🏆",
                label: "Exam Mastery",
                content: "Practice past IT papers with feedback",
                toolsId: "exam_mastery"
            },
            {
                icon: "📸",
                label: "Homework Hero",
                content: "Get step-by-step help with IT problems",
                toolsId: "homework_hero"
            },
            {
                icon: "🎯",
                label: "Tutor Me",
                content: "Understand key Information Systems concepts with ease",
                toolsId: "ai_tutoring"
            },
            {
                icon: "✍️",
                label: "Smart Study Notes",
                content: "Create personalized IT notes for revision",
                toolsId: "study_notes"
            }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Provide a past exam question on the role of an operating system and evaluate my response.",
                    "Give me a question about the different types of computer software and mark my answer.",
                    "Share a question on the functions of a processor from past papers and guide me through it.",
                    "Assess my solution to a question on the basic structure of a computer system from past tests."
                ],
                grade_11: [
                    "Give me a past question on system software and provide feedback on my approach.",
                    "Show an exam problem related to information retrieval systems and assess my answer.",
                    "Provide a question on cybersecurity principles and evaluate my solution.",
                    "Guide me through a past exam question on database design and mark my response."
                ],
                grade_12: [
                    "Provide a past NSC exam question on system integration and evaluate my answer.",
                    "Show a complex query from a Grade 12 NSC paper on data analysis and mark my response.",
                    "Help me solve a problem on advanced networking from NSC past exams.",
                    "Give feedback on my solution to a programming troubleshooting question from an NSC exam."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I've got a question on sorting algorithms—here's a photo, help me find the solution.",
                    "Guide me step-by-step through a logic gate problem I found challenging.",
                    "Show me how to solve a network basics question, including IP addressing.",
                    "Assist me with a data representation problem using the photo I'll upload."
                ],
                grade_11: [
                    "I'm having trouble with a task on data encryption—here's a photo for guidance.",
                    "Help me solve a problem on software lifecycle stages, step by step.",
                    "Assist with a systems analysis and design question from my homework.",
                    "Walk me through solving a data integrity issue using my uploaded image."
                ],
                grade_12: [
                    "I'm stuck on a question about emerging technologies—here’s a photo for your help.",
                    "Guide me through solving a layered network architecture problem.",
                    "Identify errors in my approach to a database optimization exercise.",
                    "Assist with a systems development lifecycle question using the uploaded image."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Explain basic programming concepts with a practical example from past exams.",
                    "Take me through array data structures with illustrative examples.",
                    "Demonstrate how to solve problems involving digital communications.",
                    "Guide me through understanding GUI components with past paper examples."
                ],
                grade_11: [
                    "Explain the workings of relational databases with applied examples.",
                    "Break down a system security topic and how to apply it in practice.",
                    "Take me through strategies for managing data in large systems.",
                    "Guide my understanding of network troubleshooting with real-world scenarios."
                ],
                grade_12: [
                    "Explain cloud computing models and strategies with scenarios from past exams.",
                    "Navigate through a data security enhancement problem using theoretical and practical insights.",
                    "Simplify the steps involved in software application development with comprehensive examples.",
                    "Guide my understanding of IT project management techniques with past NSC paper contexts."
                ]
            },
            study_notes: {
                grade_10: [
                    "Generate concise notes on the evolution of computer systems.",
                    "Summarize key concepts of basic software applications for easy reference.",
                    "Create a revision guide on hardware components and their functions.",
                    "Quickly outline the principles of digital communication systems."
                ],
                grade_11: [
                    "Craft notes on the basic concepts of network topology for quick revision.",
                    "Write a summary of security protocols and their implementations.",
                    "Generate a cheat sheet on the principles of data modeling.",
                    "Summarize the key features of operating system functions."
                ],
                grade_12: [
                    "Draft concise notes on the latest trends in information systems and technologies.",
                    "Outline the key concepts of enterprise system integration for quick study.",
                    "Produce a study guide on effective solutions for system security threats.",
                    "Create a revision sheet on sophisticated data processing techniques."
                ]
            }
        }
    },
    computer_applications_technology: {
        tools: [
            {
                icon: "🏆",
                label: "Exam Mastery",
                content: "Practice past CAT papers with feedback",
                toolsId: "exam_mastery"
            },
            {
                icon: "📸",
                label: "Homework Hero",
                content: "Get step-by-step help with CAT problems",
                toolsId: "homework_hero"
            },
            {
                icon: "🎯",
                label: "Tutor Me",
                content: "Understand key CAT concepts with ease",
                toolsId: "ai_tutoring"
            },
            {
                icon: "✍️",
                label: "Smart Study Notes Generator",
                content: "Create personalized CAT notes for revision",
                toolsId: "study_notes"
            }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Provide a past exam question on word processing and guide me in drafting the correct format.",
                    "Show me an example of a spreadsheet function question, and help me solve it step by step.",
                    "Share a database question from a past test with instructions on setting up fields and records.",
                    "Give me a communications technology question to practice, including tips for efficient responses."
                ],
                grade_11: [
                    "Show me a past paper question on advanced spreadsheet functions and provide feedback on my solution.",
                    "Give me a word processing question that involves advanced formatting from a past exam.",
                    "Help me practice a past exam question on managing emails effectively with feedback.",
                    "Share a networking basics question to solve and mark my response."
                ],
                grade_12: [
                    "Give me a past NSC exam question on database queries and grade my response with feedback.",
                    "Provide a networking question from a Grade 12 NSC paper and mark my answer using official guidelines.",
                    "Show me a past NSC exam question on spreadsheet modeling and assist me in solving it step by step.",
                    "Help me tackle a past NSC exam question on internet technologies and check my solution for errors."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I'm stuck on a spreadsheet graph problem. Let me upload a photo—explain how to complete it.",
                    "Help me troubleshoot a presentation software error step by step.",
                    "I need assistance with database queries in my homework.",
                    "Guide me through fixing formatting issues in a word processing task."
                ],
                grade_11: [
                    "I have trouble with a database setup task. Let me upload a photo—guide me in fixing it.",
                    "Help me solve this spreadsheet data analysis problem step by step.",
                    "Provide assistance with a word processing document error I'm facing.",
                    "Guide me through setting up a secure network with available resources."
                ],
                grade_12: [
                    "I'm stuck on a programming logic task. Let me upload a photo—guide me through the solution.",
                    "Assist me with troubleshooting a complex database issue step by step.",
                    "I need help sorting data using advanced spreadsheet techniques in my homework.",
                    "Guide me through a network setup problem using clear, detailed steps."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Explain the basics of data organization with a worked past paper example.",
                    "Help me understand how to create presentation slides effectively with past exam insights.",
                    "Break down a complex spreadsheet function question into understandable steps.",
                    "Teach me about network basics using practical past exam scenarios."
                ],
                grade_11: [
                    "Explain database management essentials with a practical past paper example.",
                    "Take me through a complex spreadsheet analysis task with past exam insights.",
                    "Break down challenging network configuration concepts into understandable parts.",
                    "Explain data validation using a Grade 11 past exam question."
                ],
                grade_12: [
                    "Explain programming logic using a worked NSC past paper example.",
                    "Take me through a detailed database query design with past exam insights.",
                    "Break down a Grade 12 past exam question on complex network setups.",
                    "Explain advanced spreadsheet modeling using a NSC exam question."
                ]
            },
            study_notes: {
                grade_10: [
                    "Generate concise study notes on spreadsheet functions and formulas.",
                    "Summarize key concepts of effective communication technology usage.",
                    "Create a revision cheat sheet for word processing tools and their applications.",
                    "Give me a quick study guide on database setups and management."
                ],
                grade_11: [
                    "Generate concise study notes on complex spreadsheet analyses.",
                    "Summarize key concepts for securing network connections efficiently.",
                    "Create a revision cheat sheet for database management and handling.",
                    "Give me a study guide on advanced word processing techniques."
                ],
                grade_12: [
                    "Create summarized study notes on key database management principles.",
                    "Generate a concise study guide on effective network configurations in the NSC syllabus.",
                    "Produce a revision cheat sheet for advanced spreadsheet modeling techniques.",
                    "Craft a quick study guide on efficient programming logic methodologies."
                ]
            }
        }
    },
    history: {
        tools: [
            {
                icon: "🏆",
                label: "Exam Mastery",
                content: "Tackle past History papers with feedback",
                toolsId: "exam_mastery"
            },
            {
                icon: "📸",
                label: "Homework Hero",
                content: "Get step-by-step help with History questions",
                toolsId: "homework_hero"
            },
            {
                icon: "🎯",
                label: "Tutor Me",
                content: "Learn History concepts in a clear, structured way",
                toolsId: "ai_tutoring"
            },
            {
                icon: "✍️",
                label: "Smart Study Notes",
                content: "Create personalized History notes for revision",
                toolsId: "study_notes"
            }
        ],
        prompts: {
            exam_mastery: {
                grade_10: [
                    "Provide a past exam question on ancient civilizations and assess my answer with feedback.",
                    "Give me a question on the Industrial Revolution from a Grade 10 past paper and grade my response.",
                    "Show me a question about the French Revolution from previous tests and guide me in crafting a thorough answer.",
                    "Provide a World War I question from past papers and evaluate my solution step by step."
                ],
                grade_11: [
                    "Give me a past test question on nationalism movements and assess my answer.",
                    "Provide a Grade 11 exam question on World War II and review my response using guidelines.",
                    "Show me an apartheid-era question from previous tests and help me solve it comprehensively.",
                    "Offer a question on the Cold War from past papers and critique my answer."
                ],
                grade_12: [
                    "Provide a past exam question on African decolonization and mark my answer with feedback.",
                    "Give me an essay question on the South African Liberation Struggle from a past paper and assess my response.",
                    "Show me a question on the Middle East conflict from previous NSC papers and help me formulate a detailed answer.",
                    "Provide a transitional justice question from past exams and evaluate my historical analysis."
                ]
            },
            homework_hero: {
                grade_10: [
                    "I need help understanding a question about colonialism’s impact—let me upload a photo.",
                    "Help me explore key events of the Renaissance with step-by-step analysis.",
                    "Assist me with a question on exploration and expansion during the Age of Discovery.",
                    "Guide me through an analysis question on the Enlightenment philosophers."
                ],
                grade_11: [
                    "Let me upload a photo of a Cold War question I’m struggling with for guidance.",
                    "Help me deconstruct a question on economic systems during the Depression era.",
                    "Assist with analyzing sources related to the rise of dictatorships in the 20th century.",
                    "Provide steps for evaluating the causes of the Russian Revolution."
                ],
                grade_12: [
                    "Snap a photo of a question on globalization—help me break it down.",
                    "Assist with an analysis of apartheid era events step by step.",
                    "Help me solve a problem related to the Truth and Reconciliation Commission.",
                    "Guide me through constructing an argument about the end of the Cold War."
                ]
            },
            ai_tutoring: {
                grade_10: [
                    "Explain key causes and effects of World War II with examples from past papers.",
                    "Take me through a significant event of the American Revolution using a worked example.",
                    "Break down complex ideas about the Slave Trade and how to approach related questions.",
                    "Help me understand and analyze major figures of the Scientific Revolution."
                ],
                grade_11: [
                    "Explain the apartheid laws using examples from past Grade 11 papers.",
                    "Guide me through a question on decolonization and its global impact.",
                    "Break down complex arguments regarding the formation of the United Nations.",
                    "Assist with understanding the ideological conflicts during the Cold War."
                ],
                grade_12: [
                    "Explain key post-apartheid events using past paper examples to contextualize.",
                    "Navigate through a NSC paper’s question on international relations post-World War II.",
                    "Break down historiographical debates regarding the Holocaust with relevant examples.",
                    "Assist in understanding the shift in global power dynamics post-Cold War."
                ]
            },
            study_notes: {
                grade_10: [
                    "Generate clear notes on ancient Egyptian society and its historical significance.",
                    "Summarize causes and outcomes of the Industrial Revolution with quick bullet points.",
                    "Create a concise overview of key events leading up to World War I.",
                    "Produce study notes on the impacts of colonization in Africa and Asia."
                ],
                grade_11: [
                    "Create notes on key policies during the apartheid era in South Africa.",
                    "Summarize significant post-WWII political landscapes in concise segments.",
                    "Generate a quick study guide on landmark agreements like the Treaty of Versailles.",
                    "Provide an overview of major movements for independence in the 20th century."
                ],
                grade_12: [
                    "Create detailed notes on apartheid and its global implications.",
                    "Summarize pivotal moments in international relations since the 20th century.",
                    "Generate a revision guide on the role of the United Nations in peacekeeping.",
                    "Produce concise notes on the major decisions of the Geneva Conference."
                ]
            }
        }
    }
};
