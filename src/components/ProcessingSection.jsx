import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace, Lock, Server, Fingerprint, Activity, Network, CheckCircle } from 'lucide-react';

const generateHash = () => Math.random().toString(16).substring(2, 10).toUpperCase();

export default function ProcessingSection({ onComplete, imageFile }) {
  const [activeLogs, setActiveLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  // Dynamic logs generation to ensure varying IDs and timestamps per run
  const getLogs = () => [
    { id: 1, text: `Iniciando sessão isolada [E2E]... Node: LATAM-S1`, delay: 500, icon: Lock },
    { id: 2, text: `Extraindo topologia facial. HASH: ${generateHash()}`, delay: 1800, icon: ScanFace },
    { id: 3, text: `Mapeando grafos de conexão (OSINT / WebCrawler-9)`, delay: 3500, icon: Network },
    { id: 4, text: `Executando modelo CNN contra artefatos sintéticos. Tensor_ID: 0x${generateHash()}`, delay: 5200, icon: Server },
    { id: 5, text: `Classificando anomalias. Threshold: >98.0%...`, delay: 7000, icon: Activity },
    { id: 6, text: `Consolidando cadeia de custódia (SHA-256)`, delay: 8800, icon: Fingerprint },
    { id: 7, text: `Instrução pericial concluída com sucesso.`, delay: 10000, icon: CheckCircle, highlight: true }
  ];

  useEffect(() => {
    let timers = [];
    const LOGS = getLogs();
    
    // Smooth, organic progress bar
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Less linear, physical inertia feel
        const step = Math.random() * 8 + 1;
        return Math.min(p + step, 100);
      });
    }, 500);

    // Staggered log revelation
    LOGS.forEach((log) => {
      const timer = setTimeout(() => {
        setActiveLogs(prev => [...prev, log]);
        
        if (log.id === LOGS.length) {
          setProgress(100);
          setTimeout(() => {
            onComplete();
          }, 1800); // Wait after completion to let user digest
        }
      }, log.delay);
      timers.push(timer);
    });

    return () => {
      clearInterval(progressInterval);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative min-h-[70vh]">
      
      {/* Background Depth Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,255,255,0.01)_0%,transparent_100%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10"
      >
        {/* Left: Cinematic Scanner */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-[100px] mix-blend-screen" />
          
          <div className="relative w-[280px] h-[360px] rounded-2xl overflow-hidden glass-panel-deep">
            {imageFile ? (
              <motion.img 
                initial={{ filter: "contrast(1) saturate(1) brightness(1)" }}
                animate={{ filter: "contrast(1.3) saturate(0.2) brightness(0.8)" }}
                transition={{ duration: 2 }}
                src={imageFile} alt="Target" className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-950/80">
                <ScanFace className="w-16 h-16 text-zinc-800" />
              </div>
            )}
            
            {/* Cinematic Scanning Overlay */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[1px] bg-cyan-400/80 shadow-[0_0_24px_4px_rgba(6,182,212,0.9)]"
              animate={{ y: [0, 360, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Grid Overlay on Image */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mix-blend-overlay" />
            
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/20" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/20" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/20" />
          </div>
        </div>

        {/* Right: Technical Terminal Logs & Progress */}
        <div className="flex flex-col h-full justify-center">
          <div className="mb-10">
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Motor Forense Ativo</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Mapeando vetores biométricos contra as principais redes e modelos sintéticos globais.</p>
          </div>
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between text-[10px] font-mono tracking-widest uppercase mb-3">
              <span className="text-cyan-400">Status Operacional: {progress < 100 ? 'Processando' : 'Completo'}</span>
              <span className="text-zinc-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "circOut", duration: 0.3 }}
              />
            </div>
          </div>

          {/* Terminal Window */}
          <div className="glass-panel-deep p-6 rounded-xl h-72 overflow-hidden relative flex flex-col justify-end border border-white/[0.04]">
            <div className="absolute top-0 left-0 w-full h-10 bg-white/[0.02] flex items-center px-5 border-b border-white/[0.02] backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors" />
              </div>
              <span className="ml-5 text-[9px] font-mono tracking-widest text-zinc-600 uppercase">Process.Log</span>
            </div>
            
            <div className="space-y-3 font-mono text-[11px] overflow-hidden mt-8 pb-2">
              <AnimatePresence>
                {activeLogs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-zinc-600 shrink-0 select-none">[{new Date().toISOString().split('T')[1].slice(0, 12)}]</span>
                    <log.icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${log.highlight ? 'text-emerald-400' : 'text-cyan-600/70'}`} />
                    <span className={`${log.highlight ? 'text-emerald-400 font-semibold' : 'text-zinc-400'} leading-relaxed`}>{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {progress < 100 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-3.5 bg-zinc-500/50 ml-[88px] mt-1"
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
