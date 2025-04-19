import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from '../components/Typewriter';
import { useAudio } from '../contexts/AudioContext';

const Entrance: React.FC = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const { playBackgroundMusic } = useAudio();

  const handleEnter = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    try {
      // Inicia o áudio que continuará tocando
      await playBackgroundMusic();
      
      // Inicia o fade out
      document.body.classList.add('fade-out');
      
      // Aguarda a animação de fade out e então navega
      setTimeout(() => {
        navigate('/portfolio', { replace: true });
        
        // Remove a classe fade-out após a navegação
        requestAnimationFrame(() => {
          document.body.classList.remove('fade-out');
        });
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      // Em caso de erro, ainda navega
      navigate('/portfolio', { replace: true });
    }
  };

  return (
    <div 
      onClick={handleEnter}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer transition-opacity duration-1000"
    >
      <div className="text-6xl md:text-8xl transform hover:scale-110 transition-transform duration-300 mb-4">
        <Typewriter text="ENTER" delay={100} />
      </div>
      <div className="text-6xl md:text-8xl transform hover:scale-110 transition-transform duration-300">
        <Typewriter text="HELL" delay={100} />
      </div>
    </div>
  );
};

export default Entrance; 