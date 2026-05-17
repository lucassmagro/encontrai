import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import UploadSection from '../components/UploadSection';
import ProcessingSection from '../components/ProcessingSection';
import DashboardSection from '../components/DashboardSection';
import PricingSection from '../components/PricingSection';
import DestroyedSection from '../components/DestroyedSection';

export default function Home() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location.state?.step || 'hero'); 
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSafeResult, setIsSafeResult] = useState(false);
  
  const handleStart = () => setCurrentStep('upload');
  
  const handleUpload = (imageFile, isCamera) => {
    setUploadedImage(imageFile);
    setIsSafeResult(isCamera);
    setCurrentStep('processing');
  };
  
  const handleProcessingComplete = () => {
    setCurrentStep('dashboard');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setIsSafeResult(false);
    setCurrentStep('destroyed');
  };

  const handleNewScan = () => {
    setCurrentStep('upload');
  };

  // Shared variants for page transitions to maintain "preserve scroll feeling" and smooth cross-fades
  const pageVariants = {
    initial: { opacity: 0, filter: "blur(12px)", scale: 0.98 },
    enter: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, filter: "blur(8px)", scale: 1.02, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <AnimatePresence mode="wait">
      {currentStep === 'hero' && (
        <motion.div key="hero" variants={pageVariants} initial="initial" animate="enter" exit="exit" className="flex-1 flex flex-col">
          <HeroSection onStart={handleStart} />
          <PricingSection onSelect={handleStart} />
        </motion.div>
      )}
      
      {currentStep === 'upload' && (
        <motion.div key="upload" variants={pageVariants} initial="initial" animate="enter" exit="exit" className="flex-1 flex flex-col">
          <UploadSection onUpload={handleUpload} />
        </motion.div>
      )}
      
      {currentStep === 'processing' && (
        <motion.div key="processing" variants={pageVariants} initial="initial" animate="enter" exit="exit" className="flex-1 flex flex-col">
          <ProcessingSection onComplete={handleProcessingComplete} imageFile={uploadedImage} />
        </motion.div>
      )}
      
      {currentStep === 'dashboard' && (
        <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="enter" exit="exit" className="flex-1 flex flex-col w-full">
          <DashboardSection onReset={handleReset} uploadedImage={uploadedImage} isSafe={isSafeResult} />
        </motion.div>
      )}

      {currentStep === 'destroyed' && (
        <motion.div key="destroyed" variants={pageVariants} initial="initial" animate="enter" exit="exit" className="flex-1 flex flex-col w-full">
          <DestroyedSection onNewScan={handleNewScan} onGoHome={() => setCurrentStep('hero')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
