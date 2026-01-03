
import { Project, Capability, Step, Principle } from './types';

export interface EnhancedProject extends Project {
  metricLabel?: string;
  metricValue?: string;
  role?: string;
}

export const PROJECTS: EnhancedProject[] = [
  {
    id: 'fitness-app',
    title: 'Fitness Online',
    headline: 'Engagement feature that drove major gains in user stickiness',
    type: 'Customer-Facing Product',
    role: 'Lead PM',
    metricLabel: 'Paid Retention',
    metricValue: '+22%',
    description: 'Shipped guided workouts, a community sports feed, and workout tracking features that significantly improved user engagement and paid retention.',
    ctaText: 'View Case Study',
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1600&auto=format&fit=crop',
  },
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
    imageUrl: 'https://drive.google.com/file/d/1McZ75tTv4wYUXN_wZ0_LVFAQcS7kREDZ/view?usp=sharing',
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
    id: 'ai-news',
    title: 'AI News App',
    headline: 'Recommendation strategy that significantly increased session time',
    type: 'AI Product Incubation',
    description: 'Designed an AI-driven news experience focused on improving content relevance and session depth through intelligent recommendations.',
    ctaText: 'View Case Study',
  },
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
