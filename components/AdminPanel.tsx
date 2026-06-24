
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Film, Play, Check, AlertTriangle, Loader2, Lock, Layout, Settings, Save, Trash2, Plus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { CyberButton } from './ui/CyberComponents';
import { BoostOfferConfig } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateHero: (mediaType: 'image' | 'video', src: string) => void;
  activeOffer: BoostOfferConfig;
  onUpdateOffer: (config: BoostOfferConfig) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onUpdateHero, activeOffer, onUpdateOffer }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'generate' | 'offers'>('offers');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("Cyberpunk character portrait, breathing, subtle movement, neon lighting, high tech city background, 8k resolution, cinematic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Synchronize local state with prop when panel opens
  const [localOffer, setLocalOffer] = useState<BoostOfferConfig>({...activeOffer});

  useEffect(() => {
    if (isOpen) {
      setLocalOffer({...activeOffer});
    }
  }, [isOpen, activeOffer]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setActiveTab('generate');
        setSuccess('Source image uploaded successfully.');
        setTimeout(() => setSuccess(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveOffer = () => {
    onUpdateOffer(localOffer);
    setSuccess('OFFER_DATA updated and deployed.');
    setTimeout(() => setSuccess(null), 3000);
  };

  const generateVideo = async () => {
    if (!selectedImage) return;
    try {
      setError(null);
      setIsGenerating(true);
      setStatus('Initializing Neural Link...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const [header, base64Data] = selectedImage.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: { imageBytes: base64Data, mimeType: mimeType },
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '9:16' }
      });
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({operation: operation});
        setStatus('Rendering Frames...');
      }
      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri || (operation as any).result?.generatedVideos?.[0]?.video?.uri;
      if (!videoUri) throw new Error("Safety filters blocked the content.");
      const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
      const videoBlob = await videoResponse.blob();
      setGeneratedVideoUrl(URL.createObjectURL(videoBlob));
      setSuccess('Video generated successfully.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-5xl bg-black border border-[#f05a28]/30 rounded-lg shadow-[0_0_50px_rgba(234,179,8,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-[#f05a28]/20 bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-[#f05a28]" />
                        <h2 className="text-xl font-bold text-white font-orbitron tracking-wider">ADMIN_CONSOLE // <span className="text-[#f05a28]">SYSTEM_MANAGER</span></h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"><X size={24} /></button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    <div className="w-64 border-r border-white/10 bg-black/50 p-4 hidden md:flex flex-col gap-2">
                        <button onClick={() => setActiveTab('offers')} className={`flex items-center gap-3 p-3 rounded text-left transition-all ${activeTab === 'offers' ? 'bg-[#f05a28] text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}>
                            <Layout size={18} /> OFFER_MANAGER
                        </button>
                        <button onClick={() => setActiveTab('upload')} className={`flex items-center gap-3 p-3 rounded text-left transition-all ${activeTab === 'upload' ? 'bg-[#f05a28] text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}>
                            <Upload size={18} /> UPLOAD_HERO
                        </button>
                        <button onClick={() => setActiveTab('generate')} disabled={!selectedImage} className={`flex items-center gap-3 p-3 rounded text-left transition-all ${activeTab === 'generate' ? 'bg-[#f05a28] text-black font-bold' : 'text-gray-400 hover:bg-white/5'} ${!selectedImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Film size={18} /> VEO_GEN
                        </button>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto bg-zinc-950/50 relative">
                        <AnimatePresence>
                            {success && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 bg-green-500/10 border border-green-500/50 rounded flex items-center gap-3 text-green-400 text-sm mb-4"><Check size={16} />{success}</motion.div>}
                            {error && <motion.div className="p-3 bg-red-500/10 border border-red-500/50 rounded flex items-center gap-3 text-red-400 text-sm mb-4"><AlertTriangle size={16} />{error}</motion.div>}
                        </AnimatePresence>

                        {activeTab === 'offers' && (
                          <div className="space-y-8 pb-12">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                              <h3 className="text-white font-bold flex items-center gap-2"><Settings size={18} className="text-[#f05a28]"/> CONFIGURATION_ACTIVE: {localOffer.name}</h3>
                              <CyberButton onClick={handleSaveOffer}><Save size={16} /> DÉPLOYER_OFFRE</CyberButton>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest">En-tête de Section</label>
                                <input 
                                  value={localOffer.title} 
                                  onChange={e => setLocalOffer({...localOffer, title: e.target.value})}
                                  className="w-full bg-black border border-white/10 p-3 rounded text-white font-mono text-sm focus:border-[#f05a28] outline-none" 
                                />
                                <input 
                                  value={localOffer.subtitle} 
                                  onChange={e => setLocalOffer({...localOffer, subtitle: e.target.value})}
                                  className="w-full bg-black border border-white/10 p-3 rounded text-gray-400 font-mono text-sm focus:border-[#f05a28] outline-none" 
                                />
                              </div>
                              <div className="space-y-4">
                                <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest">Pricing Matrix</label>
                                <div className="grid grid-cols-2 gap-2">
                                  <input 
                                    placeholder="Prix Normal" 
                                    value={localOffer.pricing.originalPrice} 
                                    onChange={e => setLocalOffer({...localOffer, pricing: {...localOffer.pricing, originalPrice: e.target.value}})}
                                    className="bg-black border border-white/10 p-3 rounded text-white font-mono text-sm" 
                                  />
                                  <input 
                                    placeholder="Prix Boost" 
                                    value={localOffer.pricing.discountedPrice} 
                                    onChange={e => setLocalOffer({...localOffer, pricing: {...localOffer.pricing, discountedPrice: e.target.value}})}
                                    className="bg-black border border-[#f05a28]/30 p-3 rounded text-[#f05a28] font-mono text-sm" 
                                  />
                                </div>
                                <input 
                                  placeholder="Note de pied" 
                                  value={localOffer.pricing.footerNote} 
                                  onChange={e => setLocalOffer({...localOffer, pricing: {...localOffer.pricing, footerNote: e.target.value}})}
                                  className="w-full bg-black border border-white/10 p-3 rounded text-gray-500 font-mono text-xs" 
                                />
                              </div>
                            </div>

                            {/* Pain Points Section */}
                            <div className="space-y-4">
                              <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest">Problems (Pain Points)</label>
                              {localOffer.problems.map((p, i) => (
                                <div key={i} className="flex gap-2">
                                  <input 
                                    value={p} 
                                    onChange={e => {
                                      const newProbs = [...localOffer.problems];
                                      newProbs[i] = e.target.value;
                                      setLocalOffer({...localOffer, problems: newProbs});
                                    }}
                                    className="flex-1 bg-black border border-white/10 p-2 rounded text-gray-300 text-sm" 
                                  />
                                  <button onClick={() => setLocalOffer({...localOffer, problems: localOffer.problems.filter((_, idx) => idx !== i)})} className="p-2 text-red-500 hover:bg-red-500/10 rounded"><Trash2 size={16}/></button>
                                </div>
                              ))}
                              <button onClick={() => setLocalOffer({...localOffer, problems: [...localOffer.problems, "Nouveau problème"]})} className="text-xs text-[#f05a28] flex items-center gap-1 hover:underline"><Plus size={12}/> Ajouter un point</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Solution #1 List */}
                              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded">
                                <label className="block text-xs font-mono text-green-500 uppercase tracking-widest mb-3">Solution #1 Edit</label>
                                <input 
                                  className="w-full bg-black border border-white/10 p-2 rounded text-white mb-3 text-sm"
                                  value={localOffer.solution1.title}
                                  onChange={e => setLocalOffer({...localOffer, solution1: {...localOffer.solution1, title: e.target.value}})}
                                />
                                <div className="space-y-2">
                                  {localOffer.solution1.items.map((it, i) => (
                                    <div key={i} className="flex gap-2">
                                      <input 
                                        className="flex-1 bg-black/50 border border-white/5 p-2 rounded text-gray-400 text-xs"
                                        value={it}
                                        onChange={e => {
                                          const newItems = [...localOffer.solution1.items];
                                          newItems[i] = e.target.value;
                                          setLocalOffer({...localOffer, solution1: {...localOffer.solution1, items: newItems}});
                                        }}
                                      />
                                      <button onClick={() => setLocalOffer({...localOffer, solution1: {...localOffer.solution1, items: localOffer.solution1.items.filter((_, idx) => idx !== i)}})} className="text-red-500/50 hover:text-red-500"><Trash2 size={14}/></button>
                                    </div>
                                  ))}
                                  <button onClick={() => setLocalOffer({...localOffer, solution1: {...localOffer.solution1, items: [...localOffer.solution1.items, "Nouvelle fonctionnalité"]}})} className="text-[10px] text-green-500 flex items-center gap-1 hover:underline"><Plus size={10}/> Ajouter une feature</button>
                                </div>
                              </div>

                              {/* Solution #2 List */}
                              <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded">
                                <label className="block text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3">Solution #2 Edit</label>
                                <input 
                                  className="w-full bg-black border border-white/10 p-2 rounded text-white mb-3 text-sm"
                                  value={localOffer.solution2.title}
                                  onChange={e => setLocalOffer({...localOffer, solution2: {...localOffer.solution2, title: e.target.value}})}
                                />
                                <div className="space-y-2">
                                  {localOffer.solution2.steps.map((s, i) => (
                                    <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-2 mb-2 group relative">
                                      <button onClick={() => setLocalOffer({...localOffer, solution2: {...localOffer.solution2, steps: localOffer.solution2.steps.filter((_, idx) => idx !== i)}})} className="absolute -right-2 top-0 text-red-500/0 group-hover:text-red-500/50 transition-colors"><Trash2 size={14}/></button>
                                      <input className="bg-black/40 border border-white/5 p-1 rounded text-white font-bold text-xs" value={s.title} onChange={e => {
                                        const newSteps = [...localOffer.solution2.steps];
                                        newSteps[i] = {...newSteps[i], title: e.target.value};
                                        setLocalOffer({...localOffer, solution2: {...localOffer.solution2, steps: newSteps}});
                                      }} />
                                      <input className="bg-black/40 border border-white/5 p-1 rounded text-gray-500 text-[10px]" value={s.desc} onChange={e => {
                                        const newSteps = [...localOffer.solution2.steps];
                                        newSteps[i] = {...newSteps[i], desc: e.target.value};
                                        setLocalOffer({...localOffer, solution2: {...localOffer.solution2, steps: newSteps}});
                                      }} />
                                    </div>
                                  ))}
                                  <button onClick={() => setLocalOffer({...localOffer, solution2: {...localOffer.solution2, steps: [...localOffer.solution2.steps, { title: "Nouvelle étape", desc: "Description de l'étape", icon: "zap" }]}})} className="text-[10px] text-cyan-500 flex items-center gap-1 hover:underline"><Plus size={10}/> Ajouter une étape</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'upload' && (
                            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg hover:border-[#f05a28]/50 transition-colors bg-white/5 py-12">
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                                {selectedImage ? (
                                    <div className="text-center">
                                        <img src={selectedImage} alt="Selected" className="max-h-64 rounded shadow-lg border border-[#f05a28]/30 mb-4" />
                                        <CyberButton onClick={() => fileInputRef.current?.click()}>CHANGE IMAGE</CyberButton>
                                    </div>
                                ) : (
                                    <div className="text-center p-8">
                                        <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                        <h3 className="text-xl text-white font-bold mb-2">UPLOAD SOURCE IMAGE</h3>
                                        <CyberButton onClick={() => fileInputRef.current?.click()}>SELECT FILE</CyberButton>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'generate' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-[#f05a28] font-mono">SOURCE_INPUT</label>
                                        <div className="aspect-[9/16] bg-black rounded border border-white/10 overflow-hidden relative">
                                            <img src={selectedImage!} alt="Source" className="w-full h-full object-cover opacity-60" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-cyan-500 font-mono">NEURAL_OUTPUT</label>
                                        <div className="aspect-[9/16] bg-black rounded border border-cyan-500/30 overflow-hidden relative flex items-center justify-center">
                                            {isGenerating ? (
                                                <div className="text-center p-4">
                                                    <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
                                                    <p className="text-cyan-500 font-mono text-sm animate-pulse">{status}</p>
                                                </div>
                                            ) : generatedVideoUrl ? (
                                                <video src={generatedVideoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-gray-600 font-mono text-sm">WAITING FOR EXECUTION...</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 font-mono">PROMPT_CONFIGURATION</label>
                                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 text-sm text-gray-300 focus:border-[#f05a28] focus:outline-none font-mono h-24" />
                                </div>
                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                    <CyberButton onClick={generateVideo}>{isGenerating ? 'PROCESSING...' : 'EXECUTE SIMULATION (VEO)'}</CyberButton>
                                    {generatedVideoUrl && <button onClick={() => onUpdateHero('video', generatedVideoUrl)} className="px-8 py-3 font-bold tracking-wider uppercase bg-cyan-500 text-black hover:bg-cyan-400 transition-colors clip-path-polygon" style={{clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}>DEPLOY TO HEADER</button>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
