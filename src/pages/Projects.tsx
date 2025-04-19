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
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Meus Projetos
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:transform hover:scale-[1.02] transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">{project.title}</h3>

            <p className="text-gray-300 mb-6">{project.description}</p>

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
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-white/5 text-white rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors duration-300"
            >
              Ver no GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 