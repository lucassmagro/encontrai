import { ArrowRight, Fingerprint, Activity, FileCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="flex-1 flex flex-col justify-center items-center px-6 py-24 relative overflow-hidden">
      {/* Premium Depth Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

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
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Motor Forense v2.4</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-6"
          >
            Proteção avançada <br className="hidden md:block"/>
            da sua <span className="text-white">identidade</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-zinc-400 mb-12 max-w-lg leading-relaxed font-light"
          >
            Detecte usos indevidos da sua imagem, deepfakes e perfis sintéticos. Um laboratório forense digital que emite relatórios para proteção jurídica e extrajudicial.
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

          {/* Metrics - Elegant */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 grid grid-cols-3 gap-8 w-full"
          >
            <div className="border-l border-white/10 pl-4">
              <p className="text-3xl font-semibold text-white tracking-tight mb-1">+12K</p>
              <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-widest">Análises</p>
            </div>
            <div className="border-l border-white/10 pl-4">
              <p className="text-3xl font-semibold text-white tracking-tight mb-1">99.8%</p>
              <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-widest">Precisão</p>
            </div>
            <div className="border-l border-white/10 pl-4">
              <p className="text-3xl font-semibold text-white tracking-tight mb-1">Zero</p>
              <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-widest">Retenção</p>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Sophisticated Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-square flex justify-center items-center perspective-1000"
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
