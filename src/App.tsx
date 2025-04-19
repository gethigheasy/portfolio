import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Typewriter from './components/Typewriter';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen text-white relative">
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(https://i.pinimg.com/originals/f0/35/27/f0352785c140b9358af11fd76b7a7c4c.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10">
          <nav className="bg-black/50 backdrop-blur-sm p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">
                <Typewriter text="七転び八起き" />
              </Link>
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
      </div>
    </Router>
  );
};

export default App; 