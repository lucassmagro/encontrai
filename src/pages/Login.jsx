import { motion } from 'framer-motion';
import { ArrowRight, Fingerprint, LockKeyhole } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    sessionStorage.setItem('encontrai_auth', 'true');
    navigate('/', { state: { step: 'upload' } });
  };
  const pageVariants = {
    initial: { opacity: 0, filter: "blur(12px)", scale: 0.98 },
    enter: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, filter: "blur(8px)", scale: 1.02, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div 
      variants={pageVariants} initial="initial" animate="enter" exit="exit"
      className="flex-1 flex flex-col justify-center items-center px-6 py-20 relative w-full min-h-[80vh]"
    >
      {/* Subtle atmospheric backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-6 shadow-[0_0_30px_rgba(255,255,255,0.03)]">
            <LockKeyhole className="w-5 h-5 text-zinc-300" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Acesso Restrito</h1>
          <p className="text-zinc-500 text-[13px] font-medium tracking-wide">Autenticação em Ambiente Seguro</p>
        </div>

        <div className="glass-panel-deep p-8 md:p-10 rounded-2xl border border-white/[0.04]">
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">Email Institucional ou Pessoal</label>
              <input 
                type="email" 
                placeholder="nome@empresa.com"
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">Chave de Acesso</label>
                <Link to="#" className="text-[11px] text-zinc-500 hover:text-white transition-colors">Esqueceu a chave?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
              />
            </div>

            <button type="submit" className="group relative w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 mt-2 bg-[#fafafa] text-zinc-900 text-[13px] font-semibold rounded-lg hover:bg-white transition-all overflow-hidden premium-shadow">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              Autenticar Sessão
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.03] flex items-start gap-3">
            <Fingerprint className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-[11px] font-semibold text-zinc-300 uppercase tracking-widest">Protected Session</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">Conexão end-to-end com ofuscação de tensores.</p>
            </div>
          </div>
        </div>

        <p className="text-center text-[12px] text-zinc-500 mt-8">
          Não possui credenciais? <Link to="/cadastro" className="text-white hover:underline underline-offset-4">Solicite acesso</Link>
        </p>
      </div>
    </motion.div>
  );
}
