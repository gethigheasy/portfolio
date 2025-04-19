import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-white">
        <nav className="bg-secondary p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-accent">Victor</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-accent transition-colors">Início</Link>
              <Link to="/projects" className="hover:text-accent transition-colors">Projetos</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">Contato</Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 