/**
 * Utilitários de sanitização e validação de dados
 */

// Validar URL de imagem
export const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    const allowedDomains = [
      'cdn.discordapp.com',
      'media.discordapp.net',
      'i.scdn.co',
      'avatar-decoration-presets'
    ];
    
    const hostname = urlObj.hostname;
    const isAllowed = allowedDomains.some(domain => hostname.includes(domain));
    
    // Verificar se é HTTPS
    if (urlObj.protocol !== 'https:') return false;
    
    return isAllowed;
  } catch {
    return false;
  }
};

// Sanitizar string (remover caracteres perigosos)
export const sanitizeString = (str: string | undefined | null): string => {
  if (!str || typeof str !== 'string') return '';
  
  // Remover tags HTML
  const div = document.createElement('div');
  div.textContent = str;
  const sanitized = div.textContent || div.innerText || '';
  
  // Limitar tamanho para prevenir DoS
  return sanitized.slice(0, 1000);
};

// Validar estrutura de dados do Spotify
export const validateSpotifyData = (spotify: any): boolean => {
  if (!spotify || typeof spotify !== 'object') return false;
  
  const requiredFields = ['track_id', 'song', 'artist', 'album', 'album_art_url', 'timestamps'];
  const hasAllFields = requiredFields.every(field => field in spotify);
  
  if (!hasAllFields) return false;
  
  // Validar tipos
  if (typeof spotify.track_id !== 'string' || spotify.track_id.length > 100) return false;
  if (typeof spotify.song !== 'string' || spotify.song.length > 200) return false;
  if (typeof spotify.artist !== 'string' || spotify.artist.length > 200) return false;
  if (typeof spotify.album !== 'string' || spotify.album.length > 200) return false;
  if (!isValidImageUrl(spotify.album_art_url)) return false;
  
  // Validar timestamps
  if (!spotify.timestamps || typeof spotify.timestamps !== 'object') return false;
  if (typeof spotify.timestamps.start !== 'number' || typeof spotify.timestamps.end !== 'number') return false;
  if (spotify.timestamps.start >= spotify.timestamps.end) return false;
  
  return true;
};

// Validar estrutura de dados do Discord
export const validateDiscordData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  // Validar discord_user
  if (!data.discord_user || typeof data.discord_user !== 'object') return false;
  if (typeof data.discord_user.avatar !== 'string') return false;
  
  // Validar avatar_decoration_data se existir
  if (data.discord_user.avatar_decoration_data) {
    if (typeof data.discord_user.avatar_decoration_data !== 'object') return false;
    if (typeof data.discord_user.avatar_decoration_data.asset !== 'string') return false;
  }
  
  // Validar status
  const validStatuses = ['online', 'idle', 'dnd', 'offline'];
  if (!validStatuses.includes(data.discord_status)) return false;
  
  // Validar activities se existir
  if (data.activities && !Array.isArray(data.activities)) return false;
  
  // Validar spotify se existir
  if (data.spotify && !validateSpotifyData(data.spotify)) return false;
  
  return true;
};

// Sanitizar dados do Discord antes de usar
export const sanitizeDiscordData = (data: any): any => {
  if (!validateDiscordData(data)) {
    throw new Error('Dados do Discord inválidos');
  }
  
  const sanitized = { ...data };
  
  // Sanitizar strings
  if (sanitized.discord_user.username) {
    sanitized.discord_user.username = sanitizeString(sanitized.discord_user.username);
  }
  
  // Sanitizar dados do Spotify se existir
  if (sanitized.spotify) {
    sanitized.spotify = {
      ...sanitized.spotify,
      song: sanitizeString(sanitized.spotify.song),
      artist: sanitizeString(sanitized.spotify.artist),
      album: sanitizeString(sanitized.spotify.album)
    };
  }
  
  return sanitized;
};

