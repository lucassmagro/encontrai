import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Platform from './pages/Platform';
import Privacy from './pages/Privacy';
import Planos from './pages/Planos';

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      {/* mode="wait" ensures the outgoing page finishes animating before the next starts */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Signup />} />
          <Route path="/plataforma" element={<Platform />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/planos" element={<Planos />} />
          
          {/* Catch-all for other static pages to just render Platform placeholder for now */}
          <Route path="/termos" element={<Platform title="Termos de Serviço" subtitle="Diretrizes de utilização da infraestrutura EncontrAI" />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
