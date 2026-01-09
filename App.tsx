
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Linkedin, Calendar, MapPin, ArrowRight, ExternalLink, Download, Plus, Zap, Target, Activity, Award, Brain, Microscope, Compass, Layers, Search, RefreshCw, BarChart3, Workflow, GraduationCap, Globe, Sparkles, Coffee, Phone, Clapperboard, Upload, Loader2, Play, Image as ImageIcon, Wand2, Check } from 'lucide-react';
import { PROJECTS, SECONDARY_PROJECTS, CAPABILITIES, STEPS, PRINCIPLES, CASE_STUDIES } from './constants';
import { GoogleGenAI } from "@google/genai";

const ImageEditorModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  initialImage?: string;
  onImageEdited: (newImageUrl: string) => void;
}> = ({ isOpen, onClose, initialImage, onImageEdited }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [prompt, setPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) setPreview(initialImage);
    setResultImage(null);
    setError(null);
  }, [initialImage, isOpen]);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleEdit = async () => {
    if (!prompt) {
      setError("Please enter an edit prompt.");
      return;
    }

    try {
      setError(null);
      setIsEditing(true);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let base64Image = '';

      if (file) {
        base64Image = await blobToBase64(file);
      } else if (preview && preview.startsWith('http')) {
        const resp = await fetch(preview);
        const blob = await resp.blob();
        base64Image = await blobToBase64(blob);
      } else if (preview && preview.startsWith('data:')) {
        base64Image = preview.split(',')[1];
      }

      if (!base64Image) throw new Error("No image source found.");

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: file?.type || 'image/png',
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const newImage = `data:image/png;base64,${part.inlineData.data}`;
          setResultImage(newImage);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        throw new Error("Failed to generate image.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to edit image.");
    } finally {
      setIsEditing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-[40px] overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-50">
          <X size={24} />
        </button>

        <div className="grid lg:grid-cols-2 h-full min-h-[600px]">
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col">
            <h2 className="text-3xl font-display font-black text-text-primary mb-2 flex items-center gap-3">
              <ImageIcon className="text-accent" /> Nano Banana Editor
            </h2>
            <p className="text-text-secondary text-sm mb-8 italic">
              AI-driven visual refinement using Gemini 2.5 Flash Image.
            </p>

            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Original Visual</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-blue-50 transition-all group overflow-hidden relative"
                >
                  {preview ? (
                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <Upload size={24} className="text-slate-300" />
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setFile(f);
                      const reader = new FileReader();
                      reader.onloadend = () => setPreview(reader.result as string);
                      reader.readAsDataURL(f);
                    }
                  }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Refinement Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. 'Add a retro cinematic filter', 'Remove the background person'..."
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none min-h-[120px] transition-all"
                />
              </div>

              <button
                onClick={handleEdit}
                disabled={isEditing || !prompt}
                className="w-full py-5 bg-text-primary text-white rounded-[24px] font-bold text-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-3"
              >
                {isEditing ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Processing visual...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    <span>Apply Refinement</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-8 lg:p-12 bg-slate-900 flex flex-col justify-center items-center text-center text-white overflow-hidden">
            {resultImage ? (
              <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] border border-white/10">
                  <img src={resultImage} className="w-full h-full object-contain" alt="Result" />
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      onImageEdited(resultImage);
                      onClose();
                    }}
                    className="flex-1 py-4 bg-accent text-white rounded-2xl font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={18} /> Apply to Portfolio
                  </button>
                  <button 
                    onClick={() => setResultImage(null)}
                    className="flex-1 py-4 bg-white/10 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all"
                  >
                    Discard
                  </button>
                </div>
              </div>
            ) : isEditing ? (
              <div className="space-y-8 max-w-xs">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white/10 border-t-accent animate-spin mx-auto"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent animate-pulse" size={32} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">Reimagining visual...</h4>
                  <p className="text-slate-400 text-sm leading-relaxed italic">"Flash model logic at work."</p>
                </div>
              </div>
            ) : error ? (
              <div className="space-y-6 text-red-400">
                <div className="w-16 h-16 rounded-full bg-red-400/10 flex items-center justify-center mx-auto text-red-400">
                  <X size={32} />
                </div>
                <p className="font-bold">{error}</p>
                <button onClick={() => setError(null)} className="px-6 py-2 bg-white/10 rounded-full text-xs font-bold hover:bg-white/20 transition-all uppercase tracking-widest">Retry</button>
              </div>
            ) : (
              <div className="space-y-6 opacity-30">
                <div className="w-24 h-24 rounded-[32px] border-4 border-dashed border-white/20 flex items-center justify-center mx-auto">
                  <ImageIcon size={40} className="text-white" />
                </div>
                <p className="font-medium text-slate-400">Refined output will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VeoModal: React.FC<{ isOpen: boolean; onClose: () => void; initialImage?: string }> = ({ isOpen, onClose, initialImage }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) setPreview(initialImage);
  }, [initialImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setVideoUrl(null);
      setError(null);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const generateVideo = async () => {
    try {
      setError(null);
      setIsGenerating(true);
      setProgress(0);

      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let base64Image = '';

      if (file) {
        base64Image = await blobToBase64(file);
      } else if (preview && preview.startsWith('http')) {
        const resp = await fetch(preview);
        const blob = await resp.blob();
        base64Image = await blobToBase64(blob);
      } else if (preview && preview.startsWith('data:')) {
        base64Image = preview.split(',')[1];
      }

      if (!base64Image) {
        throw new Error("Please upload an image first.");
      }

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Animate this project visual with smooth cinematic transitions and subtle motion.',
        image: {
          imageBytes: base64Image,
          mimeType: file?.type || 'image/jpeg',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        setProgress(prev => Math.min(prev + 10, 95));
        try {
          operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch (e: any) {
          if (e.message?.includes("Requested entity was not found")) {
            await window.aistudio.openSelectKey();
            throw new Error("API Session lost. Please select your key and try again.");
          }
          throw e;
        }
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const videoBlob = await videoResponse.blob();
        setVideoUrl(URL.createObjectURL(videoBlob));
        setProgress(100);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10">
          <X size={24} />
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
            <h2 className="text-3xl font-display font-black text-text-primary mb-2 flex items-center gap-3">
              <Clapperboard className="text-accent" /> Veo Animator
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              Transform static project visuals into dynamic AI-generated cinema.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Target Visual</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-blue-50 transition-all group overflow-hidden relative"
                >
                  {preview ? (
                    <>
                      <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                        <Upload size={24} />
                      </div>
                      <span className="text-sm font-medium text-slate-500">Click to upload or drag image</span>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Aspect Ratio</label>
                <div className="flex gap-4">
                  {(['16:9', '9:16'] as const).map(ratio => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`flex-1 py-3 rounded-2xl text-xs font-bold border transition-all ${aspectRatio === ratio ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' : 'bg-white text-text-secondary border-slate-200 hover:border-accent'}`}
                    >
                      {ratio} {ratio === '16:9' ? '(Landscape)' : '(Portrait)'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateVideo}
                disabled={isGenerating || (!preview && !file)}
                className="w-full py-5 bg-text-primary text-white rounded-[24px] font-bold text-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Dreaming in progress ({progress}%)</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    <span>Generate Veo Animation</span>
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-center text-slate-400">
                This process takes ~1-2 minutes. Ensure you have a <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-accent">paid API key</a> selected.
              </p>
            </div>
          </div>

          <div className="p-8 lg:p-12 bg-slate-50 flex flex-col justify-center items-center text-center">
            {videoUrl ? (
              <div className="w-full space-y-6">
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
                  <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
                </div>
                <div className="flex gap-4">
                  <a href={videoUrl} download="cerebro-animation.mp4" className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    <Download size={18} /> Download MP4
                  </a>
                  <button onClick={() => setVideoUrl(null)} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
                    Reset
                  </button>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="space-y-8 max-w-xs">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-200 border-t-accent animate-spin mx-auto"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent animate-pulse" size={32} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-text-primary">Bringing pixels to life</h4>
                  <p className="text-slate-500 text-sm leading-relaxed italic">"The best way to predict the future is to animate it."</p>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="space-y-6 text-red-500">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-500">
                  <X size={32} />
                </div>
                <p className="font-bold">{error}</p>
                <button onClick={() => setError(null)} className="px-6 py-2 bg-white border border-red-100 rounded-full text-xs font-bold hover:bg-red-50 transition-all uppercase tracking-widest">Dismiss</button>
              </div>
            ) : (
              <div className="space-y-6 opacity-40">
                <div className="w-24 h-24 rounded-[32px] border-4 border-dashed border-slate-300 flex items-center justify-center mx-auto">
                  <Play size={40} className="text-slate-300 ml-1" />
                </div>
                <p className="font-medium text-slate-400">Result will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{ onWorkClick?: () => void }> = ({ onWorkClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#work' },
    { name: 'Philosophy', href: '#approach' },
    { name: 'Work', href: 'work-page' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['about', 'work', 'approach', 'connect'];
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
    if (href === 'work-page') {
      setIsOpen(false);
      if (onWorkClick) onWorkClick();
      return;
    }
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
              href={link.href === 'work-page' ? '#' : link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-medium transition-colors relative group ${activeSection === link.href.substring(1) ? 'text-accent' : 'text-text-secondary hover:text-accent'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
          <a href="#connect" onClick={(e) => handleLinkClick(e, '#connect')} className="bg-accent text-white px-8 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-accent/20">
            Connect
          </a>
        </div>
        <button className="md:hidden text-text-primary p-2 z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`md:hidden fixed inset-0 z-40 bg-white transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-12 space-y-8 h-full justify-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href === 'work-page' ? '#' : link.href} className="text-4xl font-display font-bold text-text-primary" onClick={(e) => handleLinkClick(e, link.href)}>{link.name}</a>
          ))}
          <a href="#connect" className="text-4xl font-display font-bold text-accent" onClick={(e) => handleLinkClick(e, '#connect')}>Connect</a>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 overflow-hidden relative bg-white">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/50 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-blue-50/30 blur-[100px] -z-10 rounded-full"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-1 md:order-1">
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-text-primary leading-[1.1] mb-6 tracking-tight">
            I build AI-powered products that <span className="text-accent italic">people actually use.</span>
          </h1>

          <p className="text-xl text-text-secondary mb-10 max-w-xl leading-relaxed">
            Analytics professional turned product manager. 4+ years shipping features across media, fitness, and consumer technology - driving measurable growth through intelligent personalization and data-driven product decisions.
          </p>

        </div>

        <div className="order-2 md:order-2 relative z-20 flex flex-col items-center">
            <div className="relative group perspective-1000 w-full">
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent/5 to-transparent blur-2xl rounded-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full aspect-[1/1.1] rounded-[60px] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl transition-all duration-700 hover:rotate-1 hover:scale-[1.01]">
                <img 
                  src="https://PixHostPullZone.b-cdn.net/84c02f9f-af14-4135-93e9-15c98ca3833f/a4b8r0q5mjwhf78n/1767334659657-rg1gm8x2.png" 
                  alt="Akul Malhotra" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 relative z-30">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="group/action flex flex-col items-center gap-2 cursor-pointer no-underline outline-none">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-accent/30 hover:-translate-y-2 active:scale-95">
                  <Mail size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover/action:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/action:translate-y-0">Email</span>
              </a>
              
              <a href="https://www.linkedin.com/in/malhotraakulsuhail/" target="_blank" rel="noopener noreferrer" className="group/action flex flex-col items-center gap-2 cursor-pointer no-underline outline-none">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[#0077B5]/30 hover:-translate-y-2 active:scale-95">
                  <Linkedin size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0077B5] opacity-0 group-hover/action:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/action:translate-y-0">LinkedIn</span>
              </a>

              <a href="tel:+918847336864" className="group/action flex flex-col items-center gap-2 cursor-pointer no-underline outline-none">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-green-600/30 hover:-translate-y-2 active:scale-95">
                  <Phone size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 opacity-0 group-hover/action:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/action:translate-y-0">Call</span>
              </a>
            </div>
          </div>
      </div>
    </section>
  );
};

const SelectedWork: React.FC<{
  onAnimate: (img: string) => void;
  onEdit: (img: string, projectId: string) => void;
  editedImages: Record<string, string>;
  onCaseStudyClick: (projectId: string) => void;
}> = ({ onAnimate, onEdit, editedImages, onCaseStudyClick }) => {
  const [showSecondary, setShowSecondary] = useState(false);

  return (
    <section id="work" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Case Studies</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary">Selected Work</h3>
          </div>
          <p className="text-text-secondary max-w-md">
            Outcome-focused projects demonstrating technical AI research and growth-oriented product strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {PROJECTS.map((project) => (
            <div key={project.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col hover-lift group shadow-sm">
              <div className="h-72 overflow-hidden relative">
                <img
                  src={editedImages[project.id] || project.imageUrl || `https://picsum.photos/seed/${project.id}/800/600`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60"></div>
                {project.isFeatured && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-lg">Featured</div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-accent font-bold text-xs uppercase mb-2 tracking-widest">{project.type}</span>
                <h4 className="text-2xl font-bold text-text-primary mb-3 leading-tight group-hover:text-accent transition-colors">{project.title}</h4>
                <p className="text-lg font-medium text-text-secondary/80 mb-4 line-clamp-1 italic">"{project.headline}"</p>
                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow">{project.description}</p>
                <div className="mt-auto">
                  {(project.id === 'cerebro-ai' || project.id === 'leaklock' || project.id === 'hinge-roadmap' || project.id === 'nike-app') ? (
                    <button
                      onClick={() => onCaseStudyClick(project.id)}
                      className="inline-flex items-center space-x-2 text-text-primary font-bold border-b-2 border-accent pb-1 hover:border-accent/40 transition-all cursor-pointer"
                    >
                      <span>{project.ctaText}</span>
                      <ExternalLink size={14} />
                    </button>
                  ) : (
                    <a href="#" className="inline-flex items-center space-x-2 text-text-primary font-bold border-b-2 border-accent pb-1 hover:border-accent/40 transition-all">
                      <span>{project.ctaText}</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-slate-100">
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
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 duration-700">
              {SECONDARY_PROJECTS.map((project) => (
                <div key={project.id} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-accent/20 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{project.type}</span>
                    <h6 className="text-xl font-bold text-text-primary mt-3 mb-4 group-hover:text-accent transition-colors">{project.title}</h6>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onCaseStudyClick(project.id)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-text-primary hover:text-accent transition-colors group/link cursor-pointer"
                  >
                    <span>{project.ctaText}</span>
                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
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
    <section id="capabilities" className="pt-32 pb-48 bg-slate-50 scroll-mt-20">
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
    <section id="approach" className="pt-24 lg:pt-48 pb-32 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 mb-8 lg:mb-0">
            <h2 className="text-accent font-bold tracking-widest uppercase text-xs mb-4">Philosophy</h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary tracking-tighter leading-none mb-6 lg:mb-8">The Builder's <br /> Framework.</h3>
            <p className="text-text-secondary text-base md:text-lg font-light leading-relaxed">
              I follow a systematic approach to shipping intelligence, moving from raw ambiguity to scalable, validated user impact.
            </p>
          </div>
          <div className="w-full lg:w-2/3 space-y-12 md:space-y-20">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start group relative">
                <span className="text-6xl md:text-8xl font-display font-black text-slate-100 group-hover:text-accent transition-colors duration-500 leading-none">0{idx + 1}</span>
                <div className="pt-1 md:pt-2">
                  <h4 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 md:mb-4">{step.title}</h4>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
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
          <div className="relative group">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 aspect-[4/5.5] rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 bg-white">
              <img 
                src="https://PixHostPullZone.b-cdn.net/84c02f9f-af14-4135-93e9-15c98ca3833f/a4b8r0q5mjwhf78n/1767334659657-rg1gm8x2.png" 
                alt="Akul" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.05] group-hover:scale-100" 
              />
              <div className="absolute bottom-8 right-8 glass p-5 rounded-2xl shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-primary">Currently: Scaling AI Products</span>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-0 left-0 w-full h-full border border-accent/10 rounded-[48px] translate-x-4 translate-y-4"></div>
          </div>
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[1px] bg-accent"></span>
                <h2 className="text-accent font-bold tracking-[0.3em] uppercase text-xs">The Human Element</h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-display font-bold text-text-primary tracking-tighter leading-none">From data science to <br /> product <span className="text-accent italic">leadership.</span></h3>
            </div>
            <div className="space-y-8">
              <p className="text-text-secondary leading-relaxed font-light text-xl md:text-2xl">My journey began in the world of high-stakes data science, where I learned that numbers only matter if they move people. Today, I leverage that technical foundation to build AI products that feel human.</p>
              <p className="text-text-secondary leading-relaxed font-light text-xl md:text-2xl">Having transitioned from a technical contributor to product management, I specialize in translating complex algorithmic capabilities into intuitive daily products.</p>
            </div>
            <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent"><GraduationCap size={16} /><p className="text-[10px] font-bold uppercase tracking-widest">Academic Base</p></div>
                <div className="space-y-1"><p className="text-text-primary font-bold">MS Analytics</p><p className="text-text-secondary text-sm">Kogod School of Business</p><div className="inline-block mt-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-text-secondary">PMP Certified</div></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent"><Globe size={16} /><p className="text-[10px] font-bold uppercase tracking-widest">Global Base</p></div>
                <div className="space-y-1"><p className="text-text-primary font-bold">Chandigarh, India</p><p className="text-text-secondary text-sm">Available for global projects</p></div>
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
          <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tighter mb-12">Let's build something <br /> meaningful.</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-text-primary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-xl shadow-slate-200 group"><Mail size={20} /><span>Email Me</span></a>
            <a href="https://www.linkedin.com/in/malhotraakulsuhail/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white text-text-primary border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"><Linkedin size={20} className="text-[#0077B5]" /><span>LinkedIn</span></a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 text-center text-text-secondary text-sm">
        <p>© {new Date().getFullYear()} Akul S. Malhotra. Carefully engineered, usually caffeinated.</p>
      </div>
    </footer>
  );
};

const CerebroCaseStudyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-4">
              Cerebro AI
            </h1>
            <p className="text-2xl md:text-3xl text-text-secondary mb-6">Personal Knowledge Operating System</p>
            <div className="flex flex-wrap justify-center gap-3 mt-8 mb-8">
              {['RAG', 'Semantic Search', 'Vector Embeddings', 'OCR', 'pgvector', 'OpenAI', 'Gemini'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-bold">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="https://cerebro-knowledge-core.lovable.app/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-xl hover:shadow-accent/30"
              >
                <ExternalLink size={20} />
                <span>Try Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Pain Point</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p className="font-semibold text-text-primary">I kept losing things I'd already read.</p>
              <p>A PDF from a course I took. A screenshot of something useful. Notes I made three months ago. I knew I had the information somewhere - but I couldn't find it. I'd try different keywords, open five apps, scroll through folders, and still come up empty.</p>
              <p>The worst part? This happened constantly. Not because I wasn't organized, but because search only works if you remember the exact words you used. And I never did.</p>
              <p className="font-semibold text-text-primary">That's when I realized: the problem isn't storing information. It's getting it back.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Approach</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>I started by asking a simple question: <span className="font-semibold text-text-primary">Why does search fail me?</span></p>
              <p>The answer was clear - traditional search matches keywords, not meaning. If I saved a note about "improving retention" but searched for "keeping users engaged," I'd get nothing. Even though they mean the same thing.</p>
              <p>So I needed a system that understands concepts, not just words.</p>
              <p>That led me to <span className="font-semibold text-text-primary">RAG (Retrieval-Augmented Generation)</span> - an architecture that converts documents into semantic embeddings, searches by meaning, and generates answers grounded strictly in my own files. No hallucinations. No guessing.</p>
              <p>I scoped v1 tightly: ingest any document (PDFs, images, screenshots), chunk it intelligently, embed it, and let me ask questions in plain English. The system would do the remembering. I wouldn't have to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Solution</h2>

            <h3 className="text-2xl font-bold text-text-primary mb-6">Architecture: 4-stage RAG pipeline</h3>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-6 py-4 text-left font-bold text-text-primary">Stage</th>
                    <th className="px-6 py-4 text-left font-bold text-text-primary">What it does</th>
                    <th className="px-6 py-4 text-left font-bold text-text-primary">Tech</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-text-primary">Ingestion</td>
                    <td className="px-6 py-4 text-text-secondary">Parses PDFs, DOCX, images via OCR; extracts text and metadata</td>
                    <td className="px-6 py-4 text-text-secondary">Supabase Edge Functions (Deno)</td>
                  </tr>
                  <tr className="border-t border-slate-100 bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-text-primary">Chunking</td>
                    <td className="px-6 py-4 text-text-secondary">Splits into semantic segments (150 words, 30-word overlap)</td>
                    <td className="px-6 py-4 text-text-secondary">Custom chunking logic</td>
                  </tr>
                  <tr className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-text-primary">Embedding</td>
                    <td className="px-6 py-4 text-text-secondary">Converts chunks to 1536-dimension vectors</td>
                    <td className="px-6 py-4 text-text-secondary">text-embedding-3-small (OpenAI)</td>
                  </tr>
                  <tr className="border-t border-slate-100 bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-text-primary">Retrieval</td>
                    <td className="px-6 py-4 text-text-secondary">Cosine similarity search → LLM generates cited answer</td>
                    <td className="px-6 py-4 text-text-secondary">pgvector + Gemini 2.5 Flash</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-text-primary mb-6">Stack:</h3>
            <ul className="space-y-3 text-lg text-text-secondary leading-relaxed list-none">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Frontend:</strong> React, TypeScript, Tailwind, shadcn/ui</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Backend:</strong> Supabase (Auth, Postgres, Edge Functions)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Vector DB:</strong> pgvector with HNSW indexing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Embeddings:</strong> OpenAI text-embedding-3-small</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">LLM:</strong> Google Gemini 2.5 Flash (via Lovable AI Gateway)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Impact</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">Answer relevance</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: ≥85%</div>
                <p className="text-sm text-text-secondary">8 out of 10 answers directly address what the user asked</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">Citation accuracy</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: 100%</div>
                <p className="text-sm text-text-secondary">Every answer points back to the exact source - no made-up information</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">Ingestion time</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: &lt;15 seconds</div>
                <p className="text-sm text-text-secondary">Upload a document, and it's searchable almost immediately</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">Query-to-answer</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: &lt;3 seconds</div>
                <p className="text-sm text-text-secondary">Ask a question, get an answer before you lose your train of thought</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-text-primary mb-6">Key design decisions:</h3>
            <ul className="space-y-3 text-lg text-text-secondary leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Every answer shows its source (builds trust)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>No manual tagging or folder management required</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>AI-powered folder classification on upload</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Handles "unsearchable" formats like screenshots and scanned PDFs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What I Learned */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What I Learned</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Chunking quality determines retrieval quality.</h3>
                <p className="text-slate-300 leading-relaxed">Chunking is how you break a long document into smaller pieces before the system can search through it. If you cut in the wrong places - say, mid-sentence or mid-idea - the system retrieves fragments that don't make sense. I landed on 150-word chunks with 30-word overlap, meaning each chunk shares a little context with the next. This helped the system return complete, relevant answers instead of confusing snippets.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Transparency builds trust.</h3>
                <p className="text-slate-300 leading-relaxed">It's not enough to give users an answer. They need to see where that answer came from. Showing the source document and the exact passage made the system feel reliable - not like a black box making things up.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Zero-maintenance is a feature.</h3>
                <p className="text-slate-300 leading-relaxed">If a system requires users to tag, organize, or manually manage their files, most people will abandon it. The whole point was to remove that burden. The system should do the remembering - not the user.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Interested in working together?</h2>
            <p className="text-text-secondary mb-8">Let's discuss how I can help with your product challenges.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://cerebro-knowledge-core.lovable.app/auth" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2">
                <ExternalLink size={20} />
                <span>Try Live Demo</span>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all flex items-center gap-2">
                <Mail size={20} />
                <span>Get in Touch</span>
              </a>
              <button onClick={onBack} className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all">
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const LeakLockCaseStudyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-4">
              LeakLock
            </h1>
            <p className="text-2xl md:text-3xl text-text-secondary mb-6">Invisible Money Tracker</p>
            <div className="flex flex-wrap justify-center gap-3 mt-6 mb-6">
              {['SMS Parsing', 'UPI Mandates', 'Local Processing', 'Privacy-First', 'Android'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-bold">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="https://leaklock-gold-guard.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-xl hover:shadow-accent/30"
              >
                <ExternalLink size={20} />
                <span>Try Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Pain Point</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p className="font-semibold text-text-primary">I kept paying for things I wasn't using.</p>
              <p>A free trial I forgot to cancel. A duplicate charge I didn't notice. An app I subscribed to once and never opened again. Every month, small amounts quietly left my account - ₹99 here, ₹199 there. Individually tiny. Collectively, a leak.</p>
              <p>The worst part? I only discovered these when I actually sat down and scrolled through months of bank statements. By then, I'd already lost money I could have saved.</p>
              <p>In India, this problem is everywhere. UPI mandates made payments frictionless - but also invisible. You tap once, and suddenly you're auto-charged every month without a reminder. Research shows 71% of users report hidden charges, and companies see up to 200% revenue uplift simply because people forget to cancel.</p>
              <p className="font-semibold text-text-primary">That's when I realized: the problem isn't spending money. It's not seeing where it quietly leaks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Approach</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>I started by asking: <span className="font-semibold text-text-primary">Why do people keep paying for things they don't use?</span></p>
              <p>Three reasons stood out:</p>
              <ol className="space-y-4 ml-6 list-decimal list-outside">
                <li><span className="font-semibold text-text-primary">Forgetting</span> - Free trials convert silently. Subscriptions renew without reminders.</li>
                <li><span className="font-semibold text-text-primary">Friction</span> - Cancelling is intentionally hard. Companies use "roach motel" dark patterns - easy to enter, hard to leave.</li>
                <li><span className="font-semibold text-text-primary">Invisibility</span> - Recurring charges hide in transaction history. No single dashboard shows what's draining your wallet.</li>
              </ol>
              <p>Existing apps required manual entry - which meant users had to remember the very thing they were forgetting. That's broken by design.</p>
              <p>So I built LeakLock with <span className="font-semibold text-text-primary">automation at the core</span>: scan SMS messages locally, detect subscriptions automatically, and surface them before the next charge hits. No manual entry. No cloud uploads. Just visibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Solution</h2>

            <h3 className="text-2xl font-bold text-text-primary mb-6">Architecture: Privacy-first, automation-led tracking</h3>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-6 py-4 text-left font-bold text-text-primary">Stage</th>
                    <th className="px-6 py-4 text-left font-bold text-text-primary">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-text-primary">Onboarding</td>
                    <td className="px-6 py-4 text-text-secondary">OTP login → Request SMS permission → Auto-scan inbox</td>
                  </tr>
                  <tr className="border-t border-slate-100 bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-text-primary">Detection</td>
                    <td className="px-6 py-4 text-text-secondary">Parse SMS locally for subscription patterns (UPI mandates, renewals, trials)</td>
                  </tr>
                  <tr className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-text-primary">Dashboard</td>
                    <td className="px-6 py-4 text-text-secondary">Show active plans, renewal dates, monthly/lifetime savings</td>
                  </tr>
                  <tr className="border-t border-slate-100 bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-text-primary">Action</td>
                    <td className="px-6 py-4 text-text-secondary">Pause, cancel, or set custom reminders - all from one place</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-text-primary mb-6">Key Features:</h3>
            <ul className="space-y-3 text-lg text-text-secondary leading-relaxed list-none mb-8">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Auto-detection</strong> - No manual entry; subscriptions found via SMS parsing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Smart reminders</strong> - Alerts before renewal, not after</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Pause/Cancel flow</strong> - One-tap actions with cancellation reason capture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Duplicate prevention</strong> - Validates by name + date to avoid duplicates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Local processing</strong> - All SMS parsed on-device; nothing uploaded to cloud</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-text-primary mb-6">Stack:</h3>
            <ul className="space-y-3 text-lg text-text-secondary leading-relaxed list-none">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Platform:</strong> Android (MVP)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Processing:</strong> On-device SMS parsing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong className="text-text-primary">Security:</strong> No cloud storage of messages; local-only architecture</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Impact</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">First Sync Success Rate</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: ≥1 subscription on first login</div>
                <p className="text-sm text-text-secondary">Users see value immediately - no setup needed</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">Day-7 Retention</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: Benchmark target</div>
                <p className="text-sm text-text-secondary">Users return after first reminder cycle - proof alerts matter</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">Day-30 Retention</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: ≥25%</div>
                <p className="text-sm text-text-secondary">Users stick around because they're saving money</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">Avg. Savings per User</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: ₹100 - ₹500/month</div>
                <p className="text-sm text-text-secondary">Real money recovered from paused or cancelled subscriptions</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-2">NPS</div>
                <div className="text-sm font-bold text-text-primary mb-2">Target: ≥45</div>
                <p className="text-sm text-text-secondary">Users feel in control and trust the app</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-text-primary mb-6 mt-12">What It Means:</h3>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>These metrics aren't just numbers - they represent real behavior change. First-sync success proves the automation works. Day-7 and Day-30 retention show users are getting value, not just downloading and forgetting. The savings metric? That's money back in users' pockets.</p>
              <p>Most importantly, the NPS target reflects trust. When you're asking for SMS permissions, users need to believe you're on their side. Privacy-first architecture isn't just good practice - it's the foundation of the product's credibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What I Learned */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What I Learned</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Automation removes the core friction.</h3>
                <p className="text-slate-300 leading-relaxed">The entire problem is that people forget. Asking them to manually enter subscriptions defeats the purpose. SMS parsing - done locally and privately - solved this elegantly.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Privacy is a feature, not a tradeoff.</h3>
                <p className="text-slate-300 leading-relaxed">Indian users are increasingly wary of apps accessing their data. By processing everything on-device and never uploading messages, LeakLock turned a potential trust barrier into a selling point.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Timing matters more than information.</h3>
                <p className="text-slate-300 leading-relaxed">Showing users a list of subscriptions is useful. Alerting them three days before a renewal - when they can still act - is what actually saves money.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Dark patterns are the real enemy.</h3>
                <p className="text-slate-300 leading-relaxed">Companies make cancellation intentionally hard. LeakLock's value isn't just visibility - it's giving users a fighting chance against systems designed to make them forget.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Interested in working together?</h2>
            <p className="text-text-secondary mb-8">Let's discuss how I can help with your product challenges.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://leaklock-gold-guard.lovable.app" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2">
                <ExternalLink size={20} />
                <span>Try Live Demo</span>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all flex items-center gap-2">
                <Mail size={20} />
                <span>Get in Touch</span>
              </a>
              <button onClick={onBack} className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all">
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const HingeCaseStudyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tight mb-6">
              Hinge <span className="text-accent">Case Study</span>
            </h1>
            <div className="mb-6">
              <a
                href="https://hinge-product-improvemen-ww2owdm.gamma.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30"
              >
                <ExternalLink size={20} />
                <span>View Full Presentation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Hinge Product Improvement</h2>
              <p className="text-xl text-accent font-semibold mb-2">Reducing Ghosting & Improving Engagement</p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">User Research</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">RICE Prioritization</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">KANO Analysis</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Wireframing</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">GTM Strategy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Pain Point</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                Hinge's mission is to be <span className="font-semibold text-accent">"designed to be deleted"</span> - help users find real relationships and leave the app. But something was breaking that promise.
              </p>
              <p className="text-2xl font-bold text-text-primary">Ghosting.</p>
              <p>
                Over <span className="font-semibold text-text-primary">75% of singles</span> report being ghosted on dating apps. Conversations start, then suddenly stop. No closure, no explanation. It leads to anxiety, eroded trust, and eventually - users giving up on the app entirely. Research shows <span className="font-semibold text-text-primary">78% of Gen Z</span> reports dating app fatigue, largely driven by ghosting and superficial interactions.
              </p>
              <p>
                For Hinge, this is a business problem too. If users don't trust that conversations will go anywhere, they stop engaging. And disengaged users don't convert to paying subscribers.
              </p>
              <p>
                The secondary issue? <span className="font-semibold text-text-primary">Paywall confusion.</span> 40% of free users reported frustration with unclear pricing and hidden feature gates - leading to drop-offs and negative reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Approach</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-8">
              <p>
                I started with research - <span className="font-semibold text-text-primary">10 survey respondents, 5 user interviews</span>, and secondary research from Reddit, Quora, and app store reviews.
              </p>
              <p className="font-semibold text-text-primary">Key findings:</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="text-3xl font-bold text-accent mb-2">70%</div>
                <p className="text-sm text-text-secondary">of users want meaningful relationships, not casual dating</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="text-3xl font-bold text-accent mb-2">65%</div>
                <p className="text-sm text-text-secondary">prioritize safety features</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="text-3xl font-bold text-accent mb-2">40%</div>
                <p className="text-sm text-text-secondary">are frustrated by confusing paywalls</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="text-3xl font-bold text-accent mb-2">25%</div>
                <p className="text-sm text-text-secondary">drop off during onboarding</p>
              </div>
            </div>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                I mapped user personas and journeys to understand where friction hits hardest. Three personas emerged: the <span className="font-semibold text-text-primary">Relationship Seeker</span> (wants authentic matches, fears ghosting), the <span className="font-semibold text-text-primary">Casual Socializer</span> (wants low-pressure connections), and the <span className="font-semibold text-text-primary">Busy Professional</span> (needs efficiency, hates time-wasters).
              </p>
              <p>
                Using <span className="font-semibold text-text-primary">RICE scoring and KANO analysis</span>, I prioritized problems by reach, impact, confidence, and effort. Ghosting prevention and paywall transparency scored highest - both classified as "Must-be" features that address fundamental user expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Solution</h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              Two high-impact features proposed:
            </p>

            {/* Solution Table */}
            <div className="space-y-6 mb-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-accent mb-3">Ghosting Prevention Nudges</h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  Automated, well-timed reminders that prompt users to respond to stalled conversations
                </p>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-text-primary">Why it works:</p>
                  <p className="text-sm text-text-secondary">Reduces accidental ghosting, revives conversations, keeps engagement high</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-accent mb-3">Transparent Paywall Communications</h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  Clear, upfront information about paid features with free trial access to experience premium before committing
                </p>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-text-primary">Why it works:</p>
                  <p className="text-sm text-text-secondary">Builds trust, reduces drop-offs, increases premium conversions</p>
                </div>
              </div>
            </div>

            {/* Ghosting Nudges Details */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">Ghosting Nudges - How it works:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-text-secondary leading-relaxed">Detects stalled conversations (no reply in X days)</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-text-secondary leading-relaxed">Sends gentle in-app prompts: "Don't leave them hanging - send a quick reply!"</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-text-secondary leading-relaxed">Users can customize frequency or disable nudges</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-text-secondary leading-relaxed">Non-intrusive design that blends with existing chat UI</p>
                </li>
              </ul>
            </div>

            {/* Paywall Transparency Details */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-text-primary mb-4">Paywall Transparency - How it works:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-text-secondary leading-relaxed">Clear trial banners explaining what's included in premium</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-text-secondary leading-relaxed">Free trial access so users can experience benefits before paying</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-text-secondary leading-relaxed">Premium info pages showing exact features and value upfront</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-text-secondary leading-relaxed">No surprise gates - users know what's free vs. paid from the start</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Impact</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Reply Rate</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Increase Expected</div>
                </div>
                <p className="text-sm text-text-secondary">More conversations stay active instead of dying out</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Retention Rate</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Improve</div>
                </div>
                <p className="text-sm text-text-secondary">Users stay engaged longer because conversations feel worthwhile</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Trial Starts</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Increase</div>
                </div>
                <p className="text-sm text-text-secondary">Clear value + free trial drives more users to experience premium</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Subscription Conversion</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Improve</div>
                </div>
                <p className="text-sm text-text-secondary">Users who try premium firsthand are more likely to pay</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Support Tickets</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Decrease</div>
                </div>
                <p className="text-sm text-text-secondary">Fewer complaints about payment confusion</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">App Store Ratings</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Improve</div>
                </div>
                <p className="text-sm text-text-secondary">Better user experience leads to positive reviews</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <p className="text-sm font-semibold text-text-primary mb-2">Strategic alignment:</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Both solutions directly support Hinge's "Designed to Be Deleted" mission - they help users have better conversations, build trust faster, and ultimately find relationships worth leaving the app for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I Learned */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What I Learned</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Ghosting isn't just rudeness - it's often accidental.</h3>
                <p className="text-slate-300 leading-relaxed">
                  Life gets busy. People forget to reply. A well-timed nudge can revive a conversation that would have otherwise died - without feeling pushy.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Frustration with paywalls isn't about price - it's about uncertainty.</h3>
                <p className="text-slate-300 leading-relaxed">
                  Users don't mind paying for value. They mind committing without knowing what they'll get. Offering a free trial lets them experience the benefits firsthand - and that confidence converts to subscriptions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Prioritization frameworks matter.</h3>
                <p className="text-slate-300 leading-relaxed">
                  RICE and KANO helped me focus on the two solutions with the highest impact and lowest risk - rather than chasing shiny experimental features.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">User research reveals patterns you'd never guess.</h3>
                <p className="text-slate-300 leading-relaxed">
                  I assumed safety would be the top concern. It was important - but ghosting and paywall confusion were causing more immediate churn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Interested in working together?</h2>
            <p className="text-text-secondary mb-8">Let's discuss how I can help with your product challenges.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://hinge-product-improvemen-ww2owdm.gamma.site"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2"
              >
                <ExternalLink size={20} />
                <span>View Full Presentation</span>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all flex items-center gap-2">
                <Mail size={20} />
                <span>Get in Touch</span>
              </a>
              <button onClick={onBack} className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all">
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const NikeCaseStudyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tight mb-6">
              Nike Mobile App <span className="text-accent">Case Study</span>
            </h1>
            <div className="mb-6">
              <a
                href="https://docs.google.com/document/d/11uEhNXe_2Gsz_WBqaG-mwMipEthXKyH-838imnIESNw/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30"
              >
                <ExternalLink size={20} />
                <span>View Full Analysis</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Nike Mobile App</h2>
              <p className="text-xl text-accent font-semibold mb-2">Product Deconstruction & Improvement</p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">User Segmentation</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Competitive Analysis</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Feature Breakdown</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Retention Strategy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Pain Point</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                Nike's app isn't just a store - it's a <span className="font-semibold text-accent">lifestyle ecosystem</span>. Members get exclusive drops, personalized recommendations, community events, and access to Nike's most innovative products.
              </p>
              <p className="text-2xl font-bold text-text-primary">But there's a gap.</p>
              <p>
                Longtime members with low purchase frequency are quietly disengaging.
              </p>
              <p>
                These users signed up, maybe bought something once, and then... nothing. They don't receive relevant updates. They don't see compelling reasons to return. The rewards feel stale. And slowly, they drift away.
              </p>
              <p>
                For Nike, this is a <span className="font-semibold text-text-primary">retention problem hiding in plain sight</span>. Casual users aren't being converted into active customers. The app feels less engaging for them over time - leading to churn and stagnant monthly active users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Approach</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-8">
              <p>
                I started by <span className="font-semibold text-text-primary">segmenting Nike's user base</span> to understand who uses the app and why:
              </p>
            </div>

            {/* User Segmentation Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-accent mb-3">Casual Users</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Platform explorers</li>
                  <li>• First-time visitors</li>
                  <li>• Event-driven shoppers</li>
                  <li>• Price-sensitive buyers</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-accent mb-3">Active Users</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Performance athletes</li>
                  <li>• Content creators</li>
                  <li>• Campaign responders</li>
                  <li>• Tech-savvy buyers (ages 15-45)</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-accent mb-3">Brand Endorsers</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Sports personalities</li>
                  <li>• Michael Jordan</li>
                  <li>• Serena Williams</li>
                  <li>• Drive brand recall</li>
                </ul>
              </div>
            </div>

            {/* Feature Analysis */}
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-8">
              <p className="font-semibold text-text-primary">Then I analyzed Nike's key features to understand what's working:</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Nike Member Pass</h3>
                    <p className="text-sm text-text-secondary mb-3">Creates community belonging and access to exclusive events</p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-xs font-semibold text-text-primary mb-1">Why it works:</p>
                      <p className="text-xs text-text-secondary">QR-based pass lets users check into Run Club, Training Club, and Nike events - driving engagement and impulse buying</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Nike By You (Customization)</h3>
                    <p className="text-sm text-text-secondary mb-3">Users want products that feel uniquely theirs</p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-xs font-semibold text-text-primary mb-1">Why it works:</p>
                      <p className="text-xs text-text-secondary">Lets users customize shoe colors and materials; AI-powered virtual rotation shows the shoe from all angles before purchase</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Chat with Nike Experts</h3>
                    <p className="text-sm text-text-secondary mb-3">Users have sizing/product questions but hate bots</p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-xs font-semibold text-text-primary mb-1">Why it works:</p>
                      <p className="text-xs text-text-secondary">Real human representatives build trust and make customers feel connected to the brand</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Landscape */}
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-6">
              <p className="font-semibold text-text-primary">Competitive landscape:</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-text-primary mb-3">Nike</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-green-600 mb-1">Strength</p>
                    <p className="text-sm text-text-secondary">Robust member ecosystem, personalized shopping, expert support</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-600 mb-1">Weakness</p>
                    <p className="text-sm text-text-secondary">Region-restricted drops, premium pricing excludes budget shoppers</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-text-primary mb-3">Puma</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-green-600 mb-1">Strength</p>
                    <p className="text-sm text-text-secondary">Strong fashion/music/lifestyle collaborations</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-600 mb-1">Weakness</p>
                    <p className="text-sm text-text-secondary">Minimal in-app community, less immersive storytelling</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-text-primary mb-3">Adidas</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-green-600 mb-1">Strength</p>
                    <p className="text-sm text-text-secondary">Sustainability as core USP, strong regional sports focus</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-600 mb-1">Weakness</p>
                    <p className="text-sm text-text-secondary">Chat support has frequent drop-offs, poor responsiveness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Solution</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-8">
              <p className="font-semibold text-text-primary">Problem:</p>
              <p>Longtime members with low purchase frequency don't receive regular updates, relevant offers, or enhanced benefits - making the app feel stale.</p>
              <p className="font-semibold text-text-primary mt-6">Proposed Solution:</p>
              <p className="text-xl font-bold text-accent">Tiered engagement system with frequent, personalized rewards</p>
            </div>

            {/* Solution Components */}
            <div className="space-y-4 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Tiered Member Rewards</h3>
                <p className="text-sm text-text-secondary">More frequent rewards based on engagement level - not just purchases</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Personalized Offers</h3>
                <p className="text-sm text-text-secondary">Tailored promotions based on browsing history, favorite sports, and past purchases</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Surprise Benefits</h3>
                <p className="text-sm text-text-secondary">Unexpected perks (early access, exclusive content) to create anticipation</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Limited-Time Promotions</h3>
                <p className="text-sm text-text-secondary">App-exclusive deals that create urgency to revisit</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Re-engagement Content</h3>
                <p className="text-sm text-text-secondary">Curated stories, new arrivals, and events pushed to dormant users</p>
              </div>
            </div>

            {/* Why This Works */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-text-primary mb-4">Why this works:</h3>
              <p className="text-text-secondary leading-relaxed">
                Rewards and exclusive benefits drive a sense of value and anticipation. Users interact with the app more often - even if they're not buying immediately. This generates richer behavioral data, allowing Nike to tailor future recommendations even better. The result: <span className="font-semibold text-accent">higher retention, more app-driven sales, and casual users converting into loyal customers</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Impact</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Monthly Active Users</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Increase</div>
                </div>
                <p className="text-sm text-text-secondary">Dormant members return to the app more frequently</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Retention Rate</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Improve</div>
                </div>
                <p className="text-sm text-text-secondary">Users stay engaged longer due to ongoing rewards</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Purchase Frequency</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Increase</div>
                </div>
                <p className="text-sm text-text-secondary">Personalized offers convert browsers into buyers</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Customer Lifetime Value</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Grow</div>
                </div>
                <p className="text-sm text-text-secondary">Engaged members spend more over time</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Churn Rate</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-green-600">Decrease</div>
                </div>
                <p className="text-sm text-text-secondary">Fewer users quietly abandon the app</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <p className="text-sm font-semibold text-text-primary mb-2">Strategic alignment:</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Nike's mission is to bring inspiration and innovation to every athlete. A tiered engagement system ensures that all members - not just power users - feel valued and connected to the Nike ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I Learned */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What I Learned</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Membership isn't engagement.</h3>
                <p className="text-slate-300 leading-relaxed">
                  Signing up is easy. Staying active is hard. Nike's member ecosystem is powerful, but it needs to continuously reward users - even the quiet ones - to prevent silent churn.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Community is a competitive moat.</h3>
                <p className="text-slate-300 leading-relaxed">
                  Puma has collaborations. Adidas has sustainability. But Nike's Run Club, Training Club, and exclusive events create emotional connection that competitors struggle to replicate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Personalization drives loyalty.</h3>
                <p className="text-slate-300 leading-relaxed">
                  Nike By You lets users design their own shoes. AI-powered recommendations surface relevant products. These features make users feel seen - and that feeling converts to purchases.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Human support still matters.</h3>
                <p className="text-slate-300 leading-relaxed">
                  In an age of chatbots, Nike's real human experts stand out. Trust is built through authentic interaction, not automated replies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Interested in working together?</h2>
            <p className="text-text-secondary mb-8">Let's discuss how I can help with your product challenges.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://docs.google.com/document/d/11uEhNXe_2Gsz_WBqaG-mwMipEthXKyH-838imnIESNw/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2"
              >
                <ExternalLink size={20} />
                <span>View Full Analysis</span>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all flex items-center gap-2">
                <Mail size={20} />
                <span>Get in Touch</span>
              </a>
              <button onClick={onBack} className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all">
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AppleStockCaseStudyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tight mb-6">
              Apple Stock Dashboard <span className="text-accent">Case Study</span>
            </h1>
            <div className="mb-6">
              <a
                href="https://aksum.shinyapps.io/appleenahnced/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30"
              >
                <ExternalLink size={20} />
                <span>View Live Dashboard</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Apple Stock Dashboard</h2>
              <p className="text-xl text-accent font-semibold mb-2">Real-Time Stock Analysis & Price Forecasting</p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">R Shiny</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Prophet</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Quantmod</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Time Series</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Plotly</span>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">Yahoo Finance API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Pain Point</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p className="text-2xl font-bold text-text-primary">
                Tracking stock performance shouldn't require switching between five different tools.
              </p>
              <p>
                I wanted to monitor Apple's stock - see the current price, understand recent trends, and get a sense of where it might be heading. But most solutions were either too basic (just a price ticker) or too complex (Bloomberg terminals with a steep learning curve and expensive subscriptions).
              </p>
              <p>
                Retail investors and finance enthusiasts face the same friction: <span className="font-semibold text-text-primary">scattered data across multiple sources</span>, no easy way to visualize historical trends alongside predictions, and no single dashboard that brings it all together in a clean, interactive format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Approach</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-8">
              <p>
                I asked: <span className="font-semibold text-text-primary">What would a self-contained stock analysis tool look like?</span>
              </p>
              <p className="font-semibold text-text-primary">The answer had four parts:</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Real-time data</h3>
                <p className="text-sm text-text-secondary">Pull live stock prices automatically, not manually</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Historical visualization</h3>
                <p className="text-sm text-text-secondary">See trends over customizable date ranges</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Technical indicators</h3>
                <p className="text-sm text-text-secondary">Moving averages and candlestick charts for pattern recognition</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-accent mb-2">Forecasting</h3>
                <p className="text-sm text-text-secondary">Predict future prices using time series modeling</p>
              </div>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                I chose <span className="font-semibold text-accent">R Shiny</span> for the dashboard framework because it allows rapid prototyping of interactive data apps. For forecasting, I used <span className="font-semibold text-accent">Facebook's Prophet library</span> - designed specifically for business time series with daily seasonality patterns, which fits stock data well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Solution</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-8">
              <p className="text-xl font-bold text-text-primary">Architecture: Real-time data pipeline with interactive visualization</p>
            </div>

            {/* Architecture Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-primary border-b border-slate-200">Component</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-primary border-b border-slate-200">What it does</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-text-primary border-b border-slate-200">Tech</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="px-6 py-4 text-sm font-semibold text-text-primary">Data Ingestion</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">Fetches live AAPL stock data from Yahoo Finance</td>
                      <td className="px-6 py-4 text-sm text-accent">quantmod package</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-6 py-4 text-sm font-semibold text-text-primary">Auto-Refresh</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">Updates data every 60 seconds automatically</td>
                      <td className="px-6 py-4 text-sm text-accent">Shiny reactive polling</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-6 py-4 text-sm font-semibold text-text-primary">Visualization</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">Interactive line charts, candlestick charts, data tables</td>
                      <td className="px-6 py-4 text-sm text-accent">Plotly, DT</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-text-primary">Forecasting</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">30-day price prediction with confidence intervals</td>
                      <td className="px-6 py-4 text-sm text-accent">Prophet (time series ML)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dashboard Features */}
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-8">
              <p className="font-semibold text-text-primary">Dashboard Features:</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Value Boxes</h3>
                    <p className="text-sm text-text-secondary">Current price, daily change ($), percent change (%) - color-coded green/red</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Stock Price Chart</h3>
                    <p className="text-sm text-text-secondary">Historical closing prices with adjustable moving average overlay</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Candlestick Chart</h3>
                    <p className="text-sm text-text-secondary">Open/High/Low/Close visualization for technical analysis</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Price Table</h3>
                    <p className="text-sm text-text-secondary">Sortable, searchable table of all historical data</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Forecast Plot</h3>
                    <p className="text-sm text-text-secondary">30-day ahead prediction with actual vs. forecasted comparison</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Earnings Analysis</h3>
                    <p className="text-sm text-text-secondary">5-year earnings trend (2020-2024) on separate tab</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-2">Company Info</h3>
                    <p className="text-sm text-text-secondary">Key stats sidebar: Market Cap ($2.48T), P/E Ratio (30.50), EPS ($5.61), Dividend Yield (0.55%)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-text-primary mb-4">Stack:</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><span className="font-semibold text-text-primary">Framework:</span> R Shiny with shinydashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><span className="font-semibold text-text-primary">Data Source:</span> Yahoo Finance via quantmod</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><span className="font-semibold text-text-primary">Visualization:</span> Plotly for interactive charts, DT for tables</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><span className="font-semibold text-text-primary">Forecasting:</span> Facebook Prophet with yearly + daily seasonality</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><span className="font-semibold text-text-primary">Deployment:</span> Shiny Server (manifest.json configured for deployment)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Impact</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Metric</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Data Freshness</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-accent">Auto-updates every 60 seconds</div>
                </div>
                <p className="text-sm text-text-secondary">Users always see current prices without manual refresh</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Outcome</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Date Flexibility</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-accent">Custom date range selector</div>
                </div>
                <p className="text-sm text-text-secondary">Analyze any period from 2022 to present</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Feature</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Technical Analysis</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-accent">Moving average slider (1-30 days)</div>
                </div>
                <p className="text-sm text-text-secondary">Users can adjust indicators to their trading style</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Capability</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Forecast Horizon</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-accent">30-day predictions</div>
                </div>
                <p className="text-sm text-text-secondary">Helps users anticipate near-term price movements</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-sm font-bold text-accent mb-2">Experience</div>
                <div className="text-2xl font-bold text-text-primary mb-3">Interactivity</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg font-bold text-accent">Hover tooltips, zoom, pan</div>
                </div>
                <p className="text-sm text-text-secondary">Explore data without leaving the dashboard</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <p className="text-sm font-semibold text-text-primary mb-2">Key design decisions:</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Single-page dashboard with everything visible - no hunting through tabs</li>
                <li>• Color-coded value boxes (green = up, red = down) for instant sentiment</li>
                <li>• Prophet model captures both yearly seasonality and daily patterns for more accurate forecasts</li>
                <li>• Responsive auto-refresh keeps data current without user intervention</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What I Learned */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What I Learned</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Real-time data changes the user experience.</h3>
                <p className="text-slate-300 leading-relaxed">
                  A dashboard that updates itself every 60 seconds feels alive. Users trust it more because they know they're seeing current information - not stale data from hours ago.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Prophet handles stock seasonality well.</h3>
                <p className="text-slate-300 leading-relaxed">
                  Stock prices have patterns - weekly trading cycles, yearly earnings seasons. Prophet's built-in seasonality modeling captured these without manual feature engineering.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Interactivity beats static charts.</h3>
                <p className="text-slate-300 leading-relaxed">
                  Plotly's hover tooltips, zoom, and pan features let users explore data on their own terms. A candlestick chart you can zoom into is far more useful than a static image.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Context matters as much as data.</h3>
                <p className="text-slate-300 leading-relaxed">
                  Adding company info (Market Cap, P/E, EPS) in the sidebar gives users the fundamentals alongside the price action. Numbers without context are just noise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Interested in working together?</h2>
            <p className="text-text-secondary mb-8">Let's discuss how I can help with your data visualization and analytics challenges.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://aksum.shinyapps.io/appleenahnced/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2"
              >
                <ExternalLink size={20} />
                <span>View Live Dashboard</span>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all flex items-center gap-2">
                <Mail size={20} />
                <span>Get in Touch</span>
              </a>
              <button onClick={onBack} className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all">
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ElevnCaseStudyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Centered Title */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tight">
            Elevn <span className="text-accent">Case Study</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

const UdemyCaseStudyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Centered Title */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tight">
            Udemy <span className="text-accent">Case Study</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

const WorkPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Centered Title */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tight">
            Work
          </h1>
        </div>
      </div>
    </div>
  );
};

const CaseStudyPage: React.FC<{ projectId: string; onBack: () => void }> = ({ projectId, onBack }) => {
  const project = [...PROJECTS, ...SECONDARY_PROJECTS].find(p => p.id === projectId);
  const caseStudy = CASE_STUDIES[projectId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case study not found</h1>
          <button onClick={onBack} className="text-accent hover:underline">Go back home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
            <ArrowRight className="rotate-180" size={18} />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <span className="text-accent font-bold text-xs uppercase tracking-widest mb-4 block">{project.type}</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">{project.title}</h1>
            <p className="text-xl text-text-secondary leading-relaxed mb-8">{project.headline}</p>
            {'role' in project && project.role && (
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span className="font-bold">Role:</span>
                <span>{project.role}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Image */}
      {project.imageUrl && (
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
              <img src={project.imageUrl} alt={project.title} className="w-full h-auto" />
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Overview</h2>
            <p className="text-lg text-text-secondary leading-relaxed">{caseStudy.overview}</p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">The Problem</h2>
            <p className="text-lg text-text-secondary leading-relaxed">{caseStudy.problem}</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-8">Approach</h2>
            <div className="space-y-4">
              {caseStudy.approach.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-text-secondary leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Solution</h2>
            <p className="text-lg text-text-secondary leading-relaxed">{caseStudy.solution}</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-8">Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudy.results.map((result, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-3xl font-bold text-accent mb-2">{result.value}</div>
                  <div className="text-sm font-bold text-text-primary mb-2">{result.metric}</div>
                  <p className="text-sm text-text-secondary">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learnings */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Key Learnings</h2>
            <div className="space-y-4">
              {caseStudy.learnings.map((learning, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300 leading-relaxed">{learning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      {caseStudy.tools && caseStudy.tools.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.tools.map((tool, idx) => (
                  <span key={idx} className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-text-secondary">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Interested in working together?</h2>
            <p className="text-text-secondary mb-8">Let's discuss how I can help with your product challenges.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akulsuhailmalhotra@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2">
                <Mail size={20} />
                <span>Get in Touch</span>
              </a>
              <button onClick={onBack} className="bg-white text-text-primary px-8 py-4 rounded-xl font-bold border-2 border-slate-200 hover:border-accent transition-all">
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAnimateModalOpen, setIsAnimateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>(undefined);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [editedImages, setEditedImages] = useState<Record<string, string>>({});

  const openAnimate = (img: string) => {
    setModalImage(img);
    setIsAnimateModalOpen(true);
  };

  const openEdit = (img: string, projectId: string) => {
    setModalImage(img);
    setActiveProjectId(projectId);
    setIsEditModalOpen(true);
  };

  const handleImageEdited = (newImageUrl: string) => {
    if (activeProjectId) {
      setEditedImages(prev => ({ ...prev, [activeProjectId]: newImageUrl }));
    }
  };

  const handleCaseStudyClick = (projectId: string) => {
    setCurrentPage(projectId);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'cerebro-ai') {
    return <CerebroCaseStudyPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'leaklock') {
    return <LeakLockCaseStudyPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'hinge-roadmap') {
    return <HingeCaseStudyPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'nike-app') {
    return <NikeCaseStudyPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'apple-stock') {
    return <AppleStockCaseStudyPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'elevn-teardown') {
    return <ElevnCaseStudyPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'udemy-sense') {
    return <UdemyCaseStudyPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'work-page') {
    return <WorkPage onBack={handleBackToHome} />;
  }

  const handleWorkClick = () => {
    setCurrentPage('work-page');
  };

  return (
    <div className="min-h-screen font-sans text-text-primary">
      <Header onWorkClick={handleWorkClick} />
      <Hero />
      <SelectedWork
        onAnimate={openAnimate}
        onEdit={openEdit}
        editedImages={editedImages}
        onCaseStudyClick={handleCaseStudyClick}
      />
      <CapabilitiesSection />
      <Approach />
      <About />
      <Contact />
      <Footer />
      <VeoModal isOpen={isAnimateModalOpen} onClose={() => setIsAnimateModalOpen(false)} initialImage={modalImage} />
      <ImageEditorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialImage={modalImage}
        onImageEdited={handleImageEdited}
      />
    </div>
  );
};

export default App;
