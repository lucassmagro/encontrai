import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Database, Fingerprint } from 'lucide-react';

export default function Platform({ title = "Nossa Arquitetura", subtitle = "Tecnologia de Inteligência e Detecção Sintética" }) {
  const pageVariants = {
    initial: { opacity: 0, filter: "blur(12px)", scale: 0.98 },
    enter: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, filter: "blur(8px)", scale: 1.02, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div 
      variants={pageVariants} initial="initial" animate="enter" exit="exit"
      className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 relative min-h-[80vh]"
    >
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="text-center mb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-6 shadow-[0_0_30px_rgba(255,255,255,0.03)]"
        >
          <Activity className="w-5 h-5 text-cyan-400" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-panel-deep p-10 rounded-2xl border border-white/[0.04] flex flex-col gap-6">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <ScanIcon className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">Extração Biométrica</h3>
            <p className="text-[13px] text-zinc-400 leading-relaxed font-light">Mapeamento de 128 pontos nodais da face para construir um vetor matemático único (Hash). Sem armazenamento visual da imagem base.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-panel-deep p-10 rounded-2xl border border-white/[0.04] flex flex-col gap-6">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Database className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">OSINT Global Scan</h3>
            <p className="text-[13px] text-zinc-400 leading-relaxed font-light">Os vetores são comparados em tempo real contra bases de dados abertas, redes sociais não seguras e subredes para identificar anomalias.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-panel-deep p-10 rounded-2xl border border-white/[0.04] flex flex-col gap-6">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">Detecção de Modelos CNN</h3>
            <p className="text-[13px] text-zinc-400 leading-relaxed font-light">Nossos modelos analisam texturas, iluminação de sub-pixels e reflexos corneanos para separar mídia autêntica de Deepfakes gerados por GANs.</p>
          </div>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-24 text-center">
         <div className="inline-flex items-center gap-4 py-4 px-8 glass-panel rounded-full border border-white/[0.05]">
            <Fingerprint className="w-5 h-5 text-zinc-500" />
            <span className="text-sm font-medium text-zinc-300">Auditoria Trimestral Realizada por Terceiros independentes.</span>
         </div>
      </motion.div>
    </motion.div>
  );
}

// Helper icon
function ScanIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
      <path d="M7 12h10"/><path d="M12 7v10"/>
    </svg>
  )
}
