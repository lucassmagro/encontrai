import { motion } from 'framer-motion';
import PricingSection from '../components/PricingSection';
import { useNavigate } from 'react-router-dom';

export default function Planos() {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col w-full pt-12"
    >
      <PricingSection onSelect={() => navigate('/cadastro')} />
    </motion.div>
  );
}
