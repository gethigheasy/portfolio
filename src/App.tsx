import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { FaCode } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Home from './pages/Home';
import Languages from './pages/Languages';
import Relationship from './pages/Relationship';
import Entrance from './pages/Entrance';
import { AudioProvider } from './contexts/AudioContext';
import './App.css';

type PageId = 'inicio' | 'linguagens' | 'namoro';

const Portfolio: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('inicio');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const menuItems: Array<{ id: PageId; icon: IconType }> = [
    { id: 'inicio', icon: HiHome },
    { id: 'linguagens', icon: FaCode },
    { id: 'namoro', icon: FaHeart }
  ];

  const changePage = (pageId: PageId) => {
    if (pageId === currentPage || isTransitioning) return;

    setIsTransitioning(true);
    
    // Fade out
    setTimeout(() => {
      setCurrentPage(pageId);
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Home />;
      case 'linguagens':
        return <Languages />;
      case 'namoro':
        return <Relationship />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
      <div className="relative z-10">
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center h-14 gap-2 md:gap-4">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`menu-btn relative group ${
                      currentPage === item.id ? ' active' : ''
                    }`}
                    onClick={() => changePage(item.id)}
                    disabled={isTransitioning}
                  >
                    <IconComponent 
                      className="w-5 h-5 md:w-6 md:h-6 text-white transition-all duration-300 group-hover:scale-110" 
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
        
        <main className="h-screen pt-14 overflow-hidden">
          <div 
            className={`page-container h-full transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {renderPage()}
          </div>
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
