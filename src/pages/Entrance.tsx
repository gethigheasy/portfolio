import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from '../components/Typewriter';
import { useAudio } from '../contexts/AudioContext';

const Entrance: React.FC = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { playBackgroundMusic } = useAudio();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnter = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    try {
      await playBackgroundMusic();
      document.body.classList.add('fade-out');
      
      setTimeout(() => {
        navigate('/portfolio', { replace: true });
        requestAnimationFrame(() => {
          document.body.classList.remove('fade-out');
        });
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      navigate('/portfolio', { replace: true });
    }
  };

  // Partículas animadas
  const particles = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-[#00ff87] rounded-full opacity-20 animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  ));

  return (
    <div 
      onClick={handleEnter}
      className="fixed inset-0 bg-gradient-to-br from-[#000000] via-[#050505] to-[#000000] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
    >
      {/* Efeito de gradiente que segue o mouse */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 135, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Partículas de fundo */}
      {particles}

      {/* Grid de fundo animado */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 135, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 135, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gradient-shift 20s ease infinite'
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Texto principal com efeito de brilho */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#00ff87] to-[#00cc6a] opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative text-6xl md:text-8xl lg:text-9xl font-black">
            <div className="transform hover:scale-110 transition-transform duration-500 mb-4">
              <Typewriter text="ENTER" delay={80} />
            </div>
            <div className="transform hover:scale-110 transition-transform duration-500">
              <Typewriter text="HELL" delay={80} />
            </div>
          </div>
        </div>

        {/* Indicador de clique */}
        <div className="mt-12 flex flex-col items-center gap-4 animate-pulse-slow">
          <div className="text-gray-400 text-sm md:text-base font-semibold tracking-wider uppercase">
            Clique para entrar
          </div>
          <div className="w-12 h-12 border-2 border-[#00ff87] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-[#00ff87] rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Linhas decorativas */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff87] to-transparent opacity-50 transform -translate-y-1/2"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#00ff87] to-transparent opacity-50 transform -translate-x-1/2"></div>
      </div>

      {/* Efeito de brilho pulsante nos cantos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00ff87] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00cc6a] opacity-10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default Entrance;
