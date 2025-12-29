import { useState, useEffect, useCallback } from 'react';

export interface MusicHistoryItem {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamp: number;
}

const STORAGE_KEY = 'discord_music_history';
const MAX_HISTORY_ITEMS = 20;

export const useMusicHistory = () => {
  const [history, setHistory] = useState<MusicHistoryItem[]>([]);
  const [lastTrackId, setLastTrackId] = useState<string | null>(null);

  // Carregar histórico do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
          // Definir último track_id se houver histórico
          if (parsed.length > 0) {
            setLastTrackId(parsed[0].track_id);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar histórico de músicas:', error);
    }
  }, []);

  // Salvar música no histórico
  const addToHistory = useCallback((music: {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
  }) => {
    // Validar dados antes de salvar
    if (!music.track_id || !music.song || !music.artist) {
      return;
    }

    // Verificar se é a mesma música (não adicionar duplicatas consecutivas)
    if (lastTrackId === music.track_id) {
      return;
    }

    try {
      const newItem: MusicHistoryItem = {
        ...music,
        timestamp: Date.now()
      };

      setHistory((prev) => {
        // Remover duplicatas baseadas em track_id
        const filtered = prev.filter(item => item.track_id !== music.track_id);
        // Adicionar novo item no início
        const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
        
        // Salvar no localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        
        return updated;
      });

      setLastTrackId(music.track_id);
    } catch (error) {
      console.error('Erro ao salvar música no histórico:', error);
    }
  }, [lastTrackId]);

  // Limpar histórico
  const clearHistory = useCallback(() => {
    setHistory([]);
    setLastTrackId(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    history,
    addToHistory,
    clearHistory
  };
};

