import { useState, useRef } from 'react';
import { UploadCloud, Shield, CheckCircle2, AlertCircle, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadSection({ onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const [pendingIsCamera, setPendingIsCamera] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    setError('');
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setPendingImage(imageUrl);
    setPendingIsCamera(false);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const startCamera = async () => {
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Câmera não suportada neste navegador (requer HTTPS ou localhost).');
      return;
    }

    setError('');
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      // Delay slightly to ensure videoRef is mounted by React
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 50);
    } catch (err) {
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      // Mirror the context so the saved image isn't flipped (since video is mirrored via css)
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      stopCamera();
      setPendingImage(dataUrl);
      setPendingIsCamera(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Verificação Biométrica Inicial</h2>
          <p className="text-zinc-400 font-light text-sm max-w-md mx-auto leading-relaxed">
            Forneça a matriz primária (foto frontal nítida) para inicializar o mapeamento global de vetores.
          </p>
        </div>

        {/* Upload Card */}
        <div className="glass-panel-deep p-8 md:p-12 rounded-3xl relative overflow-hidden">
          
          {pendingImage ? (
            <div className="flex flex-col items-center w-full">
              <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-white/10 mb-8 shadow-2xl">
                <img src={pendingImage} alt="Matriz capturada" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                   <Shield className="w-4 h-4 text-cyan-400" />
                   <span className="text-[10px] font-mono uppercase text-white tracking-widest">Aguardando Autorização</span>
                </div>
              </div>

              <div className="w-full text-left mb-8 border-t border-white/[0.03] pt-6">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-cyan-950/10 border border-cyan-900/20 mb-6">
                  <Shield className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[13px] font-semibold text-cyan-100 tracking-tight">Privacidade Forense Garantida</h4>
                    <p className="text-[11px] text-cyan-200/60 mt-1.5 leading-relaxed font-light">
                      A extração dos vetores é realizada em memória volátil (RAM). Não armazenamos a imagem base em nenhum disco persistente.
                    </p>
                  </div>
                </div>

                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={consentGiven}
                      onChange={(e) => {
                        setConsentGiven(e.target.checked);
                        if (e.target.checked) setError('');
                      }}
                    />
                    <div className="w-5 h-5 border border-zinc-600 rounded peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-colors group-hover:border-zinc-400 flex items-center justify-center bg-black/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed select-none font-light">
                    Declaro ser o titular desta imagem e autorizo expressamente o processamento volátil para fins exclusivos de busca ativa e instrução probatória.
                  </span>
                </label>
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => {
                    setPendingImage(null);
                    setConsentGiven(false);
                    setError('');
                  }} 
                  className="flex-1 py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-sm border border-white/10"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    if (!consentGiven) {
                      setError('A autorização legal para processamento temporário é obrigatória.');
                      return;
                    }
                    onUpload(pendingImage, pendingIsCamera);
                  }} 
                  className="flex-1 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)] text-sm flex items-center justify-center gap-2"
                >
                  Confirmar e Processar
                </button>
              </div>
            </div>
          ) : cameraActive ? (
            <div className="relative rounded-2xl border border-cyan-500/30 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
              <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" />
              {/* Overlays to make it look forensic */}
              <div className="absolute inset-0 pointer-events-none box-border border-[8px] border-black/20" />
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between w-full opacity-50">
                   <div className="w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
                   <div className="w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
                </div>
                <div className="flex justify-between w-full opacity-50">
                   <div className="w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
                   <div className="w-8 h-8 border-b-2 border-r-2 border-cyan-400" />
                </div>
              </div>

              <canvas ref={canvasRef} className="hidden" />
              
              <div className="absolute bottom-6 flex gap-4 z-10">
                <button onClick={stopCamera} className="px-5 py-2.5 bg-black/60 text-white font-medium rounded-lg hover:bg-black/80 backdrop-blur border border-white/10 transition-colors text-sm">
                  Cancelar
                </button>
                <button onClick={capturePhoto} className="px-6 py-2.5 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 text-sm">
                  <Camera className="w-4 h-4" /> Capturar Matriz
                </button>
              </div>
            </div>
          ) : (
            <div 
              className={`relative rounded-2xl border transition-all duration-500 flex flex-col items-center justify-center py-20 px-6 text-center
                ${dragActive ? 'border-cyan-500/50 bg-cyan-500/[0.03] shadow-[0_0_40px_rgba(6,182,212,0.1)]' : 'border-white/[0.04] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                ref={inputRef} type="file" className="hidden" accept="image/jpeg, image/png, image/webp" 
                onChange={handleChange} 
              />
              
              <div className={`w-16 h-16 mb-6 rounded-full flex items-center justify-center relative transition-colors duration-500 ${dragActive ? 'bg-cyan-500/10' : 'bg-white/[0.03]'}`}>
                <UploadCloud className={`w-8 h-8 transition-colors duration-500 ${dragActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">Arraste a matriz biométrica aqui</h3>
              <p className="text-xs text-zinc-500 mb-8 font-light">ou escolha uma opção abaixo</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onButtonClick}
                  className="px-6 py-3 bg-[#fafafa] text-zinc-900 font-medium rounded-xl hover:bg-white transition-colors text-sm shadow-xl flex items-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" /> Selecionar Arquivo
                </button>
                <button 
                  onClick={startCamera}
                  className="px-6 py-3 bg-white/[0.03] text-white font-medium rounded-xl border border-white/[0.05] hover:bg-white/[0.06] transition-colors text-sm flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-zinc-400" /> Usar Câmera
                </button>
              </div>
              
              <div className="mt-10 flex gap-4 text-[10px] font-mono tracking-widest uppercase text-zinc-600">
                <span>JPG/PNG/WEBP</span>
                <span>•</span>
                <span>Max 5MB</span>
              </div>
            </div>
          )}

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="flex items-center gap-2 text-rose-400 text-xs overflow-hidden">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
