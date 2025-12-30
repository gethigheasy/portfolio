import React, { useState, useEffect, useRef } from 'react';

const Relationship: React.FC = () => {
  const startDate = new Date('2025-09-28T00:00:00');
  const imageRef = useRef<HTMLDivElement>(null);
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    months: 0,
    years: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30.44); // Média de dias por mês
      const years = Math.floor(months / 12);

      setTimeTogether({
        years: years,
        months: months % 12,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Proteções contra download
  useEffect(() => {
    const preventDownload = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const preventDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    const preventSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const preventKeyDown = (e: KeyboardEvent) => {
      // Bloquear F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'S' || e.key === 's'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    const imageContainer = imageRef.current;
    if (imageContainer) {
      // Prevenir menu de contexto (clique direito)
      imageContainer.addEventListener('contextmenu', preventContextMenu);
      
      // Prevenir drag and drop
      imageContainer.addEventListener('dragstart', preventDragStart);
      imageContainer.addEventListener('selectstart', preventSelectStart);
      
      // Prevenir seleção
      imageContainer.style.userSelect = 'none';
      (imageContainer.style as any).webkitUserSelect = 'none';
      (imageContainer.style as any).MozUserSelect = 'none';
      (imageContainer.style as any).msUserSelect = 'none';
      
      // Prevenir download via eventos
      imageContainer.addEventListener('copy', preventDownload);
      imageContainer.addEventListener('cut', preventDownload);
    }

    // Bloquear teclas de atalho
    document.addEventListener('keydown', preventKeyDown);

    return () => {
      if (imageContainer) {
        imageContainer.removeEventListener('contextmenu', preventContextMenu);
        imageContainer.removeEventListener('dragstart', preventDragStart);
        imageContainer.removeEventListener('selectstart', preventSelectStart);
        imageContainer.removeEventListener('copy', preventDownload);
        imageContainer.removeEventListener('cut', preventDownload);
      }
      document.removeEventListener('keydown', preventKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <div className="glass-card p-8 md:p-12 border border-[#2a2a2a] animate-fadeInUp">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-mono font-normal text-white mb-4 tracking-wider">
              NÓS
            </h2>
            <p className="text-gray-400 text-sm font-mono mb-2">
              Desde 28/09/2025
            </p>
          </div>

          {/* Foto da namorada com proteções */}
          <div className="flex justify-center mb-8">
            <div 
              ref={imageRef}
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden border border-[#2a2a2a] select-none"
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none' as any,
                MozUserSelect: 'none' as any,
                msUserSelect: 'none' as any,
                pointerEvents: 'auto',
                position: 'relative'
              } as React.CSSProperties}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              {/* Overlay transparente para dificultar acesso direto */}
              <div 
                className="absolute inset-0 z-10 cursor-not-allowed"
                style={{
                  background: 'transparent',
                  pointerEvents: 'auto'
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              
              {/* Imagem com proteções CSS */}
              <img
                src="/girlfriend.jpg"
                alt="Minha namorada"
                className="w-full h-full object-cover pointer-events-none select-none"
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none' as any,
                  WebkitUserDrag: 'none' as any,
                  MozUserSelect: 'none' as any,
                  msUserSelect: 'none' as any,
                  pointerEvents: 'none',
                  imageRendering: 'auto',
                } as React.CSSProperties}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                onError={(e) => {
                  // Fallback se a imagem não carregar
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231a1a1a" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="monospace" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E%3C/text%3E%3C/svg%3E';
                }}
              />
              
              {/* Camada adicional de proteção visual */}
              <div 
                className="absolute inset-0 z-20"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, transparent 100%)',
                  pointerEvents: 'auto',
                  cursor: 'not-allowed'
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Contador de tempo */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {timeTogether.years > 0 && (
              <div className="text-center p-4 bg-[#111111] border border-[#2a2a2a] rounded">
                <div className="text-3xl md:text-4xl font-mono text-white mb-1">
                  {timeTogether.years}
                </div>
                <div className="text-xs text-gray-400 font-mono uppercase">
                  {timeTogether.years === 1 ? 'Ano' : 'Anos'}
                </div>
              </div>
            )}
            <div className="text-center p-4 bg-[#111111] border border-[#2a2a2a] rounded">
              <div className="text-3xl md:text-4xl font-mono text-white mb-1">
                {timeTogether.months}
              </div>
              <div className="text-xs text-gray-400 font-mono uppercase">
                {timeTogether.months === 1 ? 'Mês' : 'Meses'}
              </div>
            </div>
            <div className="text-center p-4 bg-[#111111] border border-[#2a2a2a] rounded">
              <div className="text-3xl md:text-4xl font-mono text-white mb-1">
                {timeTogether.days}
              </div>
              <div className="text-xs text-gray-400 font-mono uppercase">
                {timeTogether.days === 1 ? 'Dia' : 'Dias'}
              </div>
            </div>
            <div className="text-center p-4 bg-[#111111] border border-[#2a2a2a] rounded">
              <div className="text-2xl md:text-3xl font-mono text-white mb-1">
                {String(timeTogether.hours).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 font-mono uppercase">
                Horas
              </div>
            </div>
            <div className="text-center p-4 bg-[#111111] border border-[#2a2a2a] rounded">
              <div className="text-2xl md:text-3xl font-mono text-white mb-1">
                {String(timeTogether.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 font-mono uppercase">
                Minutos
              </div>
            </div>
            <div className="text-center p-4 bg-[#111111] border border-[#2a2a2a] rounded">
              <div className="text-2xl md:text-3xl font-mono text-white mb-1">
                {String(timeTogether.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 font-mono uppercase">
                Segundos
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm font-mono">
              E contando...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relationship;

