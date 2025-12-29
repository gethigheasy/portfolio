import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Entrance from './pages/Entrance';
import { AudioProvider } from './contexts/AudioContext';
import './App.css';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      const sections = ['inicio', 'projetos', 'contato'];
      let current = 'inicio';
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = id;
          }
        }
      }
      
      setActiveSection(current);
      
      // Reset scrolling state after scroll ends
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: '🏠' },
    { id: 'projetos', label: 'Projetos', icon: '💼' },
    { id: 'contato', label: 'Contato', icon: '📧' }
  ];

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-br from-[#0a0b0d] via-[#191b1f] to-[#0a0b0d]">
      <div className="relative z-10">
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolling ? 'bg-[#20232a]/95 backdrop-blur-md shadow-lg' : 'bg-[#20232a]/80 backdrop-blur-sm'
        } border-b border-[#363b42]`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center h-20 gap-2 md:gap-4">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`menu-btn relative group ${
                    activeSection === item.id ? ' active' : ''
                  }`}
                  onClick={() => scrollToSection(item.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg md:text-xl">{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                  
                  {/* Indicador de seção ativa melhorado */}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-[#00ff87] to-[#00cc6a] rounded-t-full shadow-lg shadow-[#00ff87]/50 animate-scale-in"></div>
                  )}
                  
                  {/* Efeito de hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff87]/10 to-[#00cc6a]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        <main className="pt-20">
          <section id="inicio" className="scroll-mt-20">
            <Home />
          </section>
          <section id="projetos" className="scroll-mt-20">
            <Projects />
          </section>
          <section id="contato" className="scroll-mt-20">
            <Contact />
          </section>
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
