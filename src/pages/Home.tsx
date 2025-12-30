import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useMusicHistory } from '../hooks/useMusicHistory';
import MusicHistory from '../components/MusicHistory';

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
    <div className="w-full mt-1.5">
      <div className="relative h-1 glass-progress overflow-hidden rounded-full">
        <div
          className="absolute left-0 top-0 h-1 bg-gradient-to-r from-[#00ff87] to-[#00cc6a] rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-0.5 font-mono">
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
        
        // Verificar se há dados do Spotify diretamente ou nas activities
        let spotifyData = data.spotify;
        if (!spotifyData && data.activities) {
          const spotifyActivity = data.activities.find((activity: any) => 
            activity.name === 'Spotify' || activity.application_id === '463097721130188830'
          );
          if (spotifyActivity) {
            // Converter activity para formato spotify
            spotifyData = {
              album: spotifyActivity.assets?.large_text || spotifyActivity.details || '',
              album_art_url: spotifyActivity.assets?.large_image 
                ? `https://i.scdn.co/image/${spotifyActivity.assets.large_image.replace('spotify:', '')}`
                : '',
              artist: spotifyActivity.state || '',
              song: spotifyActivity.details || '',
              track_id: spotifyActivity.sync_id || '',
              timestamps: spotifyActivity.timestamps || { start: Date.now(), end: Date.now() + 180000 }
            };
          }
        }
        
        // Atualizar dados com spotify processado
        const updatedData = { ...data, spotify: spotifyData };
        setDiscordData(updatedData);
        
        // Detectar mudança de música e adicionar ao histórico
        if (spotifyData && spotifyData.track_id) {
          const currentTrackId = spotifyData.track_id;
          if (currentTrackId && currentTrackId !== previousTrackIdRef.current) {
            addToHistory({
              track_id: spotifyData.track_id,
              song: spotifyData.song,
              artist: spotifyData.artist,
              album: spotifyData.album,
              album_art_url: spotifyData.album_art_url
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
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] px-4 overflow-y-auto">
      {/* Seção Principal com Avatar e Status */}
      <div className="glass-card w-full max-w-4xl flex flex-col gap-2 py-2 px-4 md:px-5 animate-fadeInUp my-1">
        {/* Avatar e Nome */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff87] to-[#00cc6a] rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity animate-pulse-slow"></div>
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              {loading ? (
                <div className="w-full h-full rounded-full bg-[#0a0a0a] animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 border-3 border-[#00ff87] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <img
                    src={`https://cdn.discordapp.com/avatars/936545483378290708/${discordData?.discord_user.avatar ?? ''}${discordData?.discord_user.avatar && discordData?.discord_user.avatar.startsWith('a_') ? '.gif' : '.png'}`}
                    alt="Avatar"
                    className="w-full h-full rounded-full border-3 border-[#252525] object-cover bg-[#0a0a0a] shadow-2xl transition-transform duration-300 group-hover:scale-105 relative z-10"
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
              <div className={`absolute bottom-2 right-2 w-5 h-5 md:w-6 md:h-6 rounded-full ${getStatusColor(discordData?.discord_status || 'offline')} border-3 border-[#0a0a0a] shadow-lg animate-pulse-slow z-30`}></div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#00cc6a] tracking-tight mb-0 animate-scale-in">
              unknowndeath1997
            </h1>
            <div className="flex items-center justify-center gap-1 mt-0">
              <span className="text-gray-400 text-[10px] md:text-xs">{getStatusText(discordData?.discord_status || 'offline')}</span>
              <span className="text-gray-600 text-[10px]">•</span>
              <span className="text-gray-400 text-[10px] md:text-xs">Desenvolvedor Full Stack</span>
            </div>
          </div>
        </div>

        {/* Seção Sobre Mim */}
        <div className="w-full border-t border-[#1a1a1a] pt-2 mt-1">
          <h2 className="text-base md:text-lg font-bold text-white mb-1 text-center">Sobre Mim</h2>
          <p className="text-gray-300 text-center text-[11px] md:text-xs leading-relaxed mb-2 max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar soluções inovadoras e eficientes. 
            Especializado em desenvolvimento web moderno com foco em experiência do usuário e performance. 
            Trabalho principalmente com tecnologias JavaScript/TypeScript e tenho experiência significativa 
            com bots do Discord e aplicações web.
          </p>
          
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-white mb-1 text-center">Habilidades</h3>
            <div className="flex flex-wrap justify-center gap-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-[#0a0a0a] text-[#00ff87] rounded-full text-[10px] font-semibold border border-[#1a1a1a] hover:border-[#00ff87] hover:shadow-lg hover:shadow-[#00ff87]/10 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Seção Spotify/Música */}
        <div className="w-full border-t border-[#1a1a1a] pt-2 mt-1">
          <h2 className="text-sm md:text-base font-bold text-white mb-2 text-center font-mono">
            <span className="font-bold">Ouvindo</span> <span className="font-normal">Agora</span>
          </h2>
          {discordData?.spotify && discordData.spotify.song ? (
            <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-2xl mx-auto gap-2 p-2 bg-[#0a0a0a]/80 rounded-lg border border-[#1a1a1a] hover:border-[#00ff87]/30 transition-all duration-300 animate-slide-in-left">
              <div className="relative group">
                <img
                  src={discordData.spotify.album_art_url}
                  alt={discordData.spotify.album}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border-2 border-[#1a1a1a] shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[#00ff87]/15"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00ff87]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex-1 flex flex-col justify-center w-full md:w-auto text-center md:text-left">
                <div className="text-white font-extrabold text-sm md:text-base truncate mb-0.5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {discordData.spotify.song}
                </div>
                <div className="text-gray-300 text-[11px] md:text-xs truncate font-semibold mb-0.5">
                  {discordData.spotify.artist}
                </div>
                <div className="text-gray-500 text-[10px] md:text-[11px] truncate mb-1.5">
                  {discordData.spotify.album}
                </div>
                <SpotifyProgressBar timestamps={discordData.spotify.timestamps} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-4 opacity-70 animate-fadeInUp">
              <div className="w-12 h-12 mb-2 rounded-full bg-[#0a0a0a] flex items-center justify-center border-2 border-[#1a1a1a]">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-gray-400">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-2-7v-2a2 2 0 1 1 4 0v2m-6 0h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-gray-400 text-[11px] md:text-xs font-medium text-center">
                Nenhuma música tocando no momento.<br/>
                <span className="text-gray-500 text-[10px]">Provavelmente está trabalhando ou descansando.</span>
              </span>
            </div>
          )}
          
          {/* Histórico de Músicas */}
          {history.length > 0 && (
            <div className="mt-2">
              <MusicHistory history={history} maxItems={4} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-[10px] mt-0.5 mb-0.5 tracking-wide animate-fadeIn">
        © 2025 Victor. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Home;
