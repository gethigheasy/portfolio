import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Languages from './pages/Languages';
import Relationship from './pages/Relationship';
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
      const sections = ['inicio', 'linguagens', 'namoro'];
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
    { id: 'inicio', label: 'Início', icon: '' },
    { id: 'linguagens', label: 'Linguagens', icon: '' },
    { id: 'namoro', label: 'Nós', icon: '' }
  ];

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
      <div className="relative z-10">
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolling ? 'bg-[#050505]/95 backdrop-blur-md shadow-lg' : 'bg-[#050505]/90 backdrop-blur-sm'
        } border-b border-[#1a1a1a]`}>
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
                  <span className="relative z-10">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        <main className="pt-20">
          <section id="inicio" className="scroll-mt-20">
            <Home />
          </section>
          <section id="linguagens" className="scroll-mt-20">
            <Languages />
          </section>
          <section id="namoro" className="scroll-mt-20">
            <Relationship />
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
