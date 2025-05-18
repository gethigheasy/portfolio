import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Entrance from './pages/Entrance';
import Typewriter from './components/Typewriter';
import { AudioProvider } from './contexts/AudioContext';
import './App.css';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'projetos', 'contato'];
      let current = 'inicio';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <div className="relative z-10">
        <nav>
          <button className={`menu-btn${activeSection === 'inicio' ? ' active' : ''}`} onClick={() => scrollToSection('inicio')}>Início</button>
          <button className={`menu-btn${activeSection === 'projetos' ? ' active' : ''}`} onClick={() => scrollToSection('projetos')}>Projetos</button>
          <button className={`menu-btn${activeSection === 'contato' ? ' active' : ''}`} onClick={() => scrollToSection('contato')}>Contato</button>
        </nav>
        <main className="pt-32">
          <section id="inicio"><Home /></section>
          <section id="projetos"><Projects /></section>
          <section id="contato"><Contact /></section>
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