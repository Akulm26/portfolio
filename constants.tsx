import { Project, Capability, Step, Principle, WorkExperience } from './types';

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
    title: 'Product Teardown - Udemy',
    headline: 'Online Learning Marketplace Analysis',
    type: 'Product Analysis',
    description: 'Comprehensive analysis of Udemy\'s marketplace dynamics, identifying search and ranking bias issues, and proposing balanced visibility solutions to improve the content ecosystem.',
    ctaText: 'View Teardown',
  },
  {
    id: 'reddit-technical',
    title: 'Deconstructing the Black Box',
    headline: 'The Reddit Technical Case',
    type: 'Technical Case Study',
    description: 'A deep dive into demonstrating technical empathy as a PM - understanding architectural trade-offs, database decisions, and API design without writing production code.',
    ctaText: 'View Case Study',
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
    overview: 'A comprehensive product teardown of Udemy\'s marketplace dynamics, examining user segmentation, competitive positioning, and platform-level challenges in balancing quality with discoverability.',
    problem: 'Udemy operates a two-sided marketplace connecting knowledge hunters (learners) with knowledge providers (instructors). While the platform excels at scale and affordability, it faces critical challenges: new quality courses struggle with visibility, learners see repetitive top courses, and the ecosystem risks overdependence on a few mega-courses. This search and ranking bias threatens both content diversity and instructor retention.',
    approach: [
      'Segmented users into three groups: Knowledge Hunters (students, professionals, job seekers), Knowledge Providers (independent instructors), and Businesses (organizations)',
      'Analyzed pain points and value drivers for each segment through user journey mapping',
      'Conducted competitive analysis comparing Udemy with LinkedIn Learning and Skillshare',
      'Identified root causes of marketplace imbalance, focusing on discoverability bias and ranking monopolies'
    ],
    solution: 'Proposed a balanced visibility system using quality-weighted rotation and A/B testing. The solution allocates percentage slots in search results to new or low-visibility high-quality courses, implements periodic rotation for fair exposure, and measures impact on learner satisfaction and conversion. This breaks the monopoly cycle while maintaining content quality standards.',
    results: [
      { metric: 'Instructor Retention', value: 'Improved', description: 'Fair exposure opportunity for new instructors, sustained engagement' },
      { metric: 'Content Diversity', value: 'Expanded', description: 'Learners discover fresh, niche, and innovative courses' },
      { metric: 'Revenue Distribution', value: 'Balanced', description: 'Healthier ecosystem reduces overdependence on mega-courses' },
      { metric: 'Platform Health', value: 'Strengthened', description: 'Stronger instructor pipeline with more unique offerings' }
    ],
    learnings: [
      'Marketplace success depends on both sides thriving - optimizing only for today\'s top performers creates fragility',
      '"Speed to market" is Udemy\'s real competitive advantage - experts can teach trending topics within days',
      'Deep discounts expand the market, not just share - bringing in learners who wouldn\'t pay otherwise',
      'Credentials matter differently by segment - hobbyists value completion, professionals need career-aligned credentials',
      'Enterprise (Udemy Business) is a different game - diversifies revenue and positions platform as workforce development partner'
    ]
  },
  'reddit-technical': {
    id: 'reddit-technical',
    overview: 'A deep dive into demonstrating technical empathy as a PM during a technical interview with a CTO - proving the ability to understand architectural trade-offs, database decisions, and API design without writing production code.',
    problem: 'The "Non-Technical" PM Stigma. Walking into a final round at Reddit confident in product sense and metrics, but facing the "Technical Round" with the CTO. The challenge wasn\'t just "knowing the tech" - it was demonstrating Technical Empathy and proving the ability to sit in a room with engineers, understand the architectural costs of product decisions, and design systems that scale.',
    approach: [
      'Adopted the "City Planner" Mindset - acting as the city planner (who decides where zones go and how traffic flows) rather than the architect (who decides how every brick is laid)',
      'Used First Principles Thinking to reverse-engineer Reddit - asking "If I have 50 million daily users trying to upvote a cat video at the same time, what kind of system breaks? And what kind of system survives?"'
    ],
    solution: 'Demonstrated technical literacy through three key areas: (1) Tech Stack explanation using Three-Tier Logic - Frontend (React.js for component reusability), Backend (Python for business logic, Go for high-concurrency services), Database (PostgreSQL for accuracy, Cassandra for speed); (2) Trade-off analysis using CAP Theorem - choosing PostgreSQL for User Identity system prioritizing Data Integrity over raw write speed; (3) API Economy design - creating a lightweight JSON endpoint for search partners with metadata for intelligent ranking.',
    results: [
      { metric: 'Gap Bridged', value: 'Yes', description: 'Proved that while not pushing code, understanding the implications of code is key' },
      { metric: 'Engineering Trust', value: 'Built', description: 'Correctly identifying SQL vs NoSQL trade-offs showed capability to not promise impossible features' },
      { metric: 'Business Alignment', value: 'Demonstrated', description: 'API design showed technology as a vehicle for business growth (revenue share/traffic)' }
    ],
    learnings: [
      'Technical literacy is the ultimate empathy - you don\'t need to be a developer to ace a technical round; you need to be a Translator',
      'The most valuable PMs are the ones who can look at a Business Goal (Revenue) and understand the Technical Lever (API Latency) required to pull it',
      'Architecture is Product - the way we structure our data ultimately defines the limits of what features we can build',
      'Understanding the schema isn\'t just "tech stuff" - it\'s the foundation of the roadmap'
    ]
  }
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: 'Wareline Technologies',
    role: 'Product Manager',
    location: 'Chandigarh (Remote)',
    dates: 'March 2024 – September 2025',
    context: 'Led development of an AI-powered news application with personalized recommendations, LLM summarization, and engagement optimization.',
    metrics: [
      { value: '20%', label: 'Content Relevance', trend: 'up' },
      { value: '2.5x', label: 'Daily App Opens', trend: 'up' },
      { value: '50+', label: 'News Sources' },
      { value: '7', label: 'Person Team Led' }
    ],
    stories: [
      {
        title: 'Recommendation Algorithm A/B Testing',
        subtitle: 'Led experimentation across 300 users to find the optimal personalization approach',
        resumeBullet: 'Improved content relevance 20% by leading A/B tests of 3 recommendation algorithms (collaborative, content-based, hybrid) across 300 internal users, increasing session duration 15% (4.1→4.7 min) and articles read per session 12%, directly supporting our ad monetization model which required 7+ min sessions for profitability',
        star: {
          situation: 'At Wareline Technologies, we were building an AI-powered news application designed to deliver highly personalized news feeds. During internal beta testing with 300 users, we faced a critical monetization risk: our ad-supported business model required 7+ minute average session durations to hit revenue targets, but we were tracking at just 4.1 minutes—40% below benchmark. User research revealed the core issue: 62% of users who churned after 2-3 articles cited "content not relevant to my interests" as the primary reason. Despite having a clean interface and strong RSS parsing infrastructure, our feed felt generic. Drop-off analysis showed users were leaving not because of technical issues, but because our one-size-fits-all content ranking wasn\'t surfacing articles they cared about.',
          task: 'As the Product Manager leading personalization, my objective was to identify and validate which recommendation algorithm would meaningfully improve content relevance—measured by engagement, not just algorithm accuracy scores. Leadership needed confidence that investing in personalization infrastructure would close our 40% session duration gap. I set a success target: +15% increase in average session duration (4.1→4.7min) during internal beta, with statistical significance (p<0.05), which would put us on a trajectory toward our 7min profitability threshold.',
          action: '1. Hypothesis Formation & Algorithm Selection: I collaborated with data science to analyze reading patterns and identified three distinct personalization approaches worth testing: Collaborative filtering (low data requirements, fast to implement, but needed critical mass of users), Content-based filtering (could work with sparse user data, but risked creating filter bubbles), and Hybrid model (combining both, but required 2x compute resources and more complex ranking logic). Each had trade-offs. I prioritized testing all three because our user base was still growing, and I didn\'t know whether we\'d have enough behavioral data for collaborative filtering to work. 2. Experiment Design: I designed a rigorous A/B test structure with 3 cohorts of 100 users each (sample size validated via power analysis with data science—needed 95 users per cohort for p<0.05 at our expected effect size), 4-week test duration (based on our internal users\' weekly engagement patterns—needed 2+ full weeks per user to reach significance). Primary metric: Session duration (business-critical). Secondary metrics: Articles read per session, feed refresh rate, scroll depth. Composite "Relevance Score": I worked with data science to define this as 0.3(CTR) + 0.3(completion rate) + 0.4(time on article)—weighted toward consumption depth since our goal was meaningful engagement, not just clicks. 3. Instrumentation & Tracking: I worked with engineering to implement Mixpanel + Firebase event tracking (article_opened, session_time, feed_refresh, scroll_depth) and set up automated dashboards showing weekly performance by cohort. I also added a lightweight in-app survey asking "How relevant did today\'s articles feel?" (1-5 scale) to validate quantitative findings with qualitative sentiment. 4. Stakeholder Alignment on Trade-offs: When preliminary results showed the hybrid model leading after week 2, I proactively brought engineering leadership into the decision process. The hybrid approach required 2x compute resources vs. collaborative filtering alone, which would impact our infrastructure budget. I presented a cost-benefit analysis: the projected engagement gains (+15% session duration) would generate an estimated $120K additional annual ad revenue (based on our CPM rates), which easily justified the $35K/year incremental infrastructure cost. Engineering approved the investment.',
          result: 'The hybrid recommendation model won decisively with statistically significant results (p<0.01): Content relevance: +20% (based on our composite relevance score). Session duration: +15% (4.1→4.7 minutes)—on track toward our 7min profitability goal. Articles read per session: +12%. User satisfaction: 4.2/5 avg rating for "content relevance" (vs. 3.1/5 for collaborative filtering, 3.5/5 for content-based). Post-launch sustainability: I established a monitoring dashboard tracking relevance metrics weekly and set up automated alerts for >5% degradation in any key metric. Over the subsequent 8 weeks in production, gains sustained and even improved slightly (+17% session duration by week 12) as the model accumulated more training data. Broader impact: The hybrid model became the foundation for our personalization infrastructure. The experimentation framework I built was reused for subsequent tests (notification timing, article summarization quality), and the "relevance score" metric became our team\'s North Star for content quality decisions.'
        }
      },
      {
        title: 'AI News Platform Architecture',
        subtitle: 'Designed end-to-end architecture for content ingestion, AI summarization, and personalization',
        resumeBullet: 'Built AI-powered news platform by defining RSS feed parsing architecture supporting 50+ sources, integrating LLM summarization, and designing personalized recommendation system',
        star: {
          situation: 'Wareline Technologies was tasked with building an AI-powered news application from scratch. The vision was ambitious: aggregate content from dozens of news sources, use AI to summarize articles intelligently, and deliver personalized feeds that adapted to each user\'s interests. However, there was no existing infrastructure — we needed to define the entire technical architecture from content ingestion to user-facing delivery.',
          task: 'As Product Manager, my responsibility was to define the product architecture: how we\'d ingest content from multiple sources, process it with AI for categorization and summarization, and serve personalized recommendations at scale. I needed to translate business requirements into technical specifications that the engineering team could execute.',
          action: 'I defined the RSS feed parsing architecture to support 50+ news sources across multiple categories (tech, business, sports, entertainment, etc.). I worked with engineering to integrate LLM-based article summarization, allowing users to get quick digests without reading full articles — this reduced average reading time by 40% for users who engaged with summaries. I designed the personalized recommendation system architecture, ultimately settling on a hybrid approach combining collaborative and content-based filtering after extensive research into what major news apps (Google News, SmartNews, Inshorts) were doing. I created detailed PRDs and worked closely with the 7-person engineering team through the full development lifecycle, from ideation to launch.',
          result: 'We launched a fully functional AI news platform with automated content aggregation from 50+ sources, LLM-powered summarization that reduced reading time by 40%, and personalized feeds powered by our hybrid recommendation engine. This core architecture enabled all subsequent engagement experiments and feature iterations, becoming the foundation for Wareline\'s news product offering.'
        }
      },
      {
        title: 'Personalized Breaking News Alerts',
        subtitle: 'Implemented smart notification system balancing relevance with frequency',
        resumeBullet: 'Increased daily app opens 2.5x (2→5 per day) by implementing personalized breaking news alerts triggered by user topic preferences and event detection',
        star: {
          situation: 'After launching the AI news app, we noticed a retention challenge: users were only opening the app twice per day on average. While session engagement was improving thanks to our recommendation algorithm work, we were missing opportunities to re-engage users throughout the day when news they cared about was breaking. Push notifications existed but were generic and often ignored.',
          task: 'My objective was to increase daily app opens by implementing smart, personalized notifications that felt genuinely helpful rather than spammy. The challenge was finding the right balance — we needed to notify users about relevant breaking news without overwhelming them or causing notification fatigue.',
          action: 'I designed a notification system triggered by user topic preferences (tech, sports, finance, politics, etc.) combined with event detection logic to identify genuinely breaking news worth alerting. We built topic-preference tracking based on user reading behavior and explicit selections during onboarding. I designed notification copy templates and implemented frequency caps to prevent fatigue — no more than 5 notifications per day, with smart suppression during nighttime hours. We A/B tested different notification strategies: generic alerts vs. personalized alerts vs. a control group with no breaking news notifications.',
          result: 'Daily app opens increased 2.5x, from 2 to 5 per day. Users who received personalized alerts showed significantly higher engagement — they were returning throughout the day when stories matched their interests. Notification opt-out rates remained low (under 8%), indicating we\'d found the right balance between relevance and frequency. This feature became a key differentiator for user retention.'
        }
      }
    ]
  },
  {
    company: 'Seacan Overseas',
    role: 'Founder\'s Office (Strategy & Operations)',
    location: 'Chandigarh',
    dates: 'June 2023 – November 2023',
    context: 'Early-stage immigration and study abroad startup. Drove go-to-market strategy, built analytics infrastructure, and optimized visa processing workflows.',
    metrics: [
      { value: '20%', label: 'Revenue (QoQ)', trend: 'up' },
      { value: '15%', label: 'Processing Time', trend: 'down' },
      { value: '10+', label: 'University Partnerships' },
      { value: '3.9 → 4.8', label: 'CSAT' }
    ],
    stories: [
      {
        title: 'Market Positioning & Data-Driven Growth Dashboard',
        subtitle: 'Established differentiated positioning and built analytics infrastructure from scratch',
        resumeBullet: 'Drove 20% revenue growth by establishing differentiated go-to-market positioning for target customer segments through competitive and user research.',
        star: {
          situation: 'When I joined Seacan Overseas, it was an early-stage immigration startup with no clear market positioning or data visibility. Leads came through word-of-mouth, but conversions and pricing were inconsistent. The founders had no dashboard to track revenue, leads, or service performance — they were essentially flying blind. Competitors in the immigration consulting space were winning on price, but Seacan had no clear differentiator.',
          task: 'As part of the Founder\'s Office, I was tasked with two objectives: (1) Define Seacan\'s unique market positioning through research, and (2) Build a measurement system to monitor growth and client funnel. Our target was 20% revenue growth within one quarter.',
          action: 'For market research and positioning, I analyzed 15+ competitors and conducted interviews with 25 prospective clients. A key insight emerged: Tier-2 city users valued transparency over discounts — they wanted to understand the process, not just get the cheapest price. I re-positioned Seacan as "an immigration partner offering transparent, step-by-step guidance." For the marketing funnel, I designed a CRM-based pipeline (Inquiry → Consultation → Converted) and tested two ad messages: "Apply Now" vs. "Transparent Timelines." The trust-based messaging lifted conversion by 24%. For analytics, I built a dashboard tracking lead source, country interest, funnel stage, consultant name, package type, payment received, processing time, and client satisfaction. I calculated Average Ticket Size (Total Revenue ÷ Converted Clients) to measure per-client yield, and added CAC and Cost-per-Lead metrics for channel ROI visibility. We reviewed dashboards weekly with founders and trained counselors on top client queries.',
          result: 'Revenue increased 20.6% quarter-over-quarter, driven by conversion rate improvement from 18% to 26%. Average Ticket Size rose 12%, showing better upsells and pricing discipline. Client satisfaction improved 25%, and processing time decreased 15%. Seacan secured its Tier-2 market position and achieved 2x lead volume growth.'
        }
      },
      {
        title: 'Visa Process Optimization & Service Delivery',
        subtitle: 'Built university partnerships and standardized visa workflows',
        resumeBullet: 'Improved service delivery and CSAT by 15% through visa process optimization and input on expansion strategy.',
        star: {
          situation: 'Seacan relied on walk-ins and third-party agents, which limited authenticity and slowed offer-letter and visa timelines. There was no direct relationship with universities, and operationally, visa files were handled manually — each counselor used their own process, creating delays and inconsistent client experiences. Average visa processing time was 27 days, and client satisfaction was 3.9/5.',
          task: 'My goal was to strategically expand Seacan\'s footprint across key destinations (Singapore, Canada, Cyprus, Poland, Finland), build direct university partnerships, and optimize visa workflows to improve service delivery by at least 15%.',
          action: 'For business expansion, I conducted market mapping of 30+ global universities to identify those open to official agent partnerships. I designed partner acquisition collateral (pitch deck, metrics dashboard, student success data) and personally negotiated 5 university MoUs within one month. These partnerships enabled faster student verification, 20% reduction in offer-letter turnaround, and higher student trust. For workflow optimization, I audited the visa pipeline end-to-end and mapped redundancies. I created a five-stage standardized process (Document Collection → Verification → Submission → Embassy Response → Client Delivery) with a color-coded Google Sheet tracker showing defined SLAs and auto-status visibility. I introduced on-time submission KPIs for counselors, daily huddles for bottleneck resolution, and client-facing status updates that cut inquiry calls by 30%.',
          result: 'Formed 10+ direct university partnerships, boosting lead quality and credibility by 40%. Visa processing time reduced by 15% (27 → 23 days). Client satisfaction rose from 3.9 to 4.8/5. On-time submission rate improved by 18 percentage points (69% → 87%). Seacan earned recognition as "Best Europe Visa Consultants in Chandigarh," and the partnership + workflow model became the company\'s scalable blueprint for expansion.'
        }
      }
    ]
  },
  {
    company: 'Apple Media Products',
    role: 'Business Analyst (Contract)',
    location: 'Washington, DC & Cupertino, CA',
    dates: 'November 2021 – May 2023',
    context: 'Supported Apple TV+, Apple Music, and Apple Arcade with KPI forecasting, content analytics, and growth insights across 100M+ users globally.',
    metrics: [
      { value: '20%', label: 'Forecast Error', trend: 'down' },
      { value: '30M+', label: 'Sessions Analyzed' },
      { value: '5', label: 'Content Launches Influenced' },
      { value: '15+', label: 'Regions Covered' }
    ],
    stories: [
      {
        title: 'KPI Forecasting Redesign Using DeepAR',
        subtitle: 'Built Apple\'s first country-level forecasting system using neural time-series modeling',
        resumeBullet: 'Led KPI forecasting redesign (eligibility, redemption, signups) for Apple TV+, Music and Arcade, reducing error by 20% and enabling country-level marketing planning across 15+ regions.',
        star: {
          situation: 'At Apple Media Products, leadership relied on high-level regional forecasts for key performance indicators — eligibility, redemption, and organic signups — to plan marketing budgets and promotional campaigns. However, those forecasts were aggregated at the regional level and didn\'t reflect country-specific patterns or product-level seasonality (student plan spikes in September, local holidays in India or Japan). As a result, actual performance often deviated by 25-30% from forecasts, creating planning inefficiencies and reduced visibility for local teams.',
          task: 'As the Business Analyst for this project, my mandate was to build Apple\'s first country- and KPI-level forecasting model, leverage DeepAR (a neural time-series forecasting method) to capture non-linear seasonal behavior and campaign effects, and improve KPI tracking accuracy by at least 20%.',
          action: 'I gathered two years of historical KPI data across 15 countries and three product lines, segmenting inputs by KPI, campaign type, and product (TV+, Music, Arcade). I established baselines for forecast error (MAPE ~25%) to quantify improvement. I implemented DeepAR, Amazon\'s probabilistic forecasting algorithm, to model both short-term seasonality and cross-country dependencies. The model learned from all time-series simultaneously, improving generalization for smaller countries with sparse data. I automated model training and forecast generation through Python (MXNet + GluonTS stack). I ran backtesting across 6 quarters and compared forecast variance to prior regional-level aggregates. I collaborated with marketing and finance to validate forecasts against actual campaign data, documented the methodology, and rolled out to 4 regional analytics pods.',
          result: 'Built Apple\'s first DeepAR-based country- and KPI-level forecasting system, covering 3 KPIs × 15 countries × 3 product lines. Reduced forecast variance by 20%, improving KPI tracking accuracy for eligibility, redemption, and organic signups. Enhanced local planning precision for regional marketing and partnership teams. The model was adopted as the standard forecasting pipeline within Apple Media Products\' global analytics framework.'
        }
      },
      {
        title: 'Apple TV+ Content Strategy & Audience Insights',
        subtitle: 'Analyzed 30M+ viewing sessions to guide content prioritization and regional launches',
        resumeBullet: 'Influenced 5 major content launches by analyzing viewer engagement across 20+ markets to identify 10+ top performing TV+ titles and inform content prioritization.',
        star: {
          situation: 'In 2022, Apple TV+ was scaling rapidly across 20+ international markets. Leadership needed sharper, country-specific visibility into which titles were resonating and where engagement was growing fastest. Existing analytics were global and aggregated, making it difficult to tell a market-level performance story that could guide launch priorities and localization decisions.',
          task: 'My mandate was to build a consistent insight framework that turned raw engagement data into strategic recommendations for Apple TV+ leadership. Targets included identifying high-retention titles and emerging regional hits, delivering quarterly insight reports to guide Top Content launch decisions, and improving content-planning visibility across 20+ markets by approximately 15%.',
          action: 'I partnered with analytics to analyze 30M+ viewing sessions across 20+ countries. I defined three standard KPIs to benchmark performance: Completion Rate (episodes fully watched ÷ episodes started × 100) showing content stickiness, Repeat Viewership (users who returned to re-watch ÷ total viewers × 100) capturing loyalty, and Audience Growth Rate (new viewers this period ÷ prior period viewers × 100 - 100) reflecting organic traction. Using these metrics, I identified 10+ trending titles with outsized retention or cross-market appeal (Pachinko in Japan, Severance in US, Ted Lasso globally). I consolidated findings into quarterly TV+ Review decks and newsletters, linking data to business impact such as regional audience growth and campaign ROI. I partnered with marketing and content-ops teams to translate insights into prioritized launch and localization plans.',
          result: 'Guided five Apple TV+ Top Content launches using standardized, data-backed insights. Improved market-level visibility by approximately 18%, enhancing precision in regional targeting. Established a repeatable audience-insight framework adopted for quarterly planning across TV+ markets.'
        }
      },
      {
        title: 'Apple Music Search Behavior Analysis',
        subtitle: 'Identified 10% growth potential by analyzing search-to-play conversion gaps',
        resumeBullet: 'Uncovered a 10% growth potential by analyzing search behavior across 5M+ Apple Music streams, influencing discovery feature roadmap.',
        star: {
          situation: 'Apple Music had strong content but user feedback suggested many people struggled to find what they actually wanted, especially in emerging genres. The product team suspected there was a gap between what users were searching for and what they were actually finding and playing, but no one had quantified the opportunity.',
          task: 'My objective was to analyze search behavior to identify where users were experiencing friction, quantify the growth opportunity from improving content discovery, and provide actionable insights for the discovery feature roadmap.',
          action: 'I analyzed 5.2 million search queries and noticed that about 620,000 searches (roughly 12%) were high-intent searches that weren\'t converting into plays. For example, the query "Punjabi indie" had 140,000 searches in the quarter but only an 11% click-through rate despite strong user demand. Similar patterns existed for "lofi beats" and "chill instrumental," which had millions of total plays but surprisingly low search-to-play CTRs (9-13%). When I compared search demand with actual listening, I found these mismatches were leading to approximately 830,000 missed plays per quarter. Since total listening volume for those categories was around 8.1 million plays, the recoverable opportunity was roughly 10.2%. I also identified a high-intent cohort of around 120,000 users who repeatedly searched the same artist within 48 hours. When these users were shown relevant playlists, their conversion rate jumped from 13% to 32% — a 2.4x improvement.',
          result: 'Uncovered 10% growth potential in content consumption by identifying search-to-play conversion gaps. Insights directly informed content strategy for mid-tier and emerging artists, leading to experiments in playlist placement and improved query mapping. The analysis shaped the discovery feature roadmap and provided a framework for ongoing search optimization.'
        }
      }
    ]
  },
  {
    company: 'Dfuse Tech',
    role: 'Associate Analytics Consultant (Data Science - Research)',
    location: 'Sterling, VA',
    dates: 'August 2020 – November 2021',
    context: 'Junior Data Scientist building ML solutions for security analytics, predictive maintenance, and marketing optimization.',
    metrics: [
      { value: '30%', label: 'False Positives', trend: 'down' },
      { value: '93%', label: 'Classification Accuracy' },
      { value: '35.7%', label: 'RUL Prediction', trend: 'up' },
      { value: '25K+', label: 'Profiles Analyzed' }
    ],
    stories: [
      {
        title: 'Insider Threat Detection System (MVP)',
        subtitle: 'Built anomaly detection MVP using machine learning on behavioral patterns',
        resumeBullet: 'Delivered a scalable outlier detection solution using 5 behavioral and technical features, resulting in companywide adoption and optimized insider threat detection.',
        star: {
          situation: 'At Dfuse Tech, internal security teams relied on rigid rule-based alerts for insider threat monitoring. The system raised too many false positives and missed nuanced behavioral deviations, leading to alert fatigue and delayed responses. The data science team was asked to explore a machine learning-driven approach to make detection adaptive and behavior-aware.',
          task: 'As a Junior Data Scientist, my responsibility was to research anomaly-detection methods that could learn from both behavioral and technical user patterns, build a working proof-of-concept (MVP) demonstrating improved precision versus rule-based detection, and collaborate with my manager to hand over a validated model for integration.',
          action: 'I conducted exploratory data analysis on the CERT r3.2 dataset (~20 GB, 1,000 users, 500 days of logs) to understand behavior patterns linked to insider risk — login frequency, device usage, file activity, and privilege escalation. I extracted five key attributes (three behavioral, two technical) that best captured abnormal user behavior. I implemented an Isolation Forest model in Python using scikit-learn to detect anomalies without requiring labeled malicious data. I tuned parameters (contamination = 0.05, estimators = 100) for optimal recall-precision balance and validated on synthetic attack scenarios. I documented the model pipeline, data transformations, and thresholds for production engineers, and worked with the senior data scientist during integration testing.',
          result: 'The MVP formed the core of Dfuse\'s insider-threat detection system, later adopted company-wide. Delivered approximately 30% false-positive reduction and faster analyst response times once integrated. The project became a reference framework for anomaly detection modules across Dfuse\'s security analytics portfolio.'
        }
      },
      {
        title: 'Aircraft Engine Predictive Maintenance',
        subtitle: 'Achieved 93% failure classification accuracy using sensor data from 100 turbofan engines',
        resumeBullet: 'Implemented supervised learning on sensor data from 100 turbofan engines, achieving 93% failure classification accuracy and a 35.7% boost in RUL prediction.',
        star: {
          situation: 'An aerospace client needed to predict turbofan engine failures before they happened, shifting from reactive to proactive maintenance. Maintenance teams were either running engines until warning lights triggered — risking costly downtime — or replacing them too early, wasting useful life. They needed two things: a risk classifier to flag engines nearing end-of-life, and a Remaining Useful Life (RUL) model to forecast how many cycles were left before failure.',
          task: 'As a Junior Data Scientist, I was responsible for building a predictive maintenance MVP using NASA\'s CMAPSS FD001 dataset (100 engines with sensor readings). I needed to create both a classification model for failure risk and a regression model for RUL prediction.',
          action: 'I started with label engineering, calculating RUL for each engine as (max_cycle - current_cycle). I discovered that early in an engine\'s life, sensor readings were flat with no degradation signal, so RUL values like 300+ just added noise. To solve this, I capped RUL at 125 cycles, focusing training on the meaningful degradation zone — this single change improved RMSE from 31.95 to 21.9 (approximately 31% error reduction). For classification, I trained and tuned Random Forest and XGBoost classifiers using 16 key sensor features to flag engines within 50 cycles of failure. For regression, I built an SVR model on the clipped RUL target using MinMax scaling, 2nd-order polynomial sensor interactions, and 37 top features selected to avoid overfitting.',
          result: 'Delivered an end-to-end predictive maintenance MVP. The XGBoost classifier achieved 93% accuracy (95.5% on validation) in predicting engines within 50 cycles of failure. The SVR model achieved RMSE of 20.54 and R² of 0.756, a 35.7% reduction in error compared to baseline. This enabled the client\'s maintenance team to plan interventions in advance, cut unplanned downtime, and optimize part replacement cycles — moving from guesswork to data-driven scheduling.'
        }
      },
      {
        title: 'Customer Segmentation & Marketing Optimization',
        subtitle: 'Identified 3 high-value segments contributing to 40% of deposits',
        resumeBullet: 'Built customer segmentation model using PySpark to analyze 25K+ customer profiles, identifying 3 high-value segments that contributed to 40% of deposits and enabling 12-15% reduction in marketing spend.',
        star: {
          situation: 'A mid-sized U.S. bank was spending heavily on marketing campaigns to get customers to open term deposits, but their conversion rates were poor. The problem? They were treating all customers the same — blasting the same message to everyone — without understanding which types of customers were actually likely to respond. Leadership had no visibility into who their best prospects were.',
          task: 'My job was to analyze their customer data and figure out: Who are the customers most likely to say yes? And how can marketing spend less while getting the same (or better) results?',
          action: 'I analyzed around 25,000 customer records combining financial data (account balance, loans) with demographic info (age, education, job type) and past campaign history. The first insight was surprising: traditional factors like education or marital status barely mattered. What actually predicted success was behavior — specifically, how long the sales call lasted and whether the customer had responded positively to a previous campaign. Using this, I built customer segments: High-value segment (customers with healthy balances, no outstanding loans, and prior positive engagement — 18% more likely to convert) and Low-value segment (customers with zero or negative balances who had ignored previous campaigns — less than 10% chance of converting). I also built a predictive model that could score any customer\'s likelihood to convert, so marketing could prioritize their outreach.',
          result: 'The bank now had a clear picture of who to target and who to skip. They identified 3 high-value segments that drove about 40% of all successful deposits. By focusing on these segments instead of blasting everyone, they reduced marketing spend by 12-15% while maintaining the same conversion numbers. The key insight: stop guessing, start targeting.'
        }
      }
    ]
  }
];
