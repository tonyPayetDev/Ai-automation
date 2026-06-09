
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Scan, Activity, Zap, ShieldCheck } from 'lucide-react';
import { CyberButton, GlitchText } from './ui/CyberComponents';

interface HeroProps {
  media: {
    type: 'image' | 'video';
    src: string;
  };
}

const Hero: React.FC<HeroProps> = ({ media }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 30) + 1;
        
        const colors = ['rgba(234, 179, 8, 0.8)', 'rgba(6, 182, 212, 0.8)', 'rgba(236, 72, 153, 0.8)']; // Yellow, Cyan, Pink
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.baseX += this.vx;
        this.baseY += this.vy;
        if (this.baseX < 0 || this.baseX > canvas!.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas!.height) this.vy *= -1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 100;
        
        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
        this.draw();
      }
    }

    const initParticles = () => {
        particles = [];
        const numberOfParticles = 70; 
        for (let i = 0; i < numberOfParticles; i++){
            particles.push(new Particle());
        }
    }

    const connect = () => {
        if (!ctx) return;
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                             + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                if (distance < (canvas.width/3) * (canvas.height/3)) {
                    opacityValue = 1 - (distance / 5000);
                    if(opacityValue > 0) {
                        ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue * 0.15 + ')';
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
    }

    const animate = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i < particles.length; i++){
            particles[i].update();
        }
        connect();
        animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; }

    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    resizeCanvas();
    animate();

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        cancelAnimationFrame(animationFrameId);
    }
  }, [media]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-600/10 rounded-full blur-[100px]"></div>
        
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-32 right-[15%] text-yellow-500/20 font-mono text-sm hidden lg:block"
        >
          {'<System.Initialize />'}
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }} 
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-32 left-[15%] text-cyan-500/20 font-mono text-sm hidden lg:block"
        >
          {'import { Future } from "ai";'}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-14 group"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 border border-dashed border-yellow-500/20 rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border border-dotted border-cyan-500/20 rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ rotate: 180 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 border border-dashed border-pink-500/20 rounded-full opacity-60"
          ></motion.div>

          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-b from-yellow-400 via-pink-500 to-cyan-500 shadow-[0_0_60px_rgba(234,179,8,0.15)]">
            <div 
                ref={containerRef}
                className="w-full h-full rounded-full bg-black overflow-hidden relative border-4 border-black/50 z-10 cursor-crosshair"
            >
               {media.type === 'video' ? (
                 <motion.video 
                    src={media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover relative z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                 />
               ) : (
                 <motion.img 
                    src={media.src} 
                    onError={(e) => {
                    e.currentTarget.src = "https://raw.githubusercontent.com/tonyPayetDev/Ai-automation/main/tony-visage.jpg";
                    }}
                    alt="Tony Payet Face Scan" 
                    className="w-full h-full object-cover relative z-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: [1.1, 1.25, 1.1] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                 />
               )}
               <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none mix-blend-screen opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none z-20"></div>
               <motion.div
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-500 via-pink-500 to-cyan-500 shadow-[0_0_15px_#eab308] z-20 pointer-events-none"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 opacity-70">
                 <div className="w-48 h-48 border border-white/10 rounded-lg relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pink-500"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500"></div>
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                 </div>
               </div>
            </div>
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-10 top-12 bg-black/90 border-l-2 border-yellow-500 p-2 pl-3 pr-4 rounded-r-lg shadow-lg backdrop-blur-md z-20 hidden sm:block"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <Scan className="w-3 h-3 text-yellow-500" />
                    <span className="text-[10px] font-mono text-yellow-500 tracking-wider">BIO_ID</span>
                </div>
                <div className="h-0.5 w-full bg-gray-800 relative overflow-hidden">
                    <motion.div 
                        className="absolute top-0 left-0 h-full bg-yellow-500"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
              </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 5, 0] }}
               transition={{ duration: 4, repeat: Infinity, delay: 1 }}
               className="absolute -left-10 bottom-20 bg-black/90 border-r-2 border-cyan-500 p-2 pr-3 pl-4 rounded-l-lg shadow-lg backdrop-blur-md z-20 text-right hidden sm:block"
            >
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-cyan-500 tracking-wider">NEURAL_LINK</span>
                    <Activity className="w-3 h-3 text-cyan-500" />
                </div>
                 <span className="text-[9px] text-gray-400 font-mono">CONNECTED</span>
              </div>
            </motion.div>
            
            <motion.div 
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute right-0 bottom-4 bg-black/90 border border-pink-500/50 p-1.5 rounded-full shadow-lg z-20"
            >
               <ShieldCheck className="w-4 h-4 text-pink-500" />
            </motion.div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black border border-white/20 px-4 py-1 rounded-full z-20">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] uppercase tracking-widest text-gray-300">Tony Payet</span>
               </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              Entrepreneurs — Freelancers — PME — Restaurateurs
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
            <GlitchText text="GAGNEZ DU TEMPS," /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500">
              FAITES x10
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
            J’automatise les tâches répétitives de votre business pour que vous puissiez vous concentrer sur ce qui rapporte vraiment.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mb-10 max-w-xl mx-auto">
            Restaurants, E-commerce, Agences, Indépendants — résultats livrés en 48h.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <CyberButton onClick={() => document.getElementById("boost")?.scrollIntoView()}>
                <Zap className="w-4 h-4" />
                {"Démarrer mon diagnostic gratuit"}
             </CyberButton>
             <CyberButton variant="secondary" onClick={() => document.getElementById("portfolio")?.scrollIntoView()}>
                {"Voir mes réalisations"}
             </CyberButton>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-yellow-500/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-yellow-500 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
