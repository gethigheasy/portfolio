import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 150 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className="font-mono text-white">
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default Typewriter; 