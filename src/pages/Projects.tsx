import React, { useEffect, useRef, useState } from 'react';

const Projects: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            setVisibleCards((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const projects = [
    {
      title: 'Discord Selfbot Analytics',
      description: 'Uma ferramenta avançada de análise de dados para Discord, desenvolvida com TypeScript. Permite rastrear atividades de usuários, última mensagem enviada e status em chamadas de voz em tempo real.',
      longDescription: 'Este projeto demonstra integração avançada com a API do Discord e manipulação de dados em tempo real. Inclui recursos como rastreamento de status de voz, histórico de mensagens e análise de atividade do usuário.',
      tags: ['TypeScript', 'Discord API', 'Data Analysis'],
      features: [
        'Rastreamento de status em tempo real',
        'Análise de atividade do usuário',
        'Monitoramento de chamadas de voz',
        'Interface de linha de comando intuitiva'
      ],
      techStack: ['TypeScript', 'Node.js', 'Discord.js'],
      link: 'https://github.com/gethigheasy/selfbot-data-checker',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'React ToDo List',
      description: 'Uma aplicação moderna de lista de tarefas construída com React e TailwindCSS, oferecendo uma experiência de usuário fluida e responsiva.',
      longDescription: 'Aplicação web moderna que demonstra boas práticas de desenvolvimento React, incluindo gerenciamento de estado, componentes reutilizáveis e design responsivo.',
      tags: ['React', 'TailwindCSS', 'TypeScript'],
      features: [
        'Interface moderna e minimalista',
        'Persistência de dados local',
        'Design totalmente responsivo',
        'Animações suaves'
      ],
      techStack: ['React', 'TailwindCSS', 'TypeScript'],
      link: 'https://github.com/gethigheasy/todolist-react',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'makehasu',
      description: 'Um projeto open source de destaque, focado em automação, integração e utilidades para comunidades Discord. Repositório principal do bot makehasu.',
      longDescription: 'O makehasu é um bot de Discord robusto, com múltiplas funcionalidades para servidores, automação de tarefas, integração com APIs e comandos customizados.',
      tags: ['Discord', 'Bot', 'Open Source'],
      features: [
        'Automação de tarefas',
        'Comandos customizados',
        'Integração com múltiplas APIs',
        'Fácil de configurar e escalar'
      ],
      techStack: ['TypeScript', 'Node.js', 'Discord.js'],
      link: 'https://github.com/Vordlex/makehasu',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'makehasu-website',
      description: 'Website e painel de controle do bot makehasu, com dashboard para administração e estatísticas em tempo real.',
      longDescription: 'Sou desenvolvedor principal e contribuidor deste projeto, que é o painel web do bot makehasu. O bot está presente em dois servidores, totalizando quase 25 mil membros, e oferece administração, estatísticas e integração direta com o Discord.',
      tags: ['Discord', 'Bot', 'Painel', 'Dashboard'],
      features: [
        'Dashboard de administração',
        'Estatísticas em tempo real',
        'Gerenciamento de permissões',
        'Integração total com o Discord'
      ],
      techStack: ['TypeScript', 'React', 'Node.js', 'Discord.js'],
      link: 'https://github.com/gethigheasy/makehasu-website',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="text-center mb-16 animate-fadeInUp">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#00cc6a] drop-shadow-lg">
          Meus Projetos
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Uma seleção dos meus projetos favoritos e trabalhos recentes
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`group relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col gap-6 min-h-[500px] justify-between transition-all duration-500 hover:scale-[1.02] hover:border-[#00ff87]/30 ${
              visibleCards[index] ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-[-30px]'
            }`}
            style={{
              animationDelay: `${index * 0.1}s`,
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 20;
              const rotateY = (centerX - x) / 20;
              
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }}
          >
            {/* Efeito de brilho no hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ff87]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Gradiente de fundo sutil */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00ff87] group-hover:to-[#00cc6a] transition-all duration-300">
                {project.title}
              </h3>

              <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
                {project.description}
              </p>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 text-lg flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#00ff87] to-[#00cc6a] rounded-full"></span>
                  Recursos Principais:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, fIndex) => (
                    <li 
                      key={fIndex} 
                      className="flex items-center gap-2 text-gray-300 text-sm md:text-base group/item"
                    >
                      <span className="text-[#00ff87] text-lg font-bold group-hover/item:scale-125 transition-transform duration-200">✓</span>
                      <span className="group-hover/item:text-white transition-colors duration-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 text-lg flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#00ff87] to-[#00cc6a] rounded-full"></span>
                  Stack Tecnológica:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-4 py-2 bg-[#050505] text-[#00ff87] rounded-full text-sm font-semibold border border-[#1a1a1a] hover:border-[#00ff87] hover:bg-[#0a0a0a] hover:shadow-lg hover:shadow-[#00ff87]/10 transition-all duration-300 hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center mt-8 relative z-10">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-[#050505] hover:bg-gradient-to-r hover:from-[#00ff87] hover:to-[#00cc6a] text-white hover:text-[#000000] rounded-xl border border-[#1a1a1a] hover:border-transparent font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-[#00ff87]/20 min-w-[200px] justify-center transform hover:scale-105"
              >
                <span>Ver no GitHub</span>
                <svg 
                  className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
