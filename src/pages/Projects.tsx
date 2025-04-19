import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Selfbot Data Analytics',
      description: 'Uma ferramenta de análise de dados para selfbots do Discord, permitindo visualização e processamento de informações em tempo real.',
      tags: ['TypeScript', 'Discord API'],
      link: 'https://github.com/gethigheasy/selfbot-analytics'
    },
    {
      title: 'ToDo List',
      description: 'Uma aplicação de lista de tarefas moderna e responsiva, desenvolvida com React para gerenciamento eficiente de atividades diárias.',
      tags: ['React', 'JavaScript', 'CSS'],
      link: 'https://github.com/seu-usuario/todo-list'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Meus Projetos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-green-400">{project.title}</h3>
            <p className="text-green-100/80 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors duration-300"
            >
              Ver Projeto
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 