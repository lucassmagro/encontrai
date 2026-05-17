import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Download, AlertTriangle, EyeOff, Activity, Fingerprint, LockKeyhole, FileSignature, Info, Server, Search, ArrowRight, Trash2, ChevronDown, ChevronUp, Link as LinkIcon, AlertCircle } from 'lucide-react';

export default function DashboardSection({ onReset, uploadedImage, isSafe }) {
  const [showSafeState, setShowSafeState] = useState(isSafe || false);
  const [riskScore] = useState(() => Math.floor(Math.random() * (98 - 85 + 1)) + 85);
  const [safeScore] = useState(() => Math.floor(Math.random() * (12 - 2 + 1)) + 2);
  const [sim1] = useState(() => (Math.random() * (99.9 - 95.0) + 95.0).toFixed(1));
  const [sim2] = useState(() => (Math.random() * (95.0 - 85.0) + 85.0).toFixed(1));
  const [showPdfMockup, setShowPdfMockup] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (id) => {
    if (expandedItem === id) setExpandedItem(null);
    else setExpandedItem(id);
  };

  useEffect(() => {
    // Cinematic delay for the dashboard reveal
    const t = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(t);
  }, []);

  const riskColor = showSafeState ? "text-emerald-400" : "text-rose-500";
  const riskBg = showSafeState ? "bg-emerald-500" : "bg-rose-500";

  // Animation variants
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
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative min-h-[80vh] flex flex-col justify-center">
      
      {/* Dev Toggle */}
      <div className="absolute top-4 right-6 flex gap-2 z-50">
         <button onClick={() => setShowSafeState(!showSafeState)} className="text-[9px] uppercase font-mono px-2 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-zinc-500 transition-colors">
            Toggle Mode: {showSafeState ? 'SAFE' : 'THREAT'}
         </button>
      </div>

      <AnimatePresence>
        {!revealed && (
          <motion.div 
            key="pre-reveal"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-t-2 border-white/20 border-r-2 animate-spin" />
              <p className="text-sm font-mono tracking-widest text-zinc-500 uppercase">Consolidando Matriz de Risco</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {revealed && (
        <motion.div 
          variants={containerVars} initial="hidden" animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Header Row */}
          <motion.div variants={itemVars} className="lg:col-span-12 flex items-end justify-between border-b border-white/[0.04] pb-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Intelligence Center</h1>
              <p className="text-sm text-zinc-500 font-medium">Relatório Técnico Pericial de Identidade Digital</p>
            </div>
            <div className="text-right font-mono text-[10px] text-zinc-600 uppercase tracking-widest hidden md:block">
              <p>ID_SESSÃO: 0x{Math.random().toString(16).substring(2, 10).toUpperCase()}</p>
              <p>NODE: LATAM-S1 / STATUS: ATIVO</p>
            </div>
          </motion.div>

          {/* Left Column (Asymmetric Bloomberg feel) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Main Risk Panel */}
            <motion.div variants={itemVars} className="glass-panel-deep rounded-2xl p-8 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-96 h-96 ${riskBg} opacity-[0.03] blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000`} />
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                
                {/* Cinematic Score Reveal */}
                <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <motion.circle 
                      initial={{ strokeDasharray: "0 300" }}
                      animate={{ strokeDasharray: `${showSafeState ? '5' : '260'} 300` }}
                      transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                      cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" 
                      strokeLinecap="round"
                      className={`${riskColor}`} 
                    />
                  </svg>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <span className={`text-6xl font-semibold tracking-tighter ${riskColor} ${showSafeState ? '' : 'text-danger-glow'}`}>
                      {showSafeState ? safeScore.toString().padStart(2, '0') : riskScore}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mt-2">Nível de Risco</span>
                  </motion.div>
                </div>

                <div className="flex-1 pt-2 text-center md:text-left">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-5"
                  >
                    <Activity className={`w-3.5 h-3.5 ${riskColor}`} />
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${riskColor}`}>
                      {showSafeState ? 'Classificação: Seguro' : 'Classificação: Risco Crítico'}
                    </span>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold tracking-tight text-white mb-3 leading-tight">
                    {showSafeState ? 'Sua identidade está preservada.' : 'Violação de Imagem Detectada.'}
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-sm max-w-lg mb-6">
                    {showSafeState 
                      ? 'Nossos algoritmos forenses realizaram varreduras em 42 bancos de dados de IA generativa, redes sociais e fóruns indexados. Não foram encontradas instâncias de adulteração ou deepfakes contendo sua biometria facial.'
                      : `Nossa inteligência artificial detectou anomalias sintéticas utilizando sua biometria facial. As evidências cruzaram o limiar forense e estão prontas para instrução jurídica.`}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Occurrences or Safe State */}
            <motion.div variants={itemVars} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <Search className="w-4 h-4 text-zinc-500" />
                  Matriz de Ocorrências
                </h3>
              </div>

              {showSafeState ? (
                <div className="glass-panel p-10 rounded-xl border border-white/[0.03] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-2">Nenhum Artefato Sintético</h4>
                  <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                    Mantenha a tranquilidade. Seus vetores faciais não possuem correspondência com os modelos de IA monitorados. Recomendamos configurar varreduras preventivas mensais.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Item 1 */}
                  <div 
                    onClick={() => toggleExpand(1)}
                    className="glass-panel p-4 rounded-xl border border-white/[0.03] flex flex-col transition-colors cursor-pointer group hover:border-white/10"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                      <div className="relative w-24 h-24 rounded bg-zinc-900 overflow-hidden shrink-0 border border-white/5">
                        <div 
                          className="absolute inset-0 bg-cover bg-center blur-md opacity-60 group-hover:blur-sm transition-all duration-500" 
                          style={{ backgroundImage: `url(${uploadedImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'})` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center"><EyeOff className="w-5 h-5 text-white/40" /></div>
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-base font-semibold text-white truncate">Artefato de Vídeo Generativo</h4>
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[9px] font-mono uppercase border border-rose-500/20 shrink-0">Deepfake</span>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500 mb-3 grid grid-cols-2 gap-y-1">
                          <div>ORIGEM: Rede X (Twitter)</div>
                          <div>SIMILARIDADE: {sim1}%</div>
                          <div>HASH_ID: A9F2...C410</div>
                          <div>ALGORITMO IA: 99.9% (SimSwap)</div>
                        </div>
                      </div>
                      <div className="sm:pl-4 sm:border-l border-white/5 flex items-center justify-center">
                        {expandedItem === 1 ? <ChevronUp className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" /> : <ChevronDown className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedItem === 1 && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/[0.04] grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-black/20 rounded border border-white/[0.02]">
                              <h5 className="text-[10px] text-zinc-500 font-mono mb-2 flex items-center gap-2"><AlertCircle className="w-3 h-3 text-rose-400"/> ANÁLISE DE ADULTERAÇÃO</h5>
                              <p className="text-xs text-zinc-300 leading-relaxed">Sincronização labial forçada detectada na faixa de frames 00:12 a 00:28. A análise de ruído digital indica injeção de GAN (Generative Adversarial Network) focada na metade inferior da face.</p>
                            </div>
                            <div className="p-3 bg-black/20 rounded border border-white/[0.02] flex flex-col justify-between">
                              <div>
                                <h5 className="text-[10px] text-zinc-500 font-mono mb-2 flex items-center gap-2"><LinkIcon className="w-3 h-3 text-cyan-400"/> ORIGEM LOCALIZADA</h5>
                                <p className="text-xs text-zinc-300 truncate">https://x.com/status/921831823... [Ocultado]</p>
                              </div>
                              <button className="mt-3 text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-white py-1.5 px-3 rounded inline-flex items-center w-max gap-1 transition-colors">
                                <FileSignature className="w-3 h-3" /> Gerar Notificação (Takedown)
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Item 2 */}
                  <div 
                    onClick={() => toggleExpand(2)}
                    className="glass-panel p-4 rounded-xl border border-white/[0.03] flex flex-col transition-colors cursor-pointer group hover:border-white/10"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                      <div className="relative w-24 h-24 rounded bg-zinc-900 overflow-hidden shrink-0 border border-white/5">
                        <div 
                          className="absolute inset-0 bg-cover bg-center blur-md opacity-60 group-hover:blur-sm transition-all duration-500"
                          style={{ backgroundImage: `url(${uploadedImage || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'})` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center"><EyeOff className="w-5 h-5 text-white/40" /></div>
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-base font-semibold text-white truncate">Perfil Sintético Mimetizado</h4>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-mono uppercase border border-amber-500/20 shrink-0">Fake Profile</span>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500 mb-3 grid grid-cols-2 gap-y-1">
                          <div>ORIGEM: Fórum Aberto</div>
                          <div>SIMILARIDADE: {sim2}%</div>
                          <div>HASH_ID: B7A1...E992</div>
                          <div>ALGORITMO IA: 94.1% (Midjourney/SD)</div>
                        </div>
                      </div>
                      <div className="sm:pl-4 sm:border-l border-white/5 flex items-center justify-center">
                        {expandedItem === 2 ? <ChevronUp className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" /> : <ChevronDown className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedItem === 2 && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/[0.04] grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-black/20 rounded border border-white/[0.02]">
                              <h5 className="text-[10px] text-zinc-500 font-mono mb-2 flex items-center gap-2"><AlertCircle className="w-3 h-3 text-amber-400"/> ANÁLISE DE ADULTERAÇÃO</h5>
                              <p className="text-xs text-zinc-300 leading-relaxed">Imagem base completamente gerada por difusão (Stable Diffusion v1.5). Prompt injetado para mimetizar estrutura óssea craniofacial em 95.2% de precisão para fraude de identidade.</p>
                            </div>
                            <div className="p-3 bg-black/20 rounded border border-white/[0.02] flex flex-col justify-between">
                              <div>
                                <h5 className="text-[10px] text-zinc-500 font-mono mb-2 flex items-center gap-2"><LinkIcon className="w-3 h-3 text-cyan-400"/> ORIGEM LOCALIZADA</h5>
                                <p className="text-xs text-zinc-300 truncate">https://forum... [Ocultado]</p>
                              </div>
                              <button className="mt-3 text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-white py-1.5 px-3 rounded inline-flex items-center w-max gap-1 transition-colors">
                                <FileSignature className="w-3 h-3" /> Gerar Notificação (Takedown)
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Forensic Side Panel */}
          <motion.div variants={itemVars} className="lg:col-span-4 flex flex-col gap-6 h-full">
            
            {/* Export Card */}
            {!showSafeState && (
              <div className="glass-panel-deep p-6 rounded-2xl border border-white/[0.05]">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FileSignature className="w-4 h-4" />
                  Custódia Legal
                </h3>
                <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                  Este laudo é selado com assinatura criptográfica assimétrica. O relatório PDF contém carimbo de tempo válido (Timestamp Authority) para instrução probatória em medidas extrajudiciais ou litígios judiciais.
                </p>
                <button 
                  onClick={() => setShowPdfMockup(true)}
                  className="w-full relative group inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  Gerar Laudo Forense PDF
                </button>
              </div>
            )}

            {/* Privacy & System Integrity */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.02] bg-white/[0.01]">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-5">Integridade do Sistema</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Server className="w-4 h-4 text-zinc-600 mt-0.5" />
                  <div>
                    <h4 className="text-[13px] font-medium text-white">Processamento Efêmero</h4>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">Arquitetura RAM-only. Dados residuais nulos após término da sessão.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <LockKeyhole className="w-4 h-4 text-zinc-600 mt-0.5" />
                  <div>
                    <h4 className="text-[13px] font-medium text-white">Criptografia Ponta-a-Ponta</h4>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">Transmissão segura. Nenhum humano possui acesso aos tensores extraídos.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto border-t border-white/[0.03]">
              <button onClick={onReset} className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-rose-500/10 text-rose-500 font-semibold rounded-xl border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all duration-300">
                <Trash2 className="w-4 h-4" />
                Destruir Sessão e Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* PDF Mockup Modal Overlay */}
      <AnimatePresence>
        {showPdfMockup && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 overflow-hidden"
          >
            <motion.div 
              initial={{ scale: 0.98, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-[850px] h-[90vh] bg-[#f8f9fa] text-zinc-900 rounded shadow-[0_0_80px_rgba(255,255,255,0.05)] relative flex flex-col"
            >
              <div className="absolute top-4 right-4 z-50">
                <button onClick={() => setShowPdfMockup(false)} className="w-8 h-8 flex items-center justify-center bg-black/5 rounded hover:bg-black/10 transition-colors">
                  <span className="text-xl leading-none -mt-0.5">&times;</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto print-container">
                {/* PDF Page Container (A4 aspect ratio approximate logic) */}
                <div className="bg-white min-h-[1100px] w-full mx-auto relative shadow-sm">
                  
                  {/* Official Watermark */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] z-0 overflow-hidden">
                    <ShieldCheck className="w-[800px] h-[800px] text-black transform -rotate-12" />
                  </div>

                  <div className="relative z-10 px-16 py-20 flex flex-col h-full">
                    
                    {/* Header */}
                    <div className="border-b-2 border-black pb-8 mb-10 flex justify-between items-end">
                      <div>
                        <h1 className="text-4xl font-bold tracking-tighter text-black uppercase">Laudo Técnico Pericial</h1>
                        <p className="text-sm text-zinc-500 font-mono mt-2 tracking-widest">Nº ENCONTRAI-BR-8921-X / {new Date().getFullYear()}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <ShieldCheck className="w-12 h-12 text-black mb-2" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">EncontrAI Intelligence</span>
                      </div>
                    </div>
                    
                    {/* Meta Data Table */}
                    <div className="mb-12 font-mono text-[10px] leading-relaxed text-zinc-800 grid grid-cols-2 bg-zinc-50 border border-zinc-300">
                      <div className="p-4 border-r border-b border-zinc-300">
                        <strong className="text-black uppercase tracking-widest block mb-1">Carimbo de Tempo (UTC)</strong>
                        {new Date().toUTCString()}
                      </div>
                      <div className="p-4 border-b border-zinc-300">
                        <strong className="text-black uppercase tracking-widest block mb-1">Metodologia / Motor IA</strong>
                        CNN-V2.4 / Reverse Image Tracking
                      </div>
                      <div className="col-span-2 p-4 bg-zinc-100 border-b border-zinc-300">
                        <strong className="text-black uppercase tracking-widest block mb-1">Hash de Integridade da Matriz (SHA-256)</strong>
                        <span className="text-xs">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
                      </div>
                      <div className="col-span-2 p-4 text-rose-700 bg-rose-50">
                        <strong className="text-rose-900 uppercase tracking-widest block mb-1">Classificação de Risco (Severidade)</strong>
                        NÍVEL 4 (CRÍTICO) - Constatação de material sintético difamatório e manipulação biométrica.
                      </div>
                    </div>

                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-zinc-200 pb-2">1. Objeto da Perícia e Escopo</h2>
                    <p className="text-xs text-zinc-800 leading-loose mb-10 text-justify">
                      O presente laudo documenta a constatação técnica e materialização de evidências digitais referentes à extração de características biométricas faciais. O escopo abrange a detecção automatizada de conteúdos sintéticos, adulterações mediante inteligência artificial (Deepfakes) e criações não autorizadas de perfis digitais em plataformas de terceiros. A cadeia de custódia foi preservada mediante criptografia assimétrica de ponta-a-ponta, operando estritamente em ambiente de memória volátil (RAM).
                    </p>

                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-zinc-200 pb-2">2. Cadeia de Custódia e Constatações Técnicas</h2>
                    <div className="space-y-6 mb-10">
                      
                      {/* Evidence Block */}
                      <div className="p-6 border border-zinc-300 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="font-bold text-sm tracking-tight">Evidência Material #01 - Vídeo Manipulado (Deepfake)</h3>
                          <span className="px-3 py-1 bg-black text-white text-[9px] uppercase tracking-widest font-bold">Violação Identificada</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          <div className="col-span-1">
                            <div className="w-full aspect-square bg-zinc-200 border border-zinc-300 relative">
                              <div 
                                className="absolute inset-0 bg-cover bg-center blur-sm" 
                                style={{ backgroundImage: `url(${uploadedImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'})` }}
                              />
                              <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur text-white text-[8px] font-mono text-center py-1">MATRIZ ORIGEM</div>
                            </div>
                          </div>
                          <div className="col-span-1 flex items-center justify-center">
                            <ArrowRight className="text-zinc-300 w-8 h-8" />
                          </div>
                          <div className="col-span-1">
                            <div className="w-full aspect-square bg-zinc-200 border border-zinc-300 relative">
                              <div 
                                className="absolute inset-0 bg-cover bg-center filter grayscale blur-[2px]" 
                                style={{ backgroundImage: `url(${uploadedImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'})` }}
                              />
                              <div className="absolute bottom-0 w-full bg-rose-600/80 backdrop-blur text-white text-[8px] font-mono text-center py-1">VETOR ADULTERADO</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 pt-4">
                          <p className="text-[10px] text-zinc-700 font-mono"><strong>URL LOCALIZADA:</strong> https://x.com/status/921... [OCULTADO]</p>
                          <p className="text-[10px] text-zinc-700 font-mono"><strong>IP RESOLVIDO:</strong> 104.244.42.1</p>
                          <p className="text-[10px] text-zinc-700 font-mono"><strong>CONF. INTELIGÊNCIA ARTIFICIAL:</strong> 99.9%</p>
                          <p className="text-[10px] text-zinc-700 font-mono"><strong>SIMILARIDADE FACIAL:</strong> 98.4%</p>
                          <p className="text-[10px] text-zinc-700 font-mono col-span-2"><strong>ARTEFATO DETECTADO:</strong> Alteração de matriz labial (Wav2Lip) e transferência de face total (SimSwap / GANs).</p>
                        </div>
                      </div>

                    </div>

                    <div className="mt-auto pt-12 flex justify-between items-end border-t-2 border-black">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 border-2 border-black flex items-center justify-center p-1 relative">
                           {/* Simulate QR Code */}
                           <div className="w-full h-full bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[size:10px_10px] bg-[position:0_0,5px_5px] opacity-80" />
                           <div className="absolute inset-2 bg-white flex items-center justify-center border-2 border-black">
                             <ShieldCheck className="w-6 h-6" />
                           </div>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-800 leading-relaxed">
                          <strong>DOCUMENTO ASSINADO DIGITALMENTE</strong><br/>
                          Autoridade Certificadora ICP-Brasil<br/>
                          Chave Pública: 0x89A...2F1<br/>
                          Integridade validada por carimbo de tempo.<br/>
                          <span className="text-cyan-700 font-bold mt-1 inline-block">VERIFICÁVEL VIA QR CODE</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="w-56 border-b border-black mb-3 inline-block"></div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black">Perito Digital Automatizado</p>
                        <p className="text-[9px] text-zinc-500 font-mono mt-1">SISTEMA ENCONTRAI FORENSICS</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              
              <div className="bg-white border-t border-zinc-200 p-4 flex justify-between items-center rounded-b shrink-0">
                <span className="text-xs font-mono text-zinc-500">Página 1 de 1</span>
                <div className="flex gap-3">
                  <button onClick={() => setShowPdfMockup(false)} className="px-6 py-2 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded hover:bg-zinc-200 transition-colors">Cancelar</button>
                  <button onClick={() => window.print()} className="px-6 py-2 bg-black text-white text-xs font-semibold rounded shadow-lg hover:bg-zinc-800 transition-colors flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" /> Baixar PDF Original
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
