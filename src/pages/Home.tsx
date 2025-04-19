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
  }>;
  discord_status: string;
}

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
        return 'bg-green-500';
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

    if (activity.name === 'Spotify' && activity.spotify?.album_art_url) {
      return activity.spotify.album_art_url;
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
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-accent rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      ) : (
        <>
          {discordData && (
            <div className="flex flex-col items-center space-y-8 max-w-2xl w-full">
              <div className="relative group">
                <div className="relative w-32 h-32">
                  <img
                    src={`https://cdn.discordapp.com/avatars/936545483378290708/${discordData.discord_user.avatar}.png`}
                    alt="Avatar"
                    className="w-full h-full rounded-full transition-transform duration-300 group-hover:scale-110"
                  />
                  {discordData.discord_user.avatar_decoration_data && (
                    <img
                      src={`https://cdn.discordapp.com/avatar-decoration-presets/${discordData.discord_user.avatar_decoration_data.asset}.png`}
                      alt="Decoration"
                      className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-110"
                      style={{ mixBlendMode: 'normal' }}
                    />
                  )}
                  <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${getStatusColor(discordData.discord_status)} border-2 border-primary`}></div>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
                Victor
              </h1>
              
              {discordData.activities && discordData.activities.length > 0 && (
                <div className="bg-secondary p-6 rounded-xl w-full max-w-md space-y-4 transform transition-all duration-300 hover:scale-105">
                  {discordData.activities.map((activity, index) => (
                    activity.type !== 4 && (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          {activity.assets?.large_image && (
                            <img
                              src={getActivityImage(activity)}
                              alt={activity.assets.large_text || activity.name}
                              className="w-8 h-8 rounded"
                            />
                          )}
                          <p className="text-accent font-medium">{activity.name}</p>
                        </div>
                        {activity.details && (
                          <p className="text-gray-300">{activity.details}</p>
                        )}
                        {activity.state && (
                          <p className="text-gray-400">{activity.state}</p>
                        )}
                        {activity.name === 'Spotify' && activity.spotify && (
                          <>
                            <p className="text-gray-300">{activity.spotify.song}</p>
                            <p className="text-gray-400">{activity.spotify.artist}</p>
                            <p className="text-gray-400 text-sm">{activity.spotify.album}</p>
                          </>
                        )}
                        {activity.assets?.small_image && (
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <img
                              src={getSmallImage(activity)}
                              alt={activity.assets.small_text || ''}
                              className="w-4 h-4 rounded"
                            />
                            <span>{activity.assets.small_text}</span>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home; 