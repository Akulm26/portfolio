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
    imageUrl: 'https://i.ibb.co/5Xqx2M9F/Screenshot-2026-01-07-at-22-58-27-1.png',
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
    imageUrl: 'https://techcrunch.com/wp-content/uploads/2022/05/Hinge_Self-Care_Prompts_01.jpg?w=1024',
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
    overview: 'LeakLock is an invisible money tracker that automatically detects forgotten subscriptions and recurring charges through on-device SMS parsing. Built with privacy-first architecture, all processing happens locally on your Android device—no cloud uploads, no data collection.',
    problem: 'I kept paying for things I wasn\'t using. A free trial I forgot to cancel. A duplicate charge I didn\'t notice. An app I subscribed to once and never opened again. Every month, small amounts quietly left my account - ₹99 here, ₹199 there. Individually tiny. Collectively, a leak. The worst part? I only discovered these when I actually sat down and scrolled through months of bank statements. By then, I\'d already lost money I could have saved. In India, this problem is everywhere. UPI mandates made payments frictionless - but also invisible. You tap once, and suddenly you\'re auto-charged every month without a reminder. Research shows 71% of users report hidden charges, and companies see up to 200% revenue uplift simply because people forget to cancel. That\'s when I realized: the problem isn\'t spending money. It\'s not seeing where it quietly leaks.',
    approach: [
      'Asked "Why do people keep paying for things they don\'t use?" - Three reasons: Forgetting (free trials convert silently), Friction (cancelling is intentionally hard with dark patterns), and Invisibility (recurring charges hide in transaction history)',
      'Realized existing apps require manual entry—which means users must remember what they\'re forgetting. That\'s broken by design',
      'Built LeakLock with automation at the core: scan SMS messages locally, detect subscriptions automatically, and surface them before the next charge hits',
      'Designed privacy-first architecture: all SMS parsing happens on-device, nothing uploaded to cloud'
    ],
    solution: 'A privacy-first, automation-led tracking system. Auto-detection finds subscriptions via local SMS parsing (no manual entry). Smart reminders alert before renewal, not after. One-tap pause/cancel flow with reason capture. Duplicate prevention validates by name + date. All SMS parsed on-device with no cloud storage.',
    results: [
      { metric: 'First Sync Success', value: '≥1 sub', description: 'Users see value immediately on first login - no setup needed' },
      { metric: 'Avg Savings', value: '₹100-₹500/mo', description: 'Real money recovered from paused or cancelled subscriptions' },
      { metric: 'Day-30 Retention', value: '≥25%', description: 'Users stick around because they\'re saving money' },
      { metric: 'NPS Target', value: '≥45', description: 'Users feel in control and trust the app' }
    ],
    learnings: [
      'Automation removes the core friction. The entire problem is that people forget. Asking them to manually enter subscriptions defeats the purpose. SMS parsing - done locally and privately - solved this elegantly.',
      'Privacy is a feature, not a tradeoff. Indian users are increasingly wary of apps accessing their data. By processing everything on-device and never uploading messages, LeakLock turned a potential trust barrier into a selling point.',
      'Timing matters more than information. Showing users a list of subscriptions is useful. Alerting them three days before a renewal - when they can still act - is what actually saves money.',
      'Dark patterns are the real enemy. Companies make cancellation intentionally hard. LeakLock\'s value isn\'t just visibility - it\'s giving users a fighting chance against systems designed to make them forget.'
    ],
    tools: ['Android', 'SMS Parsing', 'On-Device Processing', 'UPI Mandate Detection', 'Local Storage']
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
    overview: 'Nike\'s app isn\'t just a store - it\'s a lifestyle ecosystem. Members get exclusive drops, personalized recommendations, community events, and access to Nike\'s most innovative products. But longtime members with low purchase frequency are quietly disengaging, creating a hidden retention problem.',
    problem: 'Longtime members with low purchase frequency aren\'t receiving relevant updates or compelling reasons to return. The rewards feel stale, and casual users aren\'t being converted into active customers. The app feels less engaging over time - leading to churn and stagnant monthly active users. For Nike, this is a retention problem hiding in plain sight.',
    approach: [
      'Segmented Nike\'s user base into Casual Users (platform explorers, event-driven shoppers, price-sensitive buyers), Active Users (performance athletes, content creators, frequent campaign responders), and Brand Endorsers (sports personalities driving brand recall)',
      'Analyzed Nike\'s key features: Nike Member Pass (QR-based access to exclusive events), Nike By You (AI-powered customization with virtual rotation), and Chat with Nike Experts (real human support)',
      'Conducted competitive analysis: Nike (robust member ecosystem but region-restricted drops), Puma (strong lifestyle collaborations but minimal community), Adidas (sustainability focus but poor chat support)',
      'Identified the core problem: Members sign up but don\'t stay engaged without frequent, personalized rewards'
    ],
    solution: 'Tiered engagement system with frequent, personalized rewards. Elements include: Tiered Member Rewards (rewards based on engagement, not just purchases), Personalized Offers (tailored to browsing history and favorite sports), Surprise Benefits (unexpected perks like early access), Limited-Time Promotions (app-exclusive deals creating urgency), and Re-engagement Content (curated stories and events for dormant users). This creates anticipation and value, generating richer behavioral data for better recommendations.',
    results: [
      { metric: 'Monthly Active Users', value: 'Increase', description: 'Dormant members return to the app more frequently' },
      { metric: 'Retention Rate', value: 'Improve', description: 'Users stay engaged longer due to ongoing rewards' },
      { metric: 'Purchase Frequency', value: 'Increase', description: 'Personalized offers convert browsers into buyers' },
      { metric: 'Customer Lifetime Value', value: 'Grow', description: 'Engaged members spend more over time' },
      { metric: 'Churn Rate', value: 'Decrease', description: 'Fewer users quietly abandon the app' }
    ],
    learnings: [
      'Membership isn\'t engagement. Signing up is easy. Staying active is hard. Nike\'s member ecosystem is powerful, but it needs to continuously reward users - even the quiet ones - to prevent silent churn.',
      'Community is a competitive moat. Puma has collaborations. Adidas has sustainability. But Nike\'s Run Club, Training Club, and exclusive events create emotional connection that competitors struggle to replicate.',
      'Personalization drives loyalty. Nike By You lets users design their own shoes. AI-powered recommendations surface relevant products. These features make users feel seen - and that feeling converts to purchases.',
      'Human support still matters. In an age of chatbots, Nike\'s real human experts stand out. Trust is built through authentic interaction, not automated replies.'
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
