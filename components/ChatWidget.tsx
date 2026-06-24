import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Cpu, Minimize2, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis l'assistant IA de Tony. Je suis connecté au serveur central. Comment puis-je vous aider ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    const newUserMsg: Message = {
      id: Date.now(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Connect to the provided MCP/Webhook URL
      // We send a JSON-RPC style or standard webhook payload. 
      // Assuming webhook style for chat integration:
      const response = await fetch('https://n8n.tonypayet.com/mcp-server/http', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userText,
          history: messages.slice(-5).map(m => ({ role: m.sender, content: m.text })), // Send recent context
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Handle different potential response formats
      const data = await response.json();
      let responseText = "Réponse illisible du serveur.";

      if (typeof data === 'string') {
         responseText = data;
      } else if (data.output) {
         responseText = data.output;
      } else if (data.text) {
         responseText = data.text;
      } else if (data.message) {
         responseText = data.message;
      } else if (data.content && data.content[0] && data.content[0].text) {
          // MCP JSON-RPC text response format
          responseText = data.content[0].text;
      } else {
         responseText = JSON.stringify(data);
      }

      const botResponse: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        text: "⚠️ Erreur de connexion au serveur neuronal n8n. Veuillez réessayer.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[320px] md:w-[380px] h-[450px] md:h-[500px] bg-black/90 backdrop-blur-xl border border-[#f05a28]/30 rounded-lg shadow-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: '0 0 30px rgba(234, 179, 8, 0.1)' }}
          >
            {/* Header */}
            <div className="p-3 md:p-4 border-b border-[#f05a28]/20 bg-gradient-to-r from-[#f05a28]/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-2 h-2 ${isLoading ? 'bg-[#f05a28]' : 'bg-green-500'} rounded-full animate-pulse absolute -right-0.5 -bottom-0.5 z-10 box-content border border-black`}></div>
                  <div className="w-8 h-8 rounded bg-[#f05a28]/10 border border-[#f05a28]/50 flex items-center justify-center overflow-hidden">
                    <Cpu size={18} className="text-[#f05a28]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wider font-orbitron">TONY_AI_AGENT</h3>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1 h-1 ${isLoading ? 'bg-[#f05a28]' : 'bg-green-500'} rounded-full`}></div>
                    <span className={`text-[10px] ${isLoading ? 'text-[#f05a28]' : 'text-green-500'} font-mono tracking-wide`}>
                        {isLoading ? 'PROCESSING_DATA...' : 'SYSTEM ONLINE'}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded"
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black/80 to-black/40">
               {messages.map((msg) => (
                 <motion.div 
                   key={msg.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }} 
                   className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                   <div 
                     className={`
                       max-w-[85%] p-3 text-sm rounded-lg relative group
                       ${msg.sender === 'user' 
                         ? 'bg-[#f05a28]/10 border border-[#f05a28]/30 text-gray-200 rounded-tr-none ml-4' 
                         : 'bg-zinc-800/80 border border-white/10 text-gray-300 rounded-tl-none mr-4'}
                     `}
                   >
                     <div className="whitespace-pre-wrap">{msg.text}</div>
                     <div className="text-[9px] opacity-40 mt-1.5 text-right font-mono tracking-wider">
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                     </div>
                     
                     {/* Decorative corner accents */}
                     <div className={`absolute top-0 w-2 h-2 border-t 
                        ${msg.sender === 'user' 
                            ? 'right-0 border-r border-[#f05a28]' 
                            : 'left-0 border-l border-cyan-500'}
                     `}></div>
                   </div>
                 </motion.div>
               ))}
               {isLoading && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                       <div className="bg-zinc-800/80 border border-white/10 text-gray-300 rounded-lg rounded-tl-none p-3 flex items-center gap-2">
                           <Loader2 size={14} className="animate-spin text-[#f05a28]" />
                           <span className="text-xs font-mono animate-pulse">Thinking...</span>
                       </div>
                   </motion.div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 md:p-4 border-t border-white/10 bg-black/60 relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez une question à mon IA..."
                  className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded pl-4 pr-12 py-3 focus:outline-none focus:border-[#f05a28]/50 transition-all placeholder:text-gray-600 font-rajdhani"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 p-1.5 bg-[#f05a28] rounded text-black hover:bg-[#ff6b3d] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-2 text-[8px] text-center text-gray-700 font-mono tracking-[0.2em] uppercase select-none flex justify-between px-1">
                <span>Encryption: Enabled</span>
                <span>Node: n8n_MCP</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
            w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-300 relative group z-50
            ${isOpen ? 'bg-zinc-900 text-white border border-white/20' : 'bg-[#f05a28] text-black border border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.4)]'}
        `}
      >
        {/* Pulse Effect */}
        {!isOpen && (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff6b3d] opacity-20 animate-ping duration-[2s]"></span>
            <span className="absolute -inset-1 border border-[#f05a28]/30 rounded-full animate-spin-slow" style={{ animationDuration: '3s' }}></span>
          </>
        )}
        
        {isOpen ? <X size={24} /> : <MessageSquare size={24} strokeWidth={2.5} />}
        
        {/* Hover tooltip text */}
        {!isOpen && (
             <motion.div 
               initial={{ opacity: 0, x: 10 }}
               whileHover={{ opacity: 1, x: 0 }}
               className="absolute right-20 bg-black/90 text-[#f05a28] text-xs px-3 py-1.5 rounded border border-[#f05a28]/30 whitespace-nowrap backdrop-blur-md hidden md:block"
             >
                 <span className="font-bold">PARLER À L'IA</span>
                 <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-black border-t border-r border-[#f05a28]/30 rotate-45"></div>
             </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;