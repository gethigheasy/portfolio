import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Entrance from './pages/Entrance';
import Typewriter from './components/Typewriter';
import ParticlesBackground from './components/ParticlesBackground';
import { AudioProvider } from './contexts/AudioContext';
import './App.css';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <ParticlesBackground />
      
      <div className="relative z-10">
        <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-sm p-4 border-b border-white/10">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/portfolio" className="text-2xl font-bold text-white">
              <Typewriter text="七転び八起き" />
            </Link>
            <div className="space-x-4">
              <Link to="/portfolio" className="hover:text-white/80 transition-colors">Início</Link>
              <Link to="/portfolio/projects" className="hover:text-white/80 transition-colors">Projetos</Link>
              <Link to="/portfolio/contact" className="hover:text-white/80 transition-colors">Contato</Link>
            </div>
          </div>
        </nav>

        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Entrance />} />
          <Route path="/portfolio/*" element={<Portfolio />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
};

export default App; 