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
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] px-4 overflow-y-auto" style={{ zoom: 0.85 }}>
      {/* Seção Principal com Avatar e Status */}
      <div className="glass-card w-full max-w-4xl flex flex-col gap-4 py-4 px-6 md:px-8 animate-fadeInUp my-2">
        {/* Avatar e Nome */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff87] to-[#00cc6a] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow"></div>
            <div className="relative w-32 h-32 md:w-36 md:h-36">
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
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#00cc6a] tracking-tight mb-1 animate-scale-in">
              unknowndeath1997
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-gray-400 text-xs md:text-sm">{getStatusText(discordData?.discord_status || 'offline')}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 text-xs md:text-sm">Desenvolvedor Full Stack</span>
            </div>
          </div>
        </div>

        {/* Seção Sobre Mim */}
        <div className="w-full border-t border-[#1a1a1a] pt-4 mt-2">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 text-center">Sobre Mim</h2>
          <p className="text-gray-300 text-center text-sm md:text-base leading-relaxed mb-4 max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar soluções inovadoras e eficientes. 
            Especializado em desenvolvimento web moderno com foco em experiência do usuário e performance. 
            Trabalho principalmente com tecnologias JavaScript/TypeScript e tenho experiência significativa 
            com bots do Discord e aplicações web.
          </p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white mb-3 text-center">Habilidades</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#0a0a0a] text-[#00ff87] rounded-full text-xs font-semibold border border-[#1a1a1a] hover:border-[#00ff87] hover:shadow-lg hover:shadow-[#00ff87]/10 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Seção Spotify/Música */}
        <div className="w-full border-t border-[#1a1a1a] pt-4 mt-2">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 text-center font-mono">
            <span className="font-bold">Ouvindo</span> <span className="font-normal">Agora</span>
          </h2>
          {discordData?.spotify && discordData.spotify.song ? (
            <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-2xl mx-auto gap-4 p-4 bg-[#0a0a0a]/80 rounded-xl border border-[#1a1a1a] hover:border-[#00ff87]/30 transition-all duration-300 animate-slide-in-left">
              <div className="relative group">
                <img
                  src={discordData.spotify.album_art_url}
                  alt={discordData.spotify.album}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border-2 border-[#1a1a1a] shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[#00ff87]/15"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00ff87]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex-1 flex flex-col justify-center w-full md:w-auto text-center md:text-left">
                <div className="text-white font-extrabold text-lg md:text-xl truncate mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {discordData.spotify.song}
                </div>
                <div className="text-gray-300 text-sm md:text-base truncate font-semibold mb-1">
                  {discordData.spotify.artist}
                </div>
                <div className="text-gray-500 text-xs md:text-sm truncate mb-3">
                  {discordData.spotify.album}
                </div>
                <SpotifyProgressBar timestamps={discordData.spotify.timestamps} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8 opacity-70 animate-fadeInUp">
              <div className="w-16 h-16 mb-3 rounded-full bg-[#0a0a0a] flex items-center justify-center border-2 border-[#1a1a1a]">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-gray-400">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-2-7v-2a2 2 0 1 1 4 0v2m-6 0h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-gray-400 text-sm md:text-base font-medium text-center">
                Nenhuma música tocando no momento.<br/>
                <span className="text-gray-500 text-xs md:text-sm">Provavelmente está trabalhando ou descansando.</span>
              </span>
            </div>
          )}
          
          {/* Histórico de Músicas */}
          {history.length > 0 && (
            <div className="mt-4">
              <MusicHistory history={history} maxItems={5} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-xs mt-2 mb-2 tracking-wide animate-fadeIn">
        © 2025 Victor. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Home;
