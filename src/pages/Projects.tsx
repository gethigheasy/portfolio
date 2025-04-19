import React from 'react';

const Projects: React.FC = () => {
  return (
    <div className="min-h-[80vh] py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Meus Projetos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-secondary p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Selfbot Data Analytics</h2>
          <p className="text-gray-300 mb-4">Uma ferramenta de análise de dados para selfbots do Discord, permitindo visualização e processamento de informações em tempo real.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">TypeScript</span>
            <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Data Analysis</span>
          </div>
          <a 
            href="https://github.com/gethigheasy/selfbot-data-checker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 transition-colors"
          >
            Ver no GitHub →
          </a>
        </div>

        <div className="bg-secondary p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-accent">ToDo List</h2>
          <p className="text-gray-300 mb-4">Uma aplicação de lista de tarefas moderna e responsiva, desenvolvida com React para gerenciamento eficiente de atividades diárias.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">React</span>
            <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">JavaScript</span>
            <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">CSS</span>
          </div>
          <a 
            href="https://github.com/gethigheasy/todolist-react" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 transition-colors"
          >
            Ver no GitHub →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects; 