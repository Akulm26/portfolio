export interface Project {
  id: string;
  title: string;
  headline: string;
  type: string;
  description: string;
  ctaText: string;
  isFeatured?: boolean;
  imageUrl?: string;
}

export interface Capability {
  title: string;
  subtitle?: string;
  description: string;
  proof: string;
}

export interface Step {
  title: string;
  icon: string;
  description: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface WorkMetric {
  value: string;
  label: string;
  trend?: 'up' | 'down';
}

export interface WorkStory {
  title: string;
  subtitle: string;
  resumeBullet: string;
  star: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface WorkExperience {
  company: string;
  role: string;
  location: string;
  dates: string;
  context: string;
  metrics: WorkMetric[];
  stories: WorkStory[];
}