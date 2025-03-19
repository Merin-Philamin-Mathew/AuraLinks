import React, { useEffect, useState } from 'react';
import { Sun,Moon,Bell, Map, MessageSquare, Settings, Link, Music, CloudRain, Search, BriefcaseBusiness, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChatBot } from '../../features/chat/ChatBot';
import Weather from '../../features/weather/Weather';
import ChatDashboard from '../../features/chat/ChatDashboard';
import WeatherDashboard from '../../features/weather/WeatherDashboard';
import { URLShortener } from '../../features/urlShortner/URLShortener';
import URLShortenerDashboard from '@/components/features/urlShortner/URLShortenerDashboard';
import UserProfileSection from '@/components/user/UserProfileSection';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <Search size={20} /> },
    { name: 'Chat', icon: <MessageSquare size={20} /> },
    { name: 'Jobs', icon: <BriefcaseBusiness size={20} /> },
    { name: 'Weather', icon: <CloudRain size={20} /> },
    { name: 'Location', icon: <Map size={20} /> },
    { name: 'URLs', icon: <Link size={20} /> },
    { name: 'Music', icon: <Music size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];
  const navigate = useNavigate()


  return (
    <div className="h-screen px-4 w-64 bg-card border-r border-border flex flex-col">
      <div className="flex pt-3 pb-2 items-center gap-1 cursor-pointer"
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
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center px-4 py-3 cursor-pointer hover:bg-accent/10 ${
              activeItem === item.name ? 'bg-accent/20 text-primary' : 'text-foreground'
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <div className="mr-3">{item.icon}</div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="py-4  border-t border-border">
        <UserProfileSection />
      </div>
    
    
    </div>
  );
};

const Header2 = ({ title, user,isDarkMode, setIsDarkMode }) => {
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

    
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-accent/10 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-chart-3 rounded-full"></span>
        </button>
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden md:block">{user.user_details.name}</span>
          <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden">
            <img src={user.user_details.avatar_url} alt={user.user_details.display_name} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <ChatDashboard/>
      <WeatherDashboard/>
      <URLShortenerDashboard/>
      {/* <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-foreground mb-2">Weather</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">24°C</div>
            <div className="text-sm text-muted-foreground">New York</div>
          </div>
          <CloudRain size={48} className="text-chart-2" />
        </div>
      </div> */}
      
      
      <div className="bg-card border border-border rounded-lg p-4 md:col-span-2">
        <h3 className="text-lg font-medium text-foreground mb-2">Latest Jobs</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 border border-border rounded-md hover:bg-accent/5 cursor-pointer">
              <div className="flex justify-between">
                <div className="font-medium text-foreground">Frontend Developer</div>
                <div className="text-sm text-chart-4">$80-100k</div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">Company {i}</div>
              <div className="flex items-center mt-2">
                <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1 mr-2">React</span>
                <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1 mr-2">Tailwind</span>
                <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1">Remote</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-foreground mb-2">Music</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center p-2 hover:bg-accent/10 rounded-md cursor-pointer">
              <div className="w-8 h-8 bg-chart-5 rounded-full mr-2 flex items-center justify-center">
                <Music size={16} className="text-chart-5-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Track Name #{i}</div>
                <div className="text-xs text-muted-foreground">Artist Name</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JobList = () => {
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-1 p-2 bg-secondary rounded-l-md focus:outline-none text-foreground"
        />
        <button className="bg-primary text-primary-foreground p-2 rounded-r-md">
          Search
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-4 hover:border-primary cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-foreground">Senior Developer</h3>
                <div className="text-sm text-muted-foreground mt-1">Company Name {i}</div>
              </div>
              <div className="text-sm font-medium text-chart-4">$120-150k</div>
            </div>
            
            <div className="mt-3 text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            
            <div className="flex items-center mt-3">
              <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1 mr-2">Python</span>
              <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1 mr-2">Django</span>
              <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1">Remote</span>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">Posted 2 days ago</div>
              <button className="text-xs text-primary hover:underline">Apply Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




const MainApp = ({user, isDarkMode, setIsDarkMode}) => {
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');
  
  // Simulate loading for demonstration
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Chat':
        return <ChatBot />;
      case 'Jobs':
        return <JobList />;
      case 'Weather':
        return <Weather />;
      case 'URLs':
        return <URLShortener />;
      default:
        return <Dashboard />;
    }
  };

//   if (loading) {
//     return <AuraLinksLoader />;
//   }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header2 title={activeItem} user={user} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainApp;