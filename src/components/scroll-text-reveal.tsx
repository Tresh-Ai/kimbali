import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

export function ScrollTextReveal({
  text,
  className = '',
  highlightWords = [],
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Calculate progress based on how far into the center of viewport the element is
            const start = windowHeight * 0.85;
            const end = windowHeight * 0.35;
            const rawProgress = (start - rect.top) / (start - end);
            const clamped = Math.max(0, Math.min(1, rawProgress));
            setProgress(clamped);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`transition-all duration-300 ${className}`}>
      {words.map((word, index) => {
        const wordThreshold = index / words.length;
        const opacity = Math.max(0.15, Math.min(1, (progress - wordThreshold * 0.5) * 3));
        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
        const isHighlight = highlightWords.includes(cleanWord);

        return (
          <span
            key={`${word}-${index}`}
            style={{ opacity, transition: 'opacity 0.2s cubic-bezier(0.2, 0.7, 0.2, 1)' }}
            className={`inline-block mr-[0.28em] ${isHighlight ? 'italic font-serif text-primary' : ''}`}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
