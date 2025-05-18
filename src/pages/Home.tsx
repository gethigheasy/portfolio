import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DiscordData {
  discord_user: {
    avatar: string;
    avatar_decoration_data?: {
      asset: string;
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

// Barra de progresso do Spotify
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
    <div className="w-full mt-2">
      <div className="relative h-3 glass-progress overflow-hidden">
        <div
          className="absolute left-0 top-0 h-3 bg-[#00ff87] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
        <span>{msToMinSec(elapsed)}</span>
        <span>{msToMinSec(total)}</span>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const response = await axios.get('https://api.lanyard.rest/v1/users/936545483378290708');
        setDiscordData(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar dados do Discord:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordData();
    const interval = setInterval(fetchDiscordData, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-white';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getActivityImage = (activity: any): string | undefined => {
    if (!activity.assets?.large_image) return undefined;
    
    if (activity.assets.large_image.startsWith('mp:external/')) {
      const url = activity.assets.large_image.replace('mp:external/', '');
      return `https://media.discordapp.net/external/${url}`;
    }

    if (activity.name === 'Spotify' && activity.assets?.large_image) {
      const imageId = activity.assets.large_image.replace('spotify:', '');
      return `https://i.scdn.co/image/${imageId}`;
    }
    
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
  };

  const getSmallImage = (activity: any): string | undefined => {
    if (!activity.assets?.small_image) return undefined;
    
    if (activity.assets.small_image.startsWith('mp:external/')) {
      const url = activity.assets.small_image.replace('mp:external/', '');
      return `https://media.discordapp.net/external/${url}`;
    }
    
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#191b1f] px-2">
      <div className="glass-card w-full max-w-3xl flex flex-col gap-0 mt-36 mb-12 transition-all duration-300 animate-fadeInUp py-20">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="relative w-32 h-32 mb-4 drop-shadow-2xl">
            <img
              src={`https://cdn.discordapp.com/avatars/936545483378290708/${discordData?.discord_user.avatar ?? ''}${discordData?.discord_user.avatar && discordData?.discord_user.avatar.startsWith('a_') ? '.gif' : '.png'}`}
              alt="Avatar"
              className="w-full h-full rounded-full border-4 border-[#4a4f57] object-cover bg-[#23262b] shadow-2xl"
              style={{ boxShadow: '0 0 32px 0 #00ff87aa' }}
            />
            <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full ${getStatusColor(discordData?.discord_status || 'offline')} border-2 border-[#23262b]`}></div>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-100 text-center tracking-tight drop-shadow-xl mt-2">Victor</h1>
        </div>
        <div className="w-full border-t border-[#3a3f47] pt-10 flex flex-col items-center">
          {discordData?.activities && discordData.activities.length > 0 && discordData.activities.some(a => a.type !== 4 && ((a.name === 'Spotify' && discordData.spotify) || a.name !== 'Spotify')) ? (
            discordData.activities.map((activity, index) => (
              activity.type !== 4 && (
                activity.name === 'Spotify' && discordData.spotify ? (
                  <div key={index} className="flex items-center w-full max-w-2xl mx-auto gap-8 animate-fadeInUp">
                    <img
                      src={discordData.spotify.album_art_url}
                      alt={discordData.spotify.album}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-[#363b42] shadow-md"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-white font-extrabold text-2xl truncate mb-1">{discordData.spotify.song}</div>
                      <div className="text-gray-300 text-lg truncate font-semibold">{discordData.spotify.artist}</div>
                      <div className="text-gray-500 text-sm truncate mb-2">{discordData.spotify.album}</div>
                      <SpotifyProgressBar timestamps={discordData.spotify.timestamps} />
                    </div>
                  </div>
                ) : null
              )
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-12 opacity-70 animate-fadeInUp">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-4 text-gray-400"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-2-7v-2a2 2 0 1 1 4 0v2m-6 0h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-gray-400 text-lg font-medium">Nenhuma atividade no momento.<br/>Ele provavelmente está dormindo ou trabalhando.</span>
            </div>
          )}
        </div>
      </div>
      <footer className="text-center text-gray-500 text-base mb-8 tracking-wide">© 2025 Victor. Todos os direitos reservados.</footer>
    </div>
  );
};

export default Home; 