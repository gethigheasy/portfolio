import React from 'react';
import { MusicHistoryItem } from '../hooks/useMusicHistory';

interface MusicHistoryProps {
  history: MusicHistoryItem[];
  maxItems?: number;
}

const MusicHistory: React.FC<MusicHistoryProps> = ({ history, maxItems = 10 }) => {
  const displayHistory = history.slice(0, maxItems);

  if (displayHistory.length === 0) {
    return null;
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="w-full mt-4">
      <h3 className="text-lg md:text-xl font-bold text-white mb-3 text-center">
        Histórico Recente
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
        {displayHistory.map((item, index) => (
          <div
            key={`${item.track_id}-${item.timestamp}`}
            className="group relative bg-[#0a0a0a]/80 rounded-xl border border-[#1a1a1a] p-3 hover:border-[#00ff87]/30 transition-all duration-300 hover:scale-105 animate-slide-in-left"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="relative aspect-square mb-2 rounded-lg overflow-hidden">
              <img
                src={item.album_art_url}
                alt={item.album}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="space-y-1">
              <p className="text-white text-sm font-semibold truncate" title={item.song}>
                {item.song}
              </p>
              <p className="text-gray-400 text-xs truncate" title={item.artist}>
                {item.artist}
              </p>
              <p className="text-gray-500 text-xs truncate" title={item.album}>
                {item.album}
              </p>
              <p className="text-gray-600 text-xs mt-1">
                {formatTime(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicHistory;

