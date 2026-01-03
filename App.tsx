import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Linkedin, Calendar, MapPin, ArrowRight, ExternalLink, Download, Plus, Zap, Target, Activity, Award, Brain, Microscope, Compass, Layers, Search, RefreshCw, BarChart3, Workflow, GraduationCap, Globe, Sparkles, Coffee, Phone } from 'lucide-react';
import { PROJECTS, SECONDARY_PROJECTS, CAPABILITIES, STEPS, PRINCIPLES } from './constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Approach', href: '#approach' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'About', href: '#about' },
    { name: 'Connect', href: '#connect' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      setIsOpen(false);
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center group" onClick={(e) => handleLinkClick(e, '#')}>
          <div className="flex flex-col justify-center leading-none">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-[14px] font-serif italic text-text-secondary opacity-80">by</span>
              <span className="text-[14px] font-display font-bold text-accent uppercase tracking-[0.2em] group-hover:text-text-primary transition-colors duration-300">
                Akul S. Malhotra
              </span>
            </div>
          </div>
        </a>
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-medium transition-colors relative group ${activeSection === link.href.substring(1) ? 'text-accent' : 'text-text-secondary hover:text-accent'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
          <a href="#connect" onClick={(e) => handleLinkClick(e, '#connect')} className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-accent/20">
            Let's Talk
          </a>
        </div>
        <button className="md:hidden text-text-primary p-2 z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`md:hidden fixed inset-0 z-40 bg-white transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-12 space-y-8 h-full justify-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-4xl font-display font-bold text-text-primary" onClick={(e) => handleLinkClick(e, link.href)}>{link.name}</a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-20 overflow-hidden relative bg-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-50/50 blur-[100px] -z-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-slate-50/50 blur-[120px] -z-10 rounded-full"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-16 items-center">
          <div className="relative z-10">
            <h1 className="font-display text-5xl md:text-6xl lg:text-[80px] font-black text-text-primary leading-[1.1] tracking-tighter mb-12">
              Hi there! 👋 <br /><br /> I'm Akul – <br />
              <span className="text-text-primary">Turning</span> ideas into <br />
              <span className="text-accent italic text-gradient inline-block pr-6 pb-2">everyday products.</span>
            </h1>

            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl">
              {[
                { icon: <Workflow size={20} />, label: 'Builder', text: 'Shipping intelligent systems that move real behavior.' },
                { icon: <Brain size={20} />, label: 'Bridge', text: 'Translating raw science into consumer features.' },
                { icon: <BarChart3 size={20} />, label: 'Craft', text: 'Prioritizing metrics that reflect human value.' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-text-primary mb-2">{item.label}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/5 to-transparent blur-2xl rounded-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative w-full aspect-[1/1.1] rounded-[60px] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl transition-all duration-700 hover:rotate-1 hover:scale-[1.01]">
              <img 
                src="https://PixHostPullZone.b-cdn.net/84c02f9f-af14-4135-93e9-15c98ca3833f/a4b8r0q5mjwhf78n/1767334659657-rg1gm8x2.png" 
                alt="Akul Malhotra" 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Quick Contact Actions - Positioned BELOW the image */}
            <div className="mt-8 flex items-center justify-center gap-6 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
              <a href="mailto:akul@example.com" className="group/action flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-accent/20 hover:-translate-y-1">
                  <Mail size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary opacity-0 group-hover/action:opacity-100 transition-opacity">Email</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group/action flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[#0077B5]/20 hover:-translate-y-1">
                  <Linkedin size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary opacity-0 group-hover/action:opacity-100 transition-opacity">LinkedIn</span>
              </a>
              <a href="tel:+1234567890" className="group/action flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-green-600/20 hover:-translate-y-1">
                  <Phone size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary opacity-0 group-hover/action:opacity-100 transition-opacity">Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SelectedWork: React.FC = () => {
  const [showSecondary, setShowSecondary] = useState(false);

  return (
    <section id="work" className="py-40 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-32 border-b border-slate-100 pb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-20 bg-accent"></div>
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-lg">Execution Archive</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-display font-black text-text-primary tracking-tighter leading-none max-w-5xl">
            Raw data. <br />Real behavior. <span className="text-accent italic">Real impact.</span>
          </h2>
        </div>

        <div className="space-y-64">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="relative group">
              <span className="absolute -top-20 -left-10 text-[200px] md:text-[300px] font-display font-black text-slate-50 -z-10 select-none opacity-60 group-hover:text-blue-50 transition-colors duration-500">
                0{index + 1}
              </span>

              <div className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-start ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-[60%] relative">
                  <div className="rounded-[40px] overflow-hidden bg-slate-100 shadow-2xl transition-all duration-700 group-hover:shadow-blue-200/50 group-hover:scale-[1.01]">
                    <img 
                      src={`https://picsum.photos/seed/${project.id}/1600/1200`} 
                      alt={project.title} 
                      className="w-full aspect-[4/3] object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-700"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-[40%] pt-8 space-y-8">
                  <div className="flex items-center">
                    <span className="text-accent font-bold uppercase tracking-widest text-[10px] bg-blue-50 px-3 py-1 rounded-full">{project.type}</span>
                  </div>

                  <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tight leading-[1.1] group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="h-6 w-[2px] bg-accent mt-2"></div>
                      <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <a href="#" className="group/btn inline-flex items-center gap-3 text-text-primary font-bold text-lg border-b-2 border-accent pb-1 hover:border-text-primary transition-all">
                      <span>{project.ctaText}</span>
                      <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-80 pt-32 border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h4 className="text-accent font-bold tracking-widest uppercase text-xs mb-4">The Complete Archive</h4>
            <h5 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tighter mb-8">
              Technical Strategy & Research Thinking.
            </h5>
            <button 
              onClick={() => setShowSecondary(!showSecondary)}
              className="px-12 py-5 bg-text-primary text-white rounded-full font-bold text-sm hover:bg-accent transition-all inline-flex items-center gap-3 shadow-lg hover:shadow-accent/20"
            >
              <span>{showSecondary ? 'Collapse Thinking Index' : 'Explore All Archives'}</span>
              <Plus className={`transition-transform duration-500 ${showSecondary ? 'rotate-45' : ''}`} size={16} />
            </button>
          </div>

          {showSecondary && (
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {SECONDARY_PROJECTS.map((project) => (
                <div key={project.id} className="bg-slate-50 p-12 rounded-[40px] hover:bg-white border border-transparent hover:border-accent/10 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between">
                  <div>
                    <div className="mb-10 flex justify-between items-center">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        <Target size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.type}</span>
                    </div>
                    <h6 className="text-3xl font-bold text-text-primary mb-6 group-hover:text-accent transition-colors">{project.title}</h6>
                    <p className="text-text-secondary text-lg leading-relaxed mb-10 font-light">
                      {project.description}
                    </p>
                  </div>
                  <a href="#" className="inline-flex items-center gap-3 text-xs font-bold text-accent uppercase tracking-[0.2em] group/link">
                    <span>{project.ctaText}</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const CapabilitiesSection: React.FC = () => {
  return (
    <section className="pt-32 pb-48 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-accent font-bold tracking-widest uppercase text-xs mb-4">Core Competencies</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tight">How I drive product success.</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {CAPABILITIES.map((cap, idx) => (
            <div key={idx} className="space-y-6 group">
              <div className="h-1 bg-slate-200 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </div>
              <h5 className="text-xl font-bold text-text-primary">{cap.title}</h5>
              <p className="text-text-secondary text-sm leading-relaxed">{cap.description}</p>
              <div className="pt-4 flex items-center gap-2">
                <Award size={14} className="text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-primary opacity-60">{cap.proof}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Approach: React.FC = () => {
  return (
    <section id="approach" className="pt-48 pb-32 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="w-full lg:w-1/3 sticky top-32">
            <h2 className="text-accent font-bold tracking-widest uppercase text-xs mb-4">Philosophy</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tighter leading-none mb-8">The Builder's <br /> Framework.</h3>
            <p className="text-text-secondary text-lg font-light leading-relaxed">
              I follow a systematic approach to shipping intelligence, moving from raw ambiguity to scalable, validated user impact.
            </p>
          </div>
          <div className="w-full lg:w-2/3 space-y-12">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex gap-10 items-start group">
                <span className="text-5xl font-display font-black text-slate-100 group-hover:text-accent transition-colors duration-500">0{idx + 1}</span>
                <div className="pt-2">
                  <h4 className="text-2xl font-bold text-text-primary mb-4">{step.title}</h4>
                  <p className="text-text-secondary leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy: React.FC = () => {
  const icons = [<Activity size={24} />, <Brain size={24} />, <Microscope size={24} />, <Layers size={24} />, <Search size={24} />, <RefreshCw size={24} />];
  
  return (
    <section id="philosophy" className="py-32 bg-slate-900 text-white scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="mb-24">
          <h2 className="text-accent font-bold tracking-widest uppercase text-xs mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-accent"></span> Mental Models
          </h2>
          <h3 className="text-4xl md:text-8xl font-display font-bold tracking-tighter leading-none">Principled <br /> Product Craft.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[150px] -z-10 pointer-events-none"></div>
          
          {PRINCIPLES.map((p, idx) => (
            <div key={idx} className="group relative bg-white/[0.03] border border-white/10 p-10 rounded-[40px] hover:bg-white/[0.08] hover:border-accent/40 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[340px]">
              <span className="absolute -bottom-8 -right-4 text-[140px] font-display font-black text-white/[0.03] group-hover:text-accent/[0.05] transition-colors duration-500 select-none">
                0{idx + 1}
              </span>
              
              <div className="relative z-10">
                <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  {icons[idx % icons.length]}
                </div>
                <h4 className="text-2xl font-display font-bold text-white mb-6 leading-tight group-hover:text-accent transition-colors">
                  {p.title}
                </h4>
                <p className="text-slate-400 text-base leading-relaxed font-light group-hover:text-slate-200 transition-colors">
                  {p.description}
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <div className="h-[2px] w-8 bg-accent/30 group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-48 bg-white scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-20 lg:gap-32 items-center">
          {/* Visual Column */}
          <div className="relative group">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10 aspect-[4/5.5] rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 bg-white">
              <img 
                src="https://PixHostPullZone.b-cdn.net/84c02f9f-af14-4135-93e9-15c98ca3833f/a4b8r0q5mjwhf78n/1767334659657-rg1gm8x2.png" 
                alt="Akul" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.05] group-hover:scale-100" 
              />
              
              <div className="absolute bottom-8 right-8 glass p-5 rounded-2xl shadow-xl border border-white/20 animate-in fade-in zoom-in duration-1000">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-primary">Currently: Scaling AI Products</span>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-0 left-0 w-full h-full border border-accent/10 rounded-[48px] translate-x-4 translate-y-4"></div>
          </div>

          {/* Narrative Column */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[1px] bg-accent"></span>
                <h2 className="text-accent font-bold tracking-[0.3em] uppercase text-xs">The Human Element</h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-display font-bold text-text-primary tracking-tighter leading-none">
                From data science to <br /> product <span className="text-accent italic">leadership.</span>
              </h3>
            </div>

            <div className="space-y-8">
              <p className="text-text-secondary leading-relaxed font-light text-xl md:text-2xl">
                My journey began in the world of high-stakes data science, where I learned that numbers only matter if they move people. Today, I leverage that technical foundation to build AI products that feel human.
              </p>
              <p className="text-text-secondary leading-relaxed font-light text-xl md:text-2xl">
                Having transitioned from a technical contributor to product management, I specialize in translating complex algorithmic capabilities into intuitive daily products. I focus on durable growth by balancing rigorous analytical thinking with a relentless obsession for user empathy.
              </p>
            </div>

            <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <GraduationCap size={16} />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Academic Base</p>
                </div>
                <div className="space-y-1">
                  <p className="text-text-primary font-bold">MS Analytics</p>
                  <p className="text-text-secondary text-sm">Kogod School of Business</p>
                  <div className="inline-block mt-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-text-secondary">PMP Certified</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <Globe size={16} />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Global Base</p>
                </div>
                <div className="space-y-1">
                  <p className="text-text-primary font-bold">Chandigarh, India</p>
                  <p className="text-text-secondary text-sm">Available for global projects</p>
                  <div className="flex gap-3 mt-3">
                    <Coffee size={14} className="text-text-secondary opacity-40" />
                    <Sparkles size={14} className="text-text-secondary opacity-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="connect" className="py-32 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-12 md:p-20 shadow-2xl border border-slate-100 relative overflow-hidden text-center">
          <h2 className="text-accent font-bold tracking-widest uppercase text-xs mb-8">Get in Touch</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tighter mb-12">
            Let's build something <br /> meaningful.
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:akul@example.com" className="flex items-center gap-3 px-8 py-4 bg-text-primary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-xl shadow-slate-200 group">
              <Mail size={20} />
              <span>Email Me</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white text-text-primary border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              <Linkedin size={20} className="text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-text-secondary text-sm">
        <p>© {new Date().getFullYear()} Akul S. Malhotra. Built for conversion.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">Resume</a>
          <a href="https://linkedin.com" className="hover:text-accent transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-text-primary">
      <Header />
      <Hero />
      <SelectedWork />
      <CapabilitiesSection />
      <Approach />
      <Philosophy />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;