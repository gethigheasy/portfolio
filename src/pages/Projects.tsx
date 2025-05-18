import React from 'react';

const Projects: React.FC = () => {
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
      link: 'https://github.com/gethigheasy/selfbot-data-checker'
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
      link: 'https://github.com/gethigheasy/todolist-react'
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
      link: 'https://github.com/Vordlex/makehasu'
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
      link: 'https://github.com/gethigheasy/makehasu-website'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg">Meus Projetos</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#23262b] border border-[#3a3f47] rounded-3xl p-14 shadow-2xl flex flex-col gap-8 min-h-[420px] justify-between transition-all duration-300 hover:scale-[1.03]"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>

            <p className="text-gray-300 mb-4 text-lg">{project.description}</p>

            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Recursos Principais:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Stack Tecnológica:</h4>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-4 py-1 bg-[#20232a] text-[#00ff87] rounded-full text-base font-semibold border border-[#363b42]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end items-center mt-8">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#20232a] hover:bg-[#23262b] text-white rounded-xl border border-[#363b42] font-bold text-lg transition-colors duration-300 shadow min-w-[220px] justify-center"
              >
                Ver no GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 