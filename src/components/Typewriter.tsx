import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span className="text-accent">{displayText}</span>;
};

export default Typewriter; 