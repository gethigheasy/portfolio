import { useRef, useEffect, useState } from 'react';

export const useAudio = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = 'auto';

    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    audio.addEventListener('error', (e) => {
      console.error('Erro ao carregar áudio:', e);
    });

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, [src]);

  const play = async () => {
    try {
      if (audioRef.current && isLoaded) {
        audioRef.current.currentTime = 0; // Garante que o áudio comece do início
        await audioRef.current.play();
      } else {
        console.warn('Áudio ainda não está carregado ou referência não existe');
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  };

  return { play, isLoaded };
}; 