import React, { createContext, useContext, useRef, useCallback } from 'react';

interface AudioContextType {
  playBackgroundMusic: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBackgroundMusic = useCallback(async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/entrance.mp3');
        audioRef.current.loop = true; // Faz a música tocar em loop
      }
      
      await audioRef.current.play();
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  }, []);

  return (
    <AudioContext.Provider value={{ playBackgroundMusic }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio deve ser usado dentro de um AudioProvider');
  }
  return context;
}; 