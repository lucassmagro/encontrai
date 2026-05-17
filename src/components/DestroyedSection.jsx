import { motion } from 'framer-motion';
import { Trash2, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';

export default function DestroyedSection({ onNewScan, onGoHome }) {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
      <motion.div variants={containerVars} initial="hidden" animate="show" className="flex flex-col items-center max-w-2xl">
        
        {/* Animated Trash/Shield Icon */}
        <motion.div variants={itemVars} className="relative mb-8">
          <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] rounded-full" />
          <div className="w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative">
            <ShieldCheck className="w-10 h-10 text-emerald-400 absolute transition-all duration-1000 transform scale-100" />
          </div>
        </motion.div>

        <motion.h1 variants={itemVars} className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Sessão Destruída com Sucesso
        </motion.h1>
        
        <motion.p variants={itemVars} className="text-zinc-400 text-lg leading-relaxed mb-12">
          De acordo com nossa política de **Retenção Zero (Zero-Knowledge)**, todos os vetores faciais, imagens originais e dados de sessão gerados durante a auditoria foram apagados permanentemente da memória volátil (RAM).
        </motion.p>

        <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button 
            onClick={onNewScan}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-[15px] font-semibold rounded-xl hover:bg-zinc-200 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <RotateCcw className="w-5 h-5" />
            Nova Verificação Forense
          </button>
          
          <button 
            onClick={onGoHome}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.03] text-white text-[15px] font-semibold rounded-xl border border-white/[0.05] hover:bg-white/[0.06] transition-all"
          >
            Voltar ao Início
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}
