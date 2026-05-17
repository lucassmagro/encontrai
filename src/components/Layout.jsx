import { LockKeyhole, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const FaceShieldLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 8H8v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 8h1v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 16H8v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 16h1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14c1.33 1 2.67 1 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-105">
              <FaceShieldLogo className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl tracking-tighter text-zinc-300">Encontr<span className="font-bold text-white tracking-normal">AI</span></span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/plataforma" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors">Plataforma</Link>
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
            <span>&copy; {new Date().getFullYear()} EncontrAI. Proteção de Identidade Digital.</span>
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
