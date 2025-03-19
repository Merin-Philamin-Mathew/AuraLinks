import React, { useState } from 'react';
import Footer from '../partials/Footer';

const LogoShowcase = () => {
  const [selectedLogo, setSelectedLogo] = useState('full');
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-8 text-center">AuraLinks Logo Options</h1>
      
      <div className="flex space-x-4 mb-8">
        <button 
          className={`px-4 py-2 rounded-md transition-all ${
            selectedLogo === 'mark' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-foreground'
          }`}
          onClick={() => setSelectedLogo('mark')}
        >
          Logo Mark Only
        </button>
        <button 
          className={`px-4 py-2 rounded-md transition-all ${
            selectedLogo === 'full' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-foreground'
          }`}
          onClick={() => setSelectedLogo('full')}
        >
          Full Logo with Text
        </button>
        <button 
          className={`px-4 py-2 rounded-md transition-all ${
            selectedLogo === 'animated' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-foreground'
          }`}
          onClick={() => setSelectedLogo('animated')}
        >
          Animated Loader
        </button>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8">
        {selectedLogo === 'mark' && (
          <div className="flex flex-col items-center">
            <div className="bg-background p-8 rounded-lg mb-6 w-64 h-64 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
                {/* Background glow */}
                <circle cx="100" cy="100" r="80" fill="rgba(124, 58, 237, 0.1)" />
                <circle cx="100" cy="100" r="65" fill="rgba(124, 58, 237, 0.15)" />
                
                {/* Orbiting elements */}
                <g>
                  {/* Main orbital rings */}
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="2" />
                  <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="2" 
                    transform="rotate(30 100 100)" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(124, 58, 237, 0.7)" strokeWidth="2" 
                    transform="rotate(-15 100 100)" />
                    
                  {/* Orbital dots */}
                  <circle cx="160" cy="100" r="6" fill="#7C3AED" />
                  <circle cx="130" cy="145" r="8" fill="#8B5CF6" />
                  <circle cx="70" cy="145" r="6" fill="#7C3AED" />
                  <circle cx="40" cy="100" r="8" fill="#8B5CF6" />
                  <circle cx="70" cy="55" r="6" fill="#7C3AED" />
                  <circle cx="130" cy="55" r="8" fill="#8B5CF6" />
                </g>
                
                {/* Central element */}
                <circle cx="100" cy="100" r="20" fill="#7C3AED" />
                
                {/* A-shaped cutout in white */}
                <path d="M100 80 L110 110 H90 Z" fill="white" />
                
                {/* Connection lines */}
                <line x1="100" y1="100" x2="160" y2="100" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="130" y2="145" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="70" y2="145" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="40" y2="100" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="70" y2="55" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                <line x1="100" y1="100" x2="130" y2="55" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-foreground mb-2">Logo Mark</h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              A standalone logo mark depicting interconnected nodes with an "A" at the center,
              representing the linking and connection aspect of AuraLinks.
            </p>
          </div>
        )}
        
        {selectedLogo === 'full' && (
          <div className="flex flex-col items-center">
            <div className="bg-background p-8 rounded-lg mb-6 w-full h-64 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" className="w-full h-full">
                {/* Filter definitions */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                
                {/* Logo Mark Section (left side) */}
                <g transform="translate(50, 100) scale(0.7)">
                  {/* Background glow */}
                  <circle cx="0" cy="0" r="80" fill="rgba(124, 58, 237, 0.1)" />
                  <circle cx="0" cy="0" r="65" fill="rgba(124, 58, 237, 0.15)" />
                  
                  {/* Orbiting elements */}
                  <g filter="url(#glow)">
                    {/* Main orbital rings */}
                    <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="2" />
                    <circle cx="0" cy="0" r="45" fill="none" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="2" 
                      transform="rotate(30 0 0)" />
                    <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(124, 58, 237, 0.7)" strokeWidth="2" 
                      transform="rotate(-15 0 0)" />
                      
                    {/* Orbital dots */}
                    <circle cx="60" cy="0" r="6" fill="#7C3AED" />
                    <circle cx="30" cy="45" r="8" fill="#8B5CF6" />
                    <circle cx="-30" cy="45" r="6" fill="#7C3AED" />
                    <circle cx="-60" cy="0" r="8" fill="#8B5CF6" />
                    <circle cx="-30" cy="-45" r="6" fill="#7C3AED" />
                    <circle cx="30" cy="-45" r="8" fill="#8B5CF6" />
                  </g>
                  
                  {/* Central element */}
                  <circle cx="0" cy="0" r="20" fill="#7C3AED" />
                  
                  {/* A-shaped cutout in white */}
                  <path d="M 0 -20 L 10 10 H -10 Z" fill="white" />
                  
                  {/* Connection lines */}
                  <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="30" y2="45" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="-30" y2="45" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="-60" y2="0" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="-30" y2="-45" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="30" y2="-45" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                </g>
                
                {/* Text Section (right side) */}
                <g transform="translate(160, 100)">
                  {/* AuraLinks Text */}
                  <text x="0" y="10" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="40" fill="url(#textGradient)">
                    AuraLinks
                  </text>
                  
                  {/* Subtle glow around text */}
                  <text x="0" y="10" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="40" fill="none" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="8" filter="url(#glow)">
                    AuraLinks
                  </text>
                  
                  {/* Dots connecting to logo */}
                  <circle cx="-30" cy="0" r="3" fill="#7C3AED" opacity="0.6" />
                  <circle cx="-20" cy="0" r="2" fill="#7C3AED" opacity="0.5" />
                  <circle cx="-10" cy="0" r="1" fill="#7C3AED" opacity="0.4" />
                </g>
              </svg>
            </div>
            <h2 className="text-xl font-medium text-foreground mb-2">Full Logo with Text</h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              The complete logo with the AuraLinks name, featuring a gradient effect on the text.
              The connecting dots between the logo mark and text symbolize the connectivity theme.
            </p>
          </div>
        )}
        
        {selectedLogo === 'animated' && (
          <div className="flex flex-col items-center">
            <div className="bg-background p-8 rounded-lg mb-6 w-64 h-64 flex items-center justify-center">
              <div className="w-48 h-48 relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
                  {/* Background glow */}
                  <circle cx="100" cy="100" r="80" fill="rgba(124, 58, 237, 0.1)" />
                  <circle cx="100" cy="100" r="65" fill="rgba(124, 58, 237, 0.15)" />
                  
                  {/* Animated orbital rings */}
                  <g className="animate-spin" style={{ animationDuration: '20s' }}>
                    <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="2" />
                  </g>
                  <g className="animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                    <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="2" />
                  </g>
                  <g className="animate-spin" style={{ animationDuration: '10s' }}>
                    <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(124, 58, 237, 0.7)" strokeWidth="2" />
                  </g>
                    
                  {/* Orbital dots - positioned at strategic points */}
                  <circle cx="160" cy="100" r="6" fill="#7C3AED" className="animate-pulse" />
                  <circle cx="130" cy="145" r="8" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <circle cx="70" cy="145" r="6" fill="#7C3AED" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <circle cx="40" cy="100" r="8" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <circle cx="70" cy="55" r="6" fill="#7C3AED" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                  <circle cx="130" cy="55" r="8" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  
                  {/* Central element */}
                  <circle cx="100" cy="100" r="20" fill="#7C3AED" />
                  
                  {/* A-shaped cutout in white */}
                  <path d="M100 80 L110 110 H90 Z" fill="white" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-medium text-foreground mb-2">Animated Loader</h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              An animated version of the logo that can be used for loading screens and transitions.
              The orbiting elements rotate at different speeds, creating a dynamic visual effect.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-6 bg-card border border-border rounded-lg">
        <h2 className="text-lg font-medium text-foreground mb-4">Logo Symbolism</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="w-4 h-4 rounded-full bg-primary mt-1 mr-3 flex-shrink-0"></div>
            <p className="text-sm text-foreground">The central "A" represents "Aura" and serves as the core of the network.</p>
          </li>
          <li className="flex items-start">
            <div className="w-4 h-4 rounded-full bg-chart-2 mt-1 mr-3 flex-shrink-0"></div>
            <p className="text-sm text-foreground">The orbital rings symbolize connections and the networked nature of your platform.</p>
          </li>
          <li className="flex items-start">
            <div className="w-4 h-4 rounded-full bg-chart-3 mt-1 mr-3 flex-shrink-0"></div>
            <p className="text-sm text-foreground">The connecting nodes represent users and resources that link through the platform.</p>
          </li>
          <li className="flex items-start">
            <div className="w-4 h-4 rounded-full bg-chart-4 mt-1 mr-3 flex-shrink-0"></div>
            <p className="text-sm text-foreground">The purple color palette evokes creativity, wisdom, and digital innovation.</p>
          </li>
          <li className="flex items-start">
            <div className="w-4 h-4 rounded-full bg-chart-5 mt-1 mr-3 flex-shrink-0"></div>
            <p className="text-sm text-foreground">The subtle glow effect represents the "aura" concept – energy and influence that extends beyond boundaries.</p>
          </li>
        </ul>
      </div>
      
      <div className="mt-8 p-6 bg-card border border-border rounded-lg">
        <h2 className="text-lg font-medium text-foreground mb-4">Usage Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium text-foreground mb-2">Recommended</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-success mt-1 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-foreground">Use the full logo in marketing materials and headers</p>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-success mt-1 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-foreground">Use the logo mark for app icons and small spaces</p>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-success mt-1 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-foreground">Use the animated version for loading screens and transitions</p>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-success mt-1 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-foreground">Maintain proper spacing around the logo</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium text-foreground mb-2">Avoid</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-destructive mt-1 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-foreground">Changing the logo colors outside of the approved palette</p>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-destructive mt-1 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-foreground">Distorting or stretching the logo proportions</p>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-destructive mt-1 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-foreground">Adding effects that obscure the logo's details</p>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-destructive mt-1 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-foreground">Using the logo on busy backgrounds that reduce visibility</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};

export default LogoShowcase;