import React, { useState, useEffect } from 'react';
import { Music, MapPin, MessageSquare, Search, Sun, BarChart3 } from 'lucide-react';
import Header from '../partials/Header';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({user}) => {

const navigate = useNavigate()
  // Main user features with more prominent styling
  const primaryFeatures = [
    { 
      icon: <MessageSquare size={32} />, 
      title: "AI Chat",
      color: "from-chart-1 to-chart-2",
      position: "top-4 <left-1/3></left-1/3> md:left-1/3",
      size: "w-28 h-28 md:w-32 md:h-32"
    },
    { 
      icon: <Music size={32} />, 
      title: "Music Suggestions",
      color: "from-chart-3 to-chart-4",
      position: "top-9 right-1/4 md:right-3/2 ",
      size: "w-28 h-28 md:w-32 md:h-32"
    },
    { 
      icon: <MapPin size={32} />,
      title: "Weather & Location",
      color: "from-chart-4 to-chart-5",
      position: "bottom-0 left-1/4 md:left-1/3",
      size: "w-28 h-28 md:w-32 md:h-32" 
    },
    { 
      icon: <Search size={32} />,
      title: "Job Search",
      color: "from-chart-5 to-chart-1",
      position: "-bottom-7 right-1/4 md:right-1/3",
      size: "w-28 h-28 md:w-32 md:h-32"
    },
  ];

  // Secondary features with smaller styling
  const secondaryFeatures = [
    { 
      icon: <Sun size={20} />, 
      title: "OAuth",
      position: "top-1/3 -left-4 md:left-4",
      size: "w-16 h-16" 
    },
    { 
      icon: <BarChart3 size={20} />, 
      title: "Analytics",
      position: "top-1/3 -right-4 md:right-4",
      size: "w-16 h-16" 
    },
    { 
      icon: <MessageSquare size={20} />, 
      title: "Telegram",
      position: "bottom-1/3 -left-4 md:left-4",
      size: "w-16 h-16" 
    },
    { 
      icon: <Music size={20} />, 
      title: "URL Shortener",
      position: "bottom-1/3 -right-4 md:right-4",
      size: "w-16 h-16" 
    },
  ];

  return (
  <>
      {/* Main Content - Profile Hub */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-24">
          <h2 className="text-2xl font-bold">Welcome back, {user?.display_name.split(' ')[0]}</h2>
          <p className="text-muted-foreground">Your Aura Links dashboard</p>
        </div>
        
        {/* Profile Hub with Scattered Features */}
        <div className="relative w-full max-w-2xl mx-auto aspect-square py-8">
          {/* Purple glow background effect similar to logo */}
          <div className="absolute inset-0 bg-chart-1/5 rounded-full blur-xl"></div>
          <div className="absolute inset-8 bg-chart-1/5 rounded-full blur-lg"></div>
          
          {/* Orbital circles similar to logo */}
          <div className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              {/* Orbital rings */}
              <circle cx="200" cy="200" r="160" stroke="hsl(var(--primary)/10)" strokeWidth="1" fill="none" />
              <circle cx="200" cy="200" r="120" stroke="hsl(var(--primary)/15)" strokeWidth="1" fill="none" />
              <circle cx="200" cy="200" r="80" stroke="hsl(var(--primary)/20)" strokeWidth="1" fill="none" />
              
              {/* Connection lines to primary features */}
              <g stroke="hsl(var(--primary)/30)" strokeWidth="2" fill="none">
                <line x1="200" y1="200" x2="120" y2="80" className="opacity-70" />
                <line x1="200" y1="200" x2="280" y2="80" className="opacity-70" />
                <line x1="200" y1="200" x2="120" y2="320" className="opacity-70" />
                <line x1="200" y1="200" x2="280" y2="320" className="opacity-70" />
              </g>
              
              {/* Connection lines to secondary features */}
              <g stroke="hsl(var(--primary)/20)" strokeWidth="1" fill="none">
                <line x1="200" y1="200" x2="40" y2="140" className="opacity-40" />
                <line x1="200" y1="200" x2="360" y2="140" className="opacity-40" />
                <line x1="200" y1="200" x2="40" y2="260" className="opacity-40" />
                <line x1="200" y1="200" x2="360" y2="260" className="opacity-40" />
              </g>
            </svg>
          </div>
          
          {/* Center profile image */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            onClick={()=>navigate('/dashboard')}
          >
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-primary p-1 bg-background overflow-hidden">
                <img 
                  src={user.avatar_url} 
                  alt={user.display_name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary opacity-30 blur-md -z-10"></div>
            </div>
          </div>
          
          {/* Primary feature cards - more prominent */}
          {primaryFeatures.map((feature) => (
            <div 
              key={feature.title}
              className={`absolute ${feature.position} transform -translate-x-1/2 -translate-y-1/2`}
            >
              <div className="group">
                <div className={`${feature.size} bg-card hover:bg-accent transition-all duration-300 p-4 rounded-full shadow-lg cursor-pointer flex flex-col items-center justify-center text-center hover:scale-110`}>
                  <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-full mb-1`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium mt-1">{feature.title}</h4>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-chart-3/20 opacity-0 group-hover:opacity-100 blur-md -z-10 transition-opacity"></div>
              </div>
            </div>
          ))}
          
          {/* Secondary feature dots - smaller */}
          {secondaryFeatures.map((feature) => (
            <div 
              key={feature.title}
              className={`absolute ${feature.position} transform -translate-x-1/2 -translate-y-1/2`}
            >
              <div className="group">
                <div className={`${feature.size} bg-card hover:bg-accent transition-all duration-300 rounded-full shadow-md cursor-pointer flex flex-col items-center justify-center text-center`}>
                  <div className="text-primary group-hover:text-primary-foreground">
                    {feature.icon}
                  </div>
                  <h4 className="text-xs font-medium mt-1">{feature.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
     
    </>
  );
};

export default UserDashboard;