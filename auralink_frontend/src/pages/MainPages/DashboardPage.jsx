import Footer from '@/components/partials/Footer';
import Header from '@/components/partials/Header';
import MainApp from '@/components/site/SiteDashboard/MainApp'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function DashboardPage() {
    const { user } = useSelector((state) => state);
    
    // Initialize dark mode state the same way as HomePage
    const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      // Check system preference if no saved preference
      if (savedTheme === null) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return savedTheme === 'dark';
    });
    
    // Save theme preference when it changes - same as HomePage
    useEffect(() => {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
    
    return (
      <>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <MainApp user={user} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
          <Footer/>
        </div>
      </>
    )
}

export default DashboardPage