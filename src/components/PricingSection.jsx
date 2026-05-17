import { Check, ShieldAlert, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingSection({ onSelect }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-32 pt-10">
      <div className="text-center mb-16">
         <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Modelos de Proteção</h2>
         <p className="text-zinc-500 text-sm">Acesso avançado para proteção constante.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Single Use */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="glass-panel-deep p-8 rounded-2xl border border-white/[0.04] flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors"
        >
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">Auditoria Única</h3>
            <p className="text-sm text-zinc-500">Ideal para verificações pontuais de desconfiança ou uso jurídico isolado.</p>
          </div>
          <div className="mb-8">
            <div className="flex items-end gap-1">
              <span className="text-zinc-500 font-semibold mb-1">R$</span>
              <span className="text-5xl font-bold tracking-tighter text-white">39,90</span>
              <span className="text-zinc-500 font-medium mb-1">/uso</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-zinc-300">
               <Check className="w-4 h-4 text-cyan-500 shrink-0" /> Varredura Completa (128 pontos faciais)
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
               <Check className="w-4 h-4 text-cyan-500 shrink-0" /> Geração de Relatório em PDF
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
               <Check className="w-4 h-4 text-cyan-500 shrink-0" /> Assinatura Criptográfica SHA-256
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-500">
               <Check className="w-4 h-4 text-zinc-700 shrink-0" /> Sem monitoramento contínuo
            </li>
          </ul>
          <button onClick={onSelect} className="w-full py-3 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm">
            Adquirir Crédito Único
          </button>
        </motion.div>

        {/* Subscription */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel-deep p-8 rounded-2xl border border-cyan-500/30 flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
          
          <div className="mb-8">
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Monitoramento Contínuo</h3>
                  <p className="text-sm text-cyan-100/60">Proteção ativa 24/7 com alertas em tempo real de vazamentos sintéticos.</p>
               </div>
               <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-widest font-bold rounded">
                  Recomendado
               </span>
             </div>
          </div>
          <div className="mb-8">
            <div className="flex items-end gap-1">
              <span className="text-zinc-500 font-semibold mb-1">R$</span>
              <span className="text-5xl font-bold tracking-tighter text-white">49,90</span>
              <span className="text-zinc-500 font-medium mb-1">/mês</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-zinc-300">
               <Zap className="w-4 h-4 text-cyan-400 shrink-0" /> Monitoramento Diário Automático
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
               <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" /> Alertas em Tempo Real (Email/SMS)
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
               <Check className="w-4 h-4 text-cyan-400 shrink-0" /> Geração Ilimitada de Laudos PDF
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-300">
               <Check className="w-4 h-4 text-cyan-400 shrink-0" /> Descarte de Retenção Dinâmico
            </li>
          </ul>
          <button onClick={onSelect} className="w-full py-3 rounded-lg bg-[#fafafa] text-black font-semibold hover:bg-white transition-colors text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Assinar Monitoramento
          </button>
        </motion.div>

      </div>
    </div>
  );
}
