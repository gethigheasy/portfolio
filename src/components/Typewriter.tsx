import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length) {
      setIsTyping(false);
    }
  }, [currentIndex, text, delay, isTyping]);

  return (
    <div className="relative">
      <span className="text-japanese-red font-bold text-2xl">{displayText}</span>
      {isTyping && (
        <span className="animate-blink text-japanese-red">|</span>
      )}
    </div>
  );
};

export default Typewriter; 