import { ArrowRight, Fingerprint, Activity, FileCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const SpaceBackground = () => {
  const stars = Array.from({ length: 800 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.1
  }));

  const comets = Array.from({ length: 6 }).map((_, i) => ({
    id: `comet-${i}`,
    top: `${Math.random() * 60}%`, // Start higher up
    left: `-${Math.random() * 20 + 10}%`, // Start off-screen to the left
    duration: Math.random() * 1.5 + 1.5, // Fast passing
    delay: Math.random() * 15 + i * 4, // Spread out over time
  }));

  const glows = Array.from({ length: 4 }).map((_, i) => ({
    id: `glow-${i}`,
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    size: Math.random() * 300 + 200,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Glows / Nebulas */}
      {glows.map((glow, i) => (
        <motion.div
          key={glow.id}
          className={`absolute rounded-full mix-blend-screen blur-[100px] ${i % 2 === 0 ? 'bg-cyan-500/20' : 'bg-blue-500/20'}`}
          style={{
            top: glow.top,
            left: glow.left,
            width: glow.size,
            height: glow.size,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -50, 0, 50, 0],
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: glow.duration,
            repeat: Infinity,
            delay: glow.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Background Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2],
            y: [0, -40, 0],
          }}
          transition={{
            duration: star.duration * 3,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Comets / Shooting Stars */}
      {comets.map((comet) => (
        <motion.div
          key={comet.id}
          className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-white rotate-[35deg]"
          style={{ top: comet.top, left: comet.left }}
          animate={{
            x: ['0vw', '120vw'],
            y: ['0vh', '80vh'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: comet.duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5, // Random wait before next comet
            delay: comet.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default function HeroSection({ onStart }) {
  const navigate = useNavigate();

  const handleStartScan = () => {
    const isAuth = sessionStorage.getItem('encontrai_auth');
    if (!isAuth) {
      navigate('/login');
    } else {
      onStart();
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-6 min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Premium Depth Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none z-0" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] mb-8"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Motor de Inteligência v2.4</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-6"
          >
            Proteção avançada <br className="hidden md:block"/>
            da sua <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">identidade</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-zinc-400 mb-12 max-w-lg leading-relaxed font-light"
          >
            Detecte usos indevidos da sua imagem, deepfakes e perfis sintéticos. Uma plataforma de inteligência que emite relatórios para sua proteção.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={handleStartScan}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fafafa] text-zinc-900 text-sm font-semibold tracking-wide rounded-xl hover:bg-white transition-all duration-300 overflow-hidden premium-shadow"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              Iniciar Varredura
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Link to="/plataforma" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/10 text-zinc-300 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
              Explorar Tecnologia
            </Link>
          </motion.div>


        </div>

        {/* Right Content - Sophisticated Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full flex justify-center items-center perspective-1000"
        >
          {/* Subtle backglow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-[100px]" />
          
          <motion.div 
            animate={{ y: [-5, 5, -5] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-md relative z-10 glass-panel-deep rounded-2xl border border-white/[0.05] p-8"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.03]">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono tracking-widest text-zinc-400">TELEMETRIA ATIVA</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-600 tracking-widest">NODE: A1</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.02] flex items-center gap-4 hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[13px] font-semibold text-white tracking-tight">Conteúdo Sintético</h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Similaridade Facial: 98.4%</p>
                  <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.02] flex items-center gap-4 hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[13px] font-semibold text-white tracking-tight">Preservação Legal</h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Hash SHA-256 gerado e assinado.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.02] flex items-center gap-4 hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Fingerprint className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[13px] font-semibold text-white tracking-tight">Zero Data Retention</h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Biometria descartada com sucesso.</p>
                </div>
              </div>
            </div>
            
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
