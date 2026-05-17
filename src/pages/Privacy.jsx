import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, ServerOff } from 'lucide-react';

export default function Privacy() {
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
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="text-center mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
          Arquitetura Zero-Knowledge
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Sua matriz biométrica nunca toca um disco rígido persistente. Nossa plataforma foi concebida sob o paradigma estrito de "Privacy by Design".
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-5xl mx-auto">
        <div className="glass-panel-deep p-10 rounded-2xl border border-white/[0.04]">
          <ServerOff className="w-6 h-6 text-emerald-400 mb-6" />
          <h3 className="text-lg font-semibold text-white mb-3">Memória Volátil (RAM-Only)</h3>
          <p className="text-[13px] text-zinc-400 leading-relaxed font-light">
            Quando você faz o upload da imagem, ela é mantida exclusivamente na RAM de nossos nós computacionais. O algoritmo extrai os tensores faciais, executa a busca vetorial cruzada nas subredes, gera o relatório e encerra o processo, destruindo ativamente o contêiner de processamento.
          </p>
        </div>

        <div className="glass-panel-deep p-10 rounded-2xl border border-white/[0.04]">
          <EyeOff className="w-6 h-6 text-zinc-300 mb-6" />
          <h3 className="text-lg font-semibold text-white mb-3">Impossibilidade Reversa</h3>
          <p className="text-[13px] text-zinc-400 leading-relaxed font-light">
            Os hashes matemáticos extraídos da sua face para fins de monitoramento não podem ser revertidos. É fisicamente e matematicamente impossível reconstruir o seu rosto ou imagem base a partir do Hash vetorial armazenado em nossos logs de monitoramento contínuo.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
