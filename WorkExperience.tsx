import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, TrendingUp, TrendingDown, MapPin, Calendar, Briefcase, ArrowLeft } from 'lucide-react';
import { WorkExperience as WorkExperienceType, WorkMetric, WorkStory } from './types';
import { WORK_EXPERIENCES } from './constants';

// Metric Badge Component
const MetricBadge: React.FC<{ metric: WorkMetric }> = ({ metric }) => {
  const getTrendIcon = () => {
    if (metric.trend === 'up') return <TrendingUp className="w-3 h-3" />;
    if (metric.trend === 'down') return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const getTrendColor = () => {
    if (metric.trend === 'up') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (metric.trend === 'down') return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    return 'text-slate-300 bg-slate-500/10 border-slate-500/20';
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg ${getTrendColor()}`}
    >
      <div className="flex items-center gap-1.5">
        {getTrendIcon()}
        <span className="font-mono text-base font-bold tabular-nums">{metric.value}</span>
      </div>
      <span className="text-xs font-medium opacity-80">{metric.label}</span>
    </div>
  );
};

// STAR Details Component
const STARDetails: React.FC<{ story: WorkStory }> = ({ story }) => {
  return (
    <div className="space-y-6 pt-4">
      {/* Resume Bullet - Always Visible */}
      <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl p-6 border border-blue-500/10">
        <p className="text-slate-200 leading-relaxed">
          <span className="font-semibold text-blue-400">Impact Summary: </span>
          {story.resumeBullet}
        </p>
      </div>

      {/* STAR Breakdown */}
      <div className="space-y-5">
        {/* Situation */}
        <div className="group">
          <div className="flex items-start gap-3">
            <div className="mt-1 w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 font-bold text-sm">S</span>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wide">Situation</h5>
              <p className="text-slate-300 leading-relaxed text-[15px]">{story.star.situation}</p>
            </div>
          </div>
        </div>

        {/* Task */}
        <div className="group">
          <div className="flex items-start gap-3">
            <div className="mt-1 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold text-sm">T</span>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-wide">Task</h5>
              <p className="text-slate-300 leading-relaxed text-[15px]">{story.star.task}</p>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="group">
          <div className="flex items-start gap-3">
            <div className="mt-1 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold text-sm">A</span>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-wide">Action</h5>
              <p className="text-slate-300 leading-relaxed text-[15px]">{story.star.action}</p>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="group">
          <div className="flex items-start gap-3">
            <div className="mt-1 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 font-bold text-sm">R</span>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide">Result</h5>
              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-emerald-500/20">
                <p className="text-slate-200 leading-relaxed text-[15px] font-medium">{story.star.result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Story Accordion Item Component
const StoryAccordion: React.FC<{ story: WorkStory; index: number }> = ({ story, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div className="border border-slate-700/50 rounded-2xl overflow-hidden bg-slate-800/30 backdrop-blur-sm hover:border-slate-600/50 transition-all">
      {/* Story Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left group transition-all hover:bg-slate-700/20"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                {story.title}
              </h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed ml-10">{story.subtitle}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-all flex-shrink-0 mt-1 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Story Content - Expandable */}
      <div
        style={{ height }}
        className="overflow-hidden transition-all duration-300 ease-out"
      >
        <div ref={contentRef} className="px-6 pb-6">
          <STARDetails story={story} />
        </div>
      </div>
    </div>
  );
};

// Experience Card Component
const ExperienceCard: React.FC<{ experience: WorkExperienceType; index: number }> = ({ experience, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <article className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 lg:p-10 backdrop-blur-sm hover:border-slate-600/50 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
        {/* Company Header */}
        <div className="mb-8 pb-6 border-b border-slate-700/50">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-50 mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {experience.company}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-slate-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">{experience.role}</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{experience.location}</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{experience.dates}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-400 italic leading-relaxed">{experience.context}</p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Key Impact</h4>
          <div className="flex flex-wrap gap-3">
            {experience.metrics.map((metric, idx) => (
              <MetricBadge key={idx} metric={metric} />
            ))}
          </div>
        </div>

        {/* Stories */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Featured Stories</h4>
          <div className="space-y-4">
            {experience.stories.map((story, idx) => (
              <StoryAccordion key={idx} story={story} index={idx} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

// Main Work Experience Section
interface WorkExperienceProps {
  onBack?: () => void;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ onBack }) => {
  return (
    <section id="work" className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-black pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Back Button and Badge Row */}
        {onBack && (
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:bg-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Back to Portfolio</span>
            </button>
            <span className="px-6 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-[0.2em]">
              Professional Experience
            </span>
          </div>
        )}

        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Work That Moves Metrics
          </h2>
          <p className="text-center text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            From AI-powered personalization to predictive analytics at scale — each role shaped how I turn data into product decisions that drive measurable impact.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {WORK_EXPERIENCES.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
