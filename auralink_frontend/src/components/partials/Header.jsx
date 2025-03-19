// Header.jsx
import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = ({user,  isDarkMode, setIsDarkMode }) => {

    
  // Handle theme change
  useEffect(() => {
    // Update the DOM when dark mode changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const navigate = useNavigate()

  return (
    <header className="px-6 py-4 border-b border-border flex justify-between items-center bg-background transition-colors duration-300">
      <div className="flex items-center gap-1 cursor-pointer"
        onClick={()=>{navigate('/home')}}
        
      >
        <div className="rounded-full h-12 flex items-center justify-center relative">
        <img 
            src="/aura_links.svg" 
            alt="AuraLinks Logo" 
            className="h-16 " 
          />
        </div>
        <h1 className="text-xl font-bold gradient-text ">Aura Links</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden md:block">{user?.name}</span>
          <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden">
            <img src={user?.avatar_url} alt={user?.display_name} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;