import React from 'react';
import { useEffect, useState } from 'react';

const AuraLinksLoader2 = ({ showText = true }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 0));
    }, 20);
    
    return () => clearTimeout(timer);
  }, [progress]);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="relative w-48 h-48 mb-6">
        {/* SVG Logo */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
          {/* Background glow */}
          <circle cx="100" cy="100" r="80" fill="rgba(124, 58, 237, 0.1)" />
          <circle cx="100" cy="100" r="65" fill="rgba(124, 58, 237, 0.15)" />
          
          {/* Orbital rings - these rotate based on progress */}
          <g style={{ transform: `rotate(${progress * 1.8}deg)`, transformOrigin: 'center' }}>
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="2" />
          </g>
          <g style={{ transform: `rotate(${-progress * 1.2}deg)`, transformOrigin: 'center' }}>
            <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="2" />
          </g>
          <g style={{ transform: `rotate(${progress * 0.9}deg)`, transformOrigin: 'center' }}>
            <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(124, 58, 237, 0.7)" strokeWidth="2" />
          </g>
            
          {/* Orbiting dots */}
          <circle 
            cx={100 + 60 * Math.cos(progress * 0.03)}
            cy={100 + 60 * Math.sin(progress * 0.03)}
            r="6" 
            fill="#7C3AED" 
          />
          <circle 
            cx={100 + 45 * Math.cos(progress * 0.05 + 1)}
            cy={100 + 45 * Math.sin(progress * 0.05 + 1)}
            r="8" 
            fill="#8B5CF6" 
          />
          <circle 
            cx={100 + 60 * Math.cos(progress * 0.04 + 2.5)}
            cy={100 + 60 * Math.sin(progress * 0.04 + 2.5)}
            r="6" 
            fill="#7C3AED" 
          />
          <circle 
            cx={100 + 45 * Math.cos(progress * 0.06 + 4)}
            cy={100 + 45 * Math.sin(progress * 0.06 + 4)}
            r="8" 
            fill="#8B5CF6" 
          />
          
          {/* Central element */}
          <circle cx="100" cy="100" r="20" fill="#7C3AED" />
          
          {/* A-shaped cutout in white */}
          <path d="M100 80 L110 110 H90 Z" fill="white" />
        </svg>
        
        {/* Connection lines (rendered with React for better animation) */}
        {[0, 1, 2, 3].map((i) => {
          const angle = progress * 0.03 + i * Math.PI / 2;
          const endX = 100 + 60 * Math.cos(angle);
          const endY = 100 + 60 * Math.sin(angle);
          
          return (
            <div 
              key={i}
              className="absolute left-0 top-0 w-full h-full overflow-hidden"
              style={{ 
                opacity: 0.6,
                zIndex: -1
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                <line 
                  x1="100" 
                  y1="100" 
                  x2={endX} 
                  y2={endY} 
                  stroke="rgba(124, 58, 237, 0.6)" 
                  strokeWidth="1.5" 
                />
              </svg>
            </div>
          );
        })}
      </div>
      
      {showText && (
        <>
          <div className="text-2xl font-bold text-primary mb-4">AuraLinks</div>
          
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-100 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="mt-2 text-sm text-muted-foreground">
            {progress < 100 ? 'Loading...' : 'Ready!'}
          </div>
        </>
      )}
    </div>
  );
};

export default AuraLinksLoader2;