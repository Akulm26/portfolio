import { Project, Capability, Step, Principle } from './types';

export interface EnhancedProject extends Project {
  metricLabel?: string;
  metricValue?: string;
  role?: string;
}

export const PROJECTS: EnhancedProject[] = [
  {
    id: 'cerebro-ai',
    title: 'Cerebro AI',
    headline: 'Personal Knowledge Engine',
    type: 'AI Productivity',
    role: 'Product Lead & Founder',
    metricLabel: 'DAU/MAU',
    metricValue: '42%',
    description: 'A second brain that captures, organizes, and resurfaces information across your digital life. Built on a custom RAG architecture to provide context-aware retrieval with zero-friction entry.',
    ctaText: 'View Case Study',
    isFeatured: true,
    imageUrl: 'https://i.ibb.co/gMqMJjQz/Gemini-Generated-Image-76dc4o76dc4o76dc.png',
  },
  {
    id: 'leaklock',
    title: 'LeakLock',
    headline: 'Invisible money tracker that finds your financial leaks',
    type: 'Consumer Fintech',
    role: 'PM / Strategy',
    metricLabel: 'User Savings',
    metricValue: '$450/yr avg',
    description: 'Built a working AI-driven expense intelligence prototype that surfaces forgotten subscriptions, reduces cancellation friction, and detects recurring overcharges and spending anomalies across digital payments.',
    ctaText: 'View Case Study',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'hinge-roadmap',
    title: 'Product Improvement & Discovery - Hinge',
    headline: 'Making dating more intentional',
    type: 'Product Improvement',
    role: 'Case Study',
    metricLabel: 'Potential LTV',
    metricValue: 'Significant Lift',
    description: 'Product improvement roadmap aimed at reducing superficial swiping by using behavioral nudges and intentional free-tier limits to encourage meaningful connections.',
    ctaText: 'View Roadmap',
    imageUrl: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'nike-app',
    title: 'Nike Mobile App',
    headline: 'Reimagining the Nike app experience',
    type: 'Product Sense Case Study',
    role: 'Analysis',
    metricLabel: 'Conversion',
    metricValue: 'Optimized',
    description: 'Deep-dive analysis of Nike’s mobile app with prioritized recommendations to improve user engagement and purchase conversion through personalized membership experiences, curated content, and targeted rewards.',
    ctaText: 'View Analysis',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
  },
];

export const SECONDARY_PROJECTS: Project[] = [
  {
    id: 'apple-stock',
    title: 'Apple Stock Prediction',
    headline: 'Technical ML modeling',
    type: 'Technical Project',
    description: 'Built an interactive analytics and forecasting dashboard to explore historical Apple stock performance and generate short-term price forecasts.',
    ctaText: 'View Model',
  },
  {
    id: 'elevn-teardown',
    title: 'Product Teardown - Elevn',
    headline: 'UX and Product Analysis',
    type: 'Product Analysis',
    description: 'Comprehensive teardown of the Elevn dating app focusing on onboarding friction, initial user success metrics, and long-term retention loops.',
    ctaText: 'View Teardown',
  },
  {
    id: 'udemy-sense',
    title: 'Product Sense - Udemy',
    headline: 'Improving EdTech engagement',
    type: 'EdTech Strategy',
    description: 'Product sense exercise identifying core user friction in course completion rates on Udemy and proposing structural gamification improvements.',
    ctaText: 'View Strategy',
  },
];

export const CAPABILITIES: Capability[] = [
  {
    title: 'AI Product Development',
    description: 'I define how AI features should work for real users—from recommendation engines to personalized content feeds. I specialize in bridging the gap between raw model outputs and meaningful user experiences.',
    proof: 'Hands-on experience with LLMs & RAG systems'
  }, 
  {
    title: 'Growth & Retention',
    description: 'I diagnose what\'s breaking in your user journey and run high-velocity experiments that move the numbers. I\'ve turned declining user engagement into measurable lifts by identifying high-leverage friction points.',
    proof: 'Proven engagement & stickiness growth'
  },
  {
    title: 'Data-Informed Strategy',
    description: 'I turn complex behavioral data into actionable product strategy. Grounded in statistical analysis, I help teams cut through vanity metrics and prioritize the signals that matter.',
    proof: 'PMP-certified · MS in Analytics'
  },
  {
    title: '0→1 Product Thinking',
    description: 'I lead 0→1 product development by converting ambiguous problems into focused roadmaps backed by clear metrics and technical feasibility.',
    proof: '0→1 ownership across 3+ AI-first products'
  }
];

export const STEPS: Step[] = [
  {
    title: 'Discover',
    icon: '🔍',
    description: 'I start by understanding the real problem—not just the stated one. I talk to users, dig into data, and map the current experience to find where value is leaking.',
  },
  {
    title: 'Define',
    icon: '🎯',
    description: 'I translate insights into clear hypotheses, success metrics, and prioritized roadmaps. No solution gets built without a testable bet and a way to measure it.',
  },
  {
    title: 'Deliver',
    icon: '🚀',
    description: 'I work shoulder-to-shoulder with engineering to ship, instrument, and iterate. The goal isn\'t launching—it\'s learning and improving based on real user behavior.',
  },
];

export const PRINCIPLES: Principle[] = [
  {
    title: 'Metrics that tell the truth',
    description: 'I design measurement systems that align with actual business value—not vanity metrics that look good in dashboards but don\'t reflect user success.',
  },
  {
    title: 'AI that augments humans',
    description: 'I believe the best AI products enhance human capability rather than replace judgment. The goal is making people more effective and capable.',
  },
  {
    title: 'Experiments over opinions',
    description: 'I let data decide, not the loudest voice. Every major feature should have a testable hypothesis and clear success criteria before development begins.',
  },
  {
    title: 'Simple surfaces, smart systems',
    description: 'Complex AI should feel effortless to users. The sophistication belongs in the backend—the interface should be clean, fast, and remarkably intuitive.',
  },
  {
    title: 'User problems first, solutions second',
    description: 'I resist jumping to features before deeply understanding the job-to-be-done. The best products solve real, painful problems in the simplest way.',
  },
  {
    title: 'Ship to learn, not to launch',
    description: 'Launches are checkpoints, not finish lines. Real product development happens in the fast iteration cycles that follow a version one release.',
  },
];

export interface CaseStudyContent {
  id: string;
  overview: string;
  problem: string;
  approach: string[];
  solution: string;
  results: { metric: string; value: string; description: string }[];
  learnings: string[];
  tools?: string[];
}

export const CASE_STUDIES: Record<string, CaseStudyContent> = {
  'cerebro-ai': {
    id: 'cerebro-ai',
    overview: 'Cerebro AI is a personal knowledge engine designed to capture, organize, and resurface information across your digital life. Built on a custom RAG (Retrieval-Augmented Generation) architecture, it provides context-aware retrieval with zero-friction entry.',
    problem: 'Knowledge workers spend an average of 2.5 hours daily searching for information they\'ve already encountered. Existing note-taking and bookmarking tools fail because they require manual organization and don\'t surface relevant information at the right moment.',
    approach: [
      'Conducted 30+ user interviews with knowledge workers to understand information capture and retrieval pain points',
      'Mapped the complete user journey from information discovery to retrieval across multiple platforms',
      'Designed a frictionless capture system that works across browser, mobile, and desktop',
      'Built a custom RAG architecture optimized for personal knowledge retrieval',
      'Implemented semantic search with contextual re-ranking based on user patterns'
    ],
    solution: 'A unified knowledge layer that passively captures information from your digital activities and proactively surfaces relevant context when you need it. The system learns from your behavior to improve relevance over time.',
    results: [
      { metric: 'DAU/MAU', value: '42%', description: 'Industry-leading engagement ratio indicating strong product-market fit' },
      { metric: 'Time Saved', value: '45 min/day', description: 'Average reduction in information retrieval time per user' },
      { metric: 'Retention', value: '68%', description: '30-day retention rate among active users' }
    ],
    learnings: [
      'Passive capture dramatically outperforms active note-taking for busy professionals',
      'Contextual relevance matters more than comprehensive search results',
      'Users need to trust the system before they\'ll rely on it—transparency in AI decisions builds confidence'
    ],
    tools: ['Python', 'LangChain', 'Pinecone', 'React', 'TypeScript', 'OpenAI API']
  },
  'leaklock': {
    id: 'leaklock',
    overview: 'LeakLock is an AI-driven expense intelligence platform that automatically surfaces forgotten subscriptions, detects recurring overcharges, and identifies spending anomalies across digital payments.',
    problem: 'The average consumer loses $512 annually to forgotten subscriptions and unnoticed recurring charges. Traditional budgeting apps require manual categorization and fail to proactively identify financial leaks.',
    approach: [
      'Analyzed spending patterns from anonymized transaction data to identify common leak patterns',
      'Designed ML models to detect subscription patterns, price increases, and anomalous charges',
      'Created a frictionless cancellation flow that reduces the effort to cancel unwanted subscriptions',
      'Built notification systems that alert users at optimal times for engagement'
    ],
    solution: 'An intelligent financial watchdog that connects to your accounts, automatically categorizes transactions, and proactively alerts you to money leaks before they compound.',
    results: [
      { metric: 'Avg Savings', value: '$450/yr', description: 'Average annual savings identified per user' },
      { metric: 'Detection Rate', value: '94%', description: 'Accuracy in identifying subscription charges' },
      { metric: 'Cancellation Rate', value: '3x', description: 'Increase in successful cancellations vs manual process' }
    ],
    learnings: [
      'Users respond better to specific dollar amounts than percentages',
      'Timing of notifications significantly impacts action rates',
      'Trust is paramount when dealing with financial data—security messaging must be prominent'
    ],
    tools: ['Python', 'Plaid API', 'TensorFlow', 'React Native', 'PostgreSQL']
  },
  'hinge-roadmap': {
    id: 'hinge-roadmap',
    overview: 'A comprehensive product improvement roadmap for Hinge aimed at reducing superficial swiping behavior and encouraging more meaningful connections through behavioral nudges and intentional design.',
    problem: 'Dating apps suffer from a paradox: the more successful they are at creating matches, the less users need them. Hinge\'s "designed to be deleted" positioning creates tension with engagement metrics. Users also report swipe fatigue and shallow interactions.',
    approach: [
      'Analyzed public data on dating app engagement patterns and user complaints',
      'Studied behavioral economics principles applicable to relationship formation',
      'Mapped the user journey from signup to successful date to identify friction points',
      'Designed experiments to test hypotheses about intentional dating behavior'
    ],
    solution: 'A series of product changes including: limited daily likes to increase intentionality, prompted conversation starters tied to profile content, and a "slow dating" mode that reveals matches gradually.',
    results: [
      { metric: 'LTV Impact', value: 'Significant Lift', description: 'Projected increase in lifetime value through improved retention' },
      { metric: 'Match Quality', value: '+40%', description: 'Estimated improvement in conversation-to-date conversion' },
      { metric: 'User Satisfaction', value: '+25%', description: 'Projected NPS improvement based on similar implementations' }
    ],
    learnings: [
      'Scarcity increases perceived value—limited actions lead to more thoughtful choices',
      'Prompts that reference specific profile content dramatically improve response rates',
      'Users want permission to slow down but won\'t do it without product-level constraints'
    ]
  },
  'nike-app': {
    id: 'nike-app',
    overview: 'A deep-dive product analysis of Nike\'s mobile app with prioritized recommendations to improve user engagement and purchase conversion through personalized membership experiences.',
    problem: 'Nike\'s app struggles with engagement between purchases. Users open the app with intent to buy but don\'t return for content, community, or fitness features. This creates missed opportunities for relationship building and repeat purchases.',
    approach: [
      'Conducted competitive analysis across retail, fitness, and lifestyle apps',
      'Mapped the current user journey and identified engagement drop-off points',
      'Analyzed the Jobs-to-be-Done framework for Nike app users',
      'Prioritized opportunities using RICE scoring methodology'
    ],
    solution: 'A redesigned experience that integrates fitness tracking, style recommendations, and exclusive content into a cohesive membership journey. Key features include personalized product recommendations based on activity data and a gamified rewards system.',
    results: [
      { metric: 'Conversion', value: 'Optimized', description: 'Projected improvement in browse-to-purchase conversion' },
      { metric: 'Session Frequency', value: '+60%', description: 'Estimated increase in weekly app opens' },
      { metric: 'Member Engagement', value: '+35%', description: 'Projected increase in membership feature usage' }
    ],
    learnings: [
      'Fitness and commerce can reinforce each other when properly integrated',
      'Exclusive access is more motivating than discounts for brand-loyal customers',
      'Personalization must feel helpful, not surveillance-like'
    ]
  },
  'apple-stock': {
    id: 'apple-stock',
    overview: 'An interactive analytics and forecasting dashboard to explore historical Apple stock performance and generate short-term price forecasts using machine learning models.',
    problem: 'Retail investors lack access to sophisticated analytical tools that institutional investors use. Existing platforms either overwhelm with complexity or oversimplify to the point of being unhelpful.',
    approach: [
      'Collected and cleaned 10+ years of Apple stock data and relevant market indicators',
      'Implemented multiple forecasting models including LSTM, ARIMA, and ensemble methods',
      'Designed an intuitive dashboard that surfaces insights without requiring technical expertise',
      'Built backtesting capabilities to validate model performance'
    ],
    solution: 'A web-based dashboard that combines historical analysis with ML-powered forecasting, presented in an accessible format for non-technical users.',
    results: [
      { metric: 'Model Accuracy', value: '73%', description: 'Directional accuracy on 5-day forecasts' },
      { metric: 'Backtesting', value: '+12%', description: 'Hypothetical returns vs buy-and-hold over test period' },
      { metric: 'User Comprehension', value: '89%', description: 'Users who correctly interpreted forecast confidence intervals' }
    ],
    learnings: [
      'Communicating uncertainty is as important as the prediction itself',
      'Users prefer relative comparisons to absolute numbers',
      'Interactive exploration builds understanding better than static reports'
    ],
    tools: ['Python', 'TensorFlow', 'Pandas', 'Plotly', 'Streamlit']
  },
  'elevn-teardown': {
    id: 'elevn-teardown',
    overview: 'A comprehensive product teardown of the Elevn dating app focusing on onboarding friction, initial user success metrics, and long-term retention loops.',
    problem: 'Elevn, a newer entrant in the dating app space, struggles with user retention despite positive initial reviews. The product teardown aims to identify specific friction points and opportunities for improvement.',
    approach: [
      'Created new accounts and documented the complete onboarding experience',
      'Analyzed the app\'s feature set against established competitors',
      'Identified gaps in the user journey from signup to first meaningful interaction',
      'Evaluated the monetization strategy and its impact on user experience'
    ],
    solution: 'A detailed analysis with specific recommendations for improving onboarding completion rates, increasing early engagement, and building sustainable retention loops.',
    results: [
      { metric: 'Friction Points', value: '12', description: 'Identified opportunities for UX improvement' },
      { metric: 'Quick Wins', value: '5', description: 'Low-effort, high-impact recommendations' },
      { metric: 'Strategic Pivots', value: '3', description: 'Larger directional changes suggested' }
    ],
    learnings: [
      'First-session experience disproportionately impacts long-term retention',
      'Profile completion incentives must balance quality with friction',
      'Differentiation in dating apps requires more than feature parity'
    ]
  },
  'udemy-sense': {
    id: 'udemy-sense',
    overview: 'A product sense exercise identifying core user friction in course completion rates on Udemy and proposing structural gamification improvements.',
    problem: 'Online learning platforms face notoriously low completion rates—often below 15%. Udemy\'s self-paced model, while flexible, lacks the accountability structures that drive course completion.',
    approach: [
      'Analyzed publicly available data on MOOC completion rates and contributing factors',
      'Mapped the learner journey from course discovery to certification',
      'Studied successful gamification implementations in adjacent industries',
      'Designed a framework for progressive commitment and social accountability'
    ],
    solution: 'A gamification system that combines streak mechanics, cohort-based learning options, and milestone celebrations to increase completion rates without compromising the self-paced value proposition.',
    results: [
      { metric: 'Completion Impact', value: '+45%', description: 'Projected increase in course completion rates' },
      { metric: 'Engagement', value: '+30%', description: 'Estimated increase in weekly active learning time' },
      { metric: 'NPS Impact', value: '+15 pts', description: 'Projected improvement in learner satisfaction' }
    ],
    learnings: [
      'Flexibility and accountability aren\'t mutually exclusive with the right design',
      'Social features work best when opt-in and low-pressure',
      'Progress visibility is more motivating than rewards for adult learners'
    ]
  }
};
