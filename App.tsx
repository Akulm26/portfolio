import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Linkedin, Calendar, MapPin, ArrowRight, ExternalLink, Download, Plus, Zap, Target, Activity, Award, Brain, Microscope, Compass, Layers, Search, RefreshCw, BarChart3, Workflow, GraduationCap, Globe, Sparkles, Coffee, Phone, Clapperboard, Upload, Loader2, Play, Image as ImageIcon, Wand2, Check } from 'lucide-react';
import { PROJECTS, SECONDARY_PROJECTS, CAPABILITIES, STEPS, PRINCIPLES } from './constants';
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
        throw new Error("Gemini didn't return an image. Try a different prompt.");
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
                  placeholder="e.g. 'Add a retro cinematic filter', 'Remove the background person', 'Make it look futuristic'..."
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

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#work' },
    { name: 'Work', href: '#approach' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = [...navLinks.map(link => link.href.substring(1)), 'connect'];
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
            <a key={link.name} href={link.href} className="text-4xl font-display font-bold text-text-primary" onClick={(e) => handleLinkClick(e, link.href)}>{link.name}</a>
          ))}
          <a href="#connect" className="text-4xl font-display font-bold text-accent" onClick={(e) => handleLinkClick(e, '#connect')}>Connect</a>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-20 overflow-hidden relative bg-white">
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
                { icon: <Workflow size={20} />, label: 'Build', text: 'Shipping systems that change real user behavior.' },
                { icon: <RefreshCw size={20} />, label: 'Translate', text: 'Turning messy signals into usable product decisions.' },
                { icon: <BarChart3 size={20} />, label: 'Measure', text: 'Defining metrics that reflect real human value.' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-text-primary mb-2 whitespace-nowrap">{item.label}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-20 flex flex-col items-center">
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
              <a href="mailto:akul@example.com" className="group/action flex flex-col items-center gap-2 cursor-pointer no-underline outline-none">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-accent/30 hover:-translate-y-2 active:scale-95">
                  <Mail size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover/action:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/action:translate-y-0">Email</span>
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group/action flex flex-col items-center gap-2 cursor-pointer no-underline outline-none">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[#0077B5]/30 hover:-translate-y-2 active:scale-95">
                  <Linkedin size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0077B5] opacity-0 group-hover/action:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/action:translate-y-0">LinkedIn</span>
              </a>

              <a href="tel:+1234567890" className="group/action flex flex-col items-center gap-2 cursor-pointer no-underline outline-none">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-text-primary hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-green-600/30 hover:-translate-y-2 active:scale-95">
                  <Phone size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 opacity-0 group-hover/action:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/action:translate-y-0">Call</span>
              </a>
            </div>
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
}> = ({ onAnimate, onEdit, editedImages }) => {
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
                <div className="w-full lg:w-[60%] relative group/img-wrapper flex flex-col md:flex-row gap-6">
                  <div className="flex-1 rounded-[40px] overflow-hidden bg-slate-900 shadow-2xl transition-all duration-700 group-hover:shadow-blue-200/50 group-hover:scale-[1.01] relative">
                    <img 
                      src={project.imageUrl || `https://picsum.photos/seed/${project.id}/1600/1200`} 
                      alt={project.title} 
                      className="w-full aspect-[4/3] object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img-wrapper:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-4">
                      <button 
                        onClick={() => onAnimate(project.imageUrl || '')}
                        className="w-full max-w-xs bg-white text-text-primary px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                      >
                        <Clapperboard size={18} className="text-accent" />
                        Veo Animator
                      </button>
                      <button 
                        onClick={() => onEdit(project.imageUrl || '', project.id)}
                        className="w-full max-w-xs bg-accent text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                      >
                        <ImageIcon size={18} />
                        Nano Banana Edit
                      </button>
                    </div>
                  </div>

                  {/* Right side of Cerebro AI resulting image display */}
                  {project.id === 'cerebro-ai' && editedImages[project.id] && (
                    <div className="flex-1 rounded-[40px] overflow-hidden bg-slate-900 shadow-2xl border-4 border-accent/20 animate-in fade-in slide-in-from-right-10 duration-1000">
                      <div className="absolute top-4 left-4 z-10 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        AI Result
                      </div>
                      <img 
                        src={editedImages[project.id]} 
                        alt="Edited Cerebro AI" 
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-[40%] pt-8 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="text-accent font-bold uppercase tracking-widest text-[10px] bg-blue-50 px-3 py-1 rounded-full">{project.type}</span>
                    {project.metricValue && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                        <span className="text-[10px] font-bold text-green-700 uppercase">{project.metricLabel}: {project.metricValue}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tight leading-[1.1] group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="h-6 w-[2px] bg-accent mt-2"></div>
                      <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                        <span className="font-bold text-text-primary block mb-2">{project.headline}</span>
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-wrap gap-6">
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
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 duration-700">
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

// Rest of components (CapabilitiesSection, Approach, Philosophy, About, Contact, Footer) stay the same

const App: React.FC = () => {
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

  return (
    <div className="min-h-screen font-sans text-text-primary">
      <Header />
      <Hero />
      <SelectedWork 
        onAnimate={openAnimate} 
        onEdit={openEdit}
        editedImages={editedImages}
      />
      <CapabilitiesSection />
      <Approach />
      <Philosophy />
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

// Placeholder components to maintain structure (already defined in previous turns but ensuring they are here for App.tsx context)
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
              <span className="absolute -bottom-8 -right-4 text-[140px] font-display font-black text-white/[0.03] group-hover:text-accent/[0.05] transition-colors duration-500 select-none">0{idx + 1}</span>
              <div className="relative z-10">
                <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  {icons[idx % icons.length]}
                </div>
                <h4 className="text-2xl font-display font-bold text-white mb-6 leading-tight group-hover:text-accent transition-colors">{p.title}</h4>
                <p className="text-slate-400 text-base leading-relaxed font-light group-hover:text-slate-200 transition-colors">{p.description}</p>
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
            <a href="mailto:akul@example.com" className="flex items-center gap-3 px-8 py-4 bg-text-primary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-xl shadow-slate-200 group"><Mail size={20} /><span>Email Me</span></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white text-text-primary border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"><Linkedin size={20} className="text-[#0077B5]" /><span>LinkedIn</span></a>
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
        <p>© {new Date().getFullYear()} Akul S. Malhotra. Carefully engineered, usually caffeinated.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">Resume</a>
          <a href="https://linkedin.com" className="hover:text-accent transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default App;