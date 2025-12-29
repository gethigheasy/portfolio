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
    <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] via-white to-[#00ff87] animate-gradient-shift">
      {displayText}
      <span className="animate-blink text-[#00ff87]">|</span>
    </span>
  );
};

export default Typewriter;
