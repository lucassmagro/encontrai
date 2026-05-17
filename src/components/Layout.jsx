import { LockKeyhole, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const FaceShieldLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Contorno de rosto estilizado (cyborg/forensic feel) */}
    <path d="M6 10c0-4.5 2.5-8 6-8s6 3.5 6 8c0 3-1.5 5.5-3 7v2c0 1-1 2-3 2s-3-1-3-2v-2c-1.5-1.5-3-4-3-7z" />
    
    {/* Escudo interno com xadrez */}
    <g clipPath="url(#shield-clip)">
      <rect x="7" y="9" width="5" height="5" fill="currentColor" stroke="none" />
      <rect x="12" y="14" width="5" height="5" fill="currentColor" stroke="none" />
    </g>
    
    {/* Contorno do escudo */}
    <path d="M12 9l-3 1.5v3c0 2 1.5 3.5 3 5c1.5-1.5 3-3 3-5v-3L12 9z" />
    
    <defs>
      <clipPath id="shield-clip">
        <path d="M12 9l-3 1.5v3c0 2 1.5 3.5 3 5c1.5-1.5 3-3 3-5v-3L12 9z" />
      </clipPath>
    </defs>
  </svg>
);

export default function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro';
  const isAuth = sessionStorage.getItem('encontrai_auth') === 'true';

  const handleLogout = () => {
    sessionStorage.removeItem('encontrai_auth');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[var(--color-background)]">
      {/* Ambient background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/[0.02] blur-[100px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <header className="w-full border-b border-white/[0.02] bg-black/10 backdrop-blur-xl z-40 relative sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-105">
              <FaceShieldLogo className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl tracking-tighter text-zinc-300">Encontr<span className="font-bold text-white tracking-normal">AI</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/plataforma" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors">Plataforma</Link>
            <Link to="/juridico" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors">Uso Jurídico</Link>
            <Link to="/privacidade" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors">Privacidade Zero-Knowledge</Link>
            <Link to="/planos" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors">Planos</Link>
          </nav>
          
          <div className="flex items-center gap-6">
            {!isAuthPage && !isAuth && (
              <>
                <Link to="/login" className="hidden sm:block text-[13px] font-medium text-zinc-400 hover:text-white transition-colors">
                  Acessar Portal
                </Link>
                <Link to="/cadastro" className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-lg hover:bg-zinc-200 transition-all overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  Criar Conta
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
            {!isAuthPage && isAuth && (
              <div className="flex items-center gap-4">
                <span className="text-[13px] font-medium text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Bem-vindo!
                </span>
                <button onClick={handleLogout} className="text-[12px] text-zinc-500 hover:text-rose-400 transition-colors">
                  Sair
                </button>
              </div>
            )}
            {isAuthPage && (
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10">
                  <LockKeyhole className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">E2E Encrypted</span>
               </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-10 border-t border-white/[0.02] relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-zinc-500 text-[13px]">
            <FaceShieldLogo className="w-4 h-4" />
            <span>&copy; {new Date().getFullYear()} EncontrAI Forensics. Proteção de Identidade Digital.</span>
          </div>
          <div className="flex gap-8 text-[13px] text-zinc-500 font-medium">
            <Link to="/termos" className="hover:text-zinc-300 transition-colors">Termos de Serviço</Link>
            <Link to="/privacidade" className="hover:text-zinc-300 transition-colors">Política de Retenção Zero</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
