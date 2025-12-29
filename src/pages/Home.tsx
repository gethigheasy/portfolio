import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useMusicHistory } from '../hooks/useMusicHistory';
import MusicHistory from '../components/MusicHistory';
import { sanitizeDiscordData, validateDiscordData } from '../utils/sanitize';

interface DiscordData {
  discord_user: {
    avatar: string;
    username?: string;
    avatar_decoration_data?: {
      asset: string;
      sku_id?: string;
    };
  };
  activities: Array<{
    name: string;
    type: number;
    details?: string;
    state?: string;
    application_id?: string;
    assets?: {
      large_image?: string;
      small_image?: string;
      large_text?: string;
      small_text?: string;
    };
  }>;
  discord_status: string;
  spotify?: {
    album: string;
    album_art_url: string;
    artist: string;
    song: string;
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
  };
}

// Barra de progresso do Spotify melhorada
const SpotifyProgressBar: React.FC<{ timestamps: { start: number; end: number } }> = ({ timestamps }) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const update = () => {
      const now = Date.now();
      const total = timestamps.end - timestamps.start;
      const elapsed = Math.min(now - timestamps.start, total);
      setProgress((elapsed / total) * 100);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timestamps]);

  const msToMinSec = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const total = timestamps.end - timestamps.start;
  const now = Date.now();
  const elapsed = Math.min(now - timestamps.start, total);

  return (
    <div className="w-full mt-3">
      <div className="relative h-2 glass-progress overflow-hidden rounded-full">
        <div
          className="absolute left-0 top-0 h-2 bg-gradient-to-r from-[#00ff87] to-[#00cc6a] rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
        <span>{msToMinSec(elapsed)}</span>
        <span>{msToMinSec(total)}</span>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null);
  const [loading, setLoading] = useState(true);
  const { history, addToHistory } = useMusicHistory();
  const previousTrackIdRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const response = await axios.get('https://api.lanyard.rest/v1/users/936545483378290708');
        const data = response.data.data;
        setDiscordData(data);
        
        // Detectar mudança de música e adicionar ao histórico
        if (data.spotify) {
          const currentTrackId = data.spotify.track_id;
          if (currentTrackId && currentTrackId !== previousTrackIdRef.current) {
            addToHistory({
              track_id: data.spotify.track_id,
              song: data.spotify.song,
              artist: data.spotify.artist,
              album: data.spotify.album,
              album_art_url: data.spotify.album_art_url
            });
            previousTrackIdRef.current = currentTrackId;
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Discord:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordData();
    const interval = setInterval(fetchDiscordData, 30000);

    return () => clearInterval(interval);
  }, [addToHistory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'idle':
        return 'Ausente';
      case 'dnd':
        return 'Ocupado';
      default:
        return 'Offline';
    }
  };

  const skills = [
    'TypeScript', 'React', 'Node.js', 'Discord.js', 
    'TailwindCSS', 'Python', 'Git', 'Linux'
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#000000] via-[#050505] to-[#000000] px-4 py-20">
      {/* Seção Principal com Avatar e Status */}
      <div className="glass-card w-full max-w-4xl flex flex-col gap-8 mt-20 mb-12 py-12 px-8 md:px-12 animate-fadeInUp">
        {/* Avatar e Nome */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff87] to-[#00cc6a] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow"></div>
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              {loading ? (
                <div className="w-full h-full rounded-full bg-[#0a0a0a] animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-[#00ff87] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <img
                    src={`https://cdn.discordapp.com/avatars/936545483378290708/${discordData?.discord_user.avatar ?? ''}${discordData?.discord_user.avatar && discordData?.discord_user.avatar.startsWith('a_') ? '.gif' : '.png'}`}
                    alt="Avatar"
                    className="w-full h-full rounded-full border-4 border-[#252525] object-cover bg-[#0a0a0a] shadow-2xl transition-transform duration-300 group-hover:scale-105 relative z-10"
                    style={{ boxShadow: '0 0 30px rgba(0, 255, 135, 0.2)' }}
                  />
                  {/* Moldura do Discord (Avatar Decoration) */}
                  {discordData?.discord_user.avatar_decoration_data?.asset && (
                    <img
                      src={`https://cdn.discordapp.com/avatar-decoration-presets/${discordData.discord_user.avatar_decoration_data.asset}.png`}
                      alt="Avatar Decoration"
                      className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
                      style={{ imageRendering: 'auto' }}
                    />
                  )}
                </>
              )}
              <div className={`absolute bottom-3 right-3 w-6 h-6 md:w-7 md:h-7 rounded-full ${getStatusColor(discordData?.discord_status || 'offline')} border-4 border-[#0a0a0a] shadow-lg animate-pulse-slow z-30`}></div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#00cc6a] tracking-tight mb-2 animate-scale-in">
              unknowndeath1997
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-gray-400 text-sm md:text-base">{getStatusText(discordData?.discord_status || 'offline')}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 text-sm md:text-base">Desenvolvedor Full Stack</span>
            </div>
          </div>
        </div>

        {/* Seção Sobre Mim */}
        <div className="w-full border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">Sobre Mim</h2>
          <p className="text-gray-300 text-center text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar soluções inovadoras e eficientes. 
            Especializado em desenvolvimento web moderno com foco em experiência do usuário e performance. 
            Trabalho principalmente com tecnologias JavaScript/TypeScript e tenho experiência significativa 
            com bots do Discord e aplicações web.
          </p>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Habilidades</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#0a0a0a] text-[#00ff87] rounded-full text-sm font-semibold border border-[#1a1a1a] hover:border-[#00ff87] hover:shadow-lg hover:shadow-[#00ff87]/10 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Seção Spotify/Música */}
        <div className="w-full border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">Ouvindo Agora</h2>
          {discordData?.spotify ? (
            <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-2xl mx-auto gap-6 p-6 bg-[#0a0a0a]/80 rounded-2xl border border-[#1a1a1a] hover:border-[#00ff87]/30 transition-all duration-300 animate-slide-in-left">
              <div className="relative group">
                <img
                  src={discordData.spotify.album_art_url}
                  alt={discordData.spotify.album}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-2 border-[#1a1a1a] shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[#00ff87]/15"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00ff87]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex-1 flex flex-col justify-center w-full md:w-auto text-center md:text-left">
                <div className="text-white font-extrabold text-xl md:text-2xl truncate mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {discordData.spotify.song}
                </div>
                <div className="text-gray-300 text-base md:text-lg truncate font-semibold mb-1">
                  {discordData.spotify.artist}
                </div>
                <div className="text-gray-500 text-sm md:text-base truncate mb-4">
                  {discordData.spotify.album}
                </div>
                <SpotifyProgressBar timestamps={discordData.spotify.timestamps} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-12 opacity-70 animate-fadeInUp">
              <div className="w-20 h-20 mb-4 rounded-full bg-[#0a0a0a] flex items-center justify-center border-2 border-[#1a1a1a]">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="text-gray-400">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-2-7v-2a2 2 0 1 1 4 0v2m-6 0h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-gray-400 text-base md:text-lg font-medium text-center">
                Nenhuma música tocando no momento.<br/>
                <span className="text-gray-500 text-sm md:text-base">Provavelmente está trabalhando ou descansando.</span>
              </span>
            </div>
          )}
          
          {/* Histórico de Músicas */}
          {history.length > 0 && (
            <MusicHistory history={history} maxItems={10} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm md:text-base mb-8 tracking-wide animate-fadeIn">
        © 2025 Victor. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Home;
