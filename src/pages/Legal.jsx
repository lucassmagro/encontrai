import { motion } from 'framer-motion';
import { Scale, FileCheck, Landmark } from 'lucide-react';

export default function Legal() {
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
      <div className="text-center mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-6 shadow-[0_0_30px_rgba(255,255,255,0.03)]"
        >
          <Scale className="w-5 h-5 text-zinc-300" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
          Admissibilidade Legal
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Nossos laudos periciais são assinados e desenhados especificamente para instrução probatória em medidas extrajudiciais ou litígios judiciais no Brasil e exterior.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-5xl mx-auto">
        <div className="glass-panel-deep p-10 rounded-2xl border border-white/[0.04]">
          <FileCheck className="w-6 h-6 text-emerald-400 mb-6" />
          <h3 className="text-lg font-semibold text-white mb-3">Carimbo de Tempo & Hash</h3>
          <p className="text-[13px] text-zinc-400 leading-relaxed font-light">A integridade do documento é garantida através do algoritmo de espalhamento SHA-256 e de uma Timestamp Authority, confirmando a existência do artefato no momento exato da varredura, mitigando alegações de adulteração posterior pelas defesas.</p>
        </div>

        <div className="glass-panel-deep p-10 rounded-2xl border border-white/[0.04]">
          <Landmark className="w-6 h-6 text-zinc-300 mb-6" />
          <h3 className="text-lg font-semibold text-white mb-3">Takedowns e Notificações (Extrajudicial)</h3>
          <p className="text-[13px] text-zinc-400 leading-relaxed font-light">Emita laudos precisos contendo IP, Hash e percentual de detecção algorítmica para embasar notificações extrajudiciais diretas aos provedores (provedores de aplicação de internet, como prevê o Marco Civil da Internet), forçando a derrubada de conteúdo fraudulento sem a necessidade de judicialização prévia.</p>
        </div>
      </div>
    </motion.div>
  );
}
