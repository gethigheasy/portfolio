import React from 'react';

interface Language {
  name: string;
  icon: string;
  level: number; // 0-100
  description: string;
  color: string;
}

const Languages: React.FC = () => {
  const languages: Language[] = [
    {
      name: 'Python',
      icon: '🐍',
      level: 85,
      description: 'Desenvolvimento backend, automação e scripts',
      color: '#3776ab'
    },
    {
      name: 'TypeScript',
      icon: '📘',
      level: 90,
      description: 'Desenvolvimento web full-stack e aplicações modernas',
      color: '#3178c6'
    },
    {
      name: 'C++',
      icon: '⚙️',
      level: 75,
      description: 'Programação de sistemas e performance crítica',
      color: '#00599c'
    },
    {
      name: 'C#',
      icon: '💜',
      level: 80,
      description: 'Desenvolvimento .NET e aplicações desktop',
      color: '#239120'
    }
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 overflow-y-auto">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8 md:mb-12 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-mono font-normal text-white mb-4 tracking-wider">
            LINGUAGENS
          </h2>
          <p className="text-gray-400 text-sm font-mono">
            Tecnologias que domino
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languages.map((lang, index) => (
            <div
              key={index}
              className="glass-card p-6 border border-[#2a2a2a] hover:border-[#333333] transition-all duration-300 animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lang.icon}</span>
                  <div>
                    <h3 className="text-xl font-mono font-normal text-white">
                      {lang.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      {lang.description}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-mono text-gray-500">
                  {lang.level}%
                </span>
              </div>

              {/* Barra de progresso */}
              <div className="relative h-2 bg-[#111111] border border-[#2a2a2a] rounded-sm overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full transition-all duration-1000"
                  style={{
                    width: `${lang.level}%`,
                    backgroundColor: lang.color,
                    boxShadow: `0 0 8px ${lang.color}40`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;

