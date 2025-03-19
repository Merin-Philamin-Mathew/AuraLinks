import React from 'react';
import { useEffect, useState } from 'react';

const AuraLinksLoader = () => {
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
        {/* Central circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-primary rounded-full opacity-20"></div>
          <div className="absolute w-16 h-16 bg-primary rounded-full opacity-40"></div>
          <div className="absolute w-8 h-8 bg-primary rounded-full"></div>
        </div>
        
        {/* Orbiting dots */}
        <div 
          className="absolute w-4 h-4 bg-chart-1 rounded-full shadow-lg"
          style={{
            left: `${24 + 22 * Math.cos(progress * 0.06)}px`,
            top: `${24 + 22 * Math.sin(progress * 0.06)}px`,
          }}
        ></div>
        <div 
          className="absolute w-3 h-3 bg-chart-2 rounded-full shadow-lg"
          style={{
            right: `${24 + 22 * Math.cos(progress * 0.08 + 2)}px`,
            top: `${24 + 22 * Math.sin(progress * 0.08 + 2)}px`,
          }}
        ></div>
        <div 
          className="absolute w-3 h-3 bg-chart-3 rounded-full shadow-lg"
          style={{
            left: `${24 + 22 * Math.cos(progress * 0.07 + 4)}px`,
            bottom: `${24 + 22 * Math.sin(progress * 0.07 + 4)}px`,
          }}
        ></div>
        <div 
          className="absolute w-2 h-2 bg-chart-4 rounded-full shadow-lg"
          style={{
            right: `${24 + 22 * Math.cos(progress * 0.09 + 6)}px`,
            bottom: `${24 + 22 * Math.sin(progress * 0.09 + 6)}px`,
          }}
        ></div>
      </div>
      
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
    </div>
  );
};

export default AuraLinksLoader;