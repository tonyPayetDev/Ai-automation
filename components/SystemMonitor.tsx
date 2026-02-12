import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, Clock, Terminal, AlertCircle, Cpu } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

interface SystemTask {
  id: string;
  code: string;
  label: string;
  status: 'completed' | 'pending' | 'processing';
  details?: string[];
}

const tasks: SystemTask[] = [
  { 
    id: '01', 
    code: 'REV_GEN_01', 
    label: 'Action Vente / Cash Flow', 
    status: 'pending',
    details: ['Générer cash rapide']
  },
  { 
    id: '02', 
    code: 'AUTO_SCALE', 
    label: 'Délégation & Automatisation', 
    status: 'completed',
    details: ['Tâches secondaires -> Team/Bot']
  },
  { 
    id: '03', 
    code: 'BIO_MAINT', 
    label: 'Sport + Mindset Optimization', 
    status: 'pending',
    details: ['Maintien énergie & Focus']
  },
  { 
    id: '04', 
    code: 'EXT_CONTRACT', 
    label: 'Tâches TT (Contractuel)', 
    status: 'processing',
    details: ['Requête SQL & Congés [OK]', 'Amélioration Clickup [OK]', 'Amélioration Doc [PENDING]']
  },
  { 
    id: '05', 
    code: 'SYS_UPGRADE', 
    label: 'Dev Feature / Automatisation', 
    status: 'completed',
    details: ['Amélioration process', 'Gain productivité']
  },
  { 
    id: '06', 
    code: 'NET_UPLINK', 
    label: 'Planification Réseaux Sociaux', 
    status: 'completed'
  }
];

const SystemMonitor: React.FC = () => {
  return (
    <section className="py-20 bg-black relative border-b border-white/10">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-12 justify-center">
            <Terminal className="text-yellow-500 w-6 h-6" />
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white tracking-widest">
                DAILY_SYSTEM_LOGS <span className="text-yellow-500 animate-pulse">_</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Visual Terminal */}
          <div className="bg-zinc-950/80 border border-white/10 rounded-lg p-6 font-mono text-xs md:text-sm shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
            
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2 text-gray-500">
               <span>TERMINAL_OUTPUT</span>
               <span>UPTIME: 99.9%</span>
            </div>

            <div className="space-y-2 h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
               {tasks.map((task, i) => (
                 <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-1"
                 >
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">[{new Date().toLocaleDateString()}]</span>
                        <span className="text-cyan-500">{task.code}</span>
                        <span className="text-gray-400">...</span>
                        <span className={`${
                            task.status === 'completed' ? 'text-green-500' : 
                            task.status === 'pending' ? 'text-yellow-500' : 'text-blue-500'
                        }`}>
                            {task.status.toUpperCase()}
                        </span>
                    </div>
                    {task.details && task.details.map((detail, idx) => (
                        <div key={idx} className="pl-24 text-gray-600 truncate before:content-['>_'] before:mr-2 before:text-gray-700">
                            {detail}
                        </div>
                    ))}
                 </motion.div>
               ))}
               <motion.div 
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ duration: 1, repeat: Infinity }}
                 className="text-yellow-500 mt-4"
               >
                 _Awaiting input...
               </motion.div>
            </div>
          </div>

          {/* Right Column: Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {tasks.map((task, index) => (
                <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                        p-4 rounded border relative overflow-hidden backdrop-blur-sm
                        ${task.status === 'completed' 
                            ? 'bg-green-950/10 border-green-500/30' 
                            : task.status === 'pending'
                                ? 'bg-yellow-950/10 border-yellow-500/30'
                                : 'bg-blue-950/10 border-blue-500/30'}
                    `}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-mono border px-1.5 rounded ${
                            task.status === 'completed' ? 'border-green-500/50 text-green-500' :
                            task.status === 'pending' ? 'border-yellow-500/50 text-yellow-500' :
                            'border-blue-500/50 text-blue-500'
                        }`}>
                            {task.code}
                        </span>
                        {task.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
                        {task.status === 'pending' && <AlertCircle size={16} className="text-yellow-500" />}
                        {task.status === 'processing' && <Activity size={16} className="text-blue-500 animate-pulse" />}
                    </div>
                    
                    <h4 className="text-white font-bold text-sm mb-1">{task.label}</h4>
                    
                    {/* Progress Bar Visual */}
                    <div className="w-full h-1 bg-gray-800 rounded-full mt-3 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: task.status === 'completed' ? '100%' : task.status === 'pending' ? '10%' : '60%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${
                                task.status === 'completed' ? 'bg-green-500' :
                                task.status === 'pending' ? 'bg-yellow-500' :
                                'bg-blue-500'
                            }`}
                        />
                    </div>
                </motion.div>
             ))}
          </div>
        </div>
        
        {/* Decorative footer for the section */}
        <div className="mt-8 flex items-center justify-between text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            <div>System_Load: 84%</div>
            <div>Priority: Day_02_Planning</div>
        </div>
      </div>
    </section>
  );
};

export default SystemMonitor;