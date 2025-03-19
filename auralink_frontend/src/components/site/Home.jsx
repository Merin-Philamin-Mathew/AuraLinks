// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { FaBell, FaBookmark, FaUser, FaSun, FaMoon, FaSignOutAlt, FaMapMarkerAlt, FaSpotify, FaLink, FaTelegramPlane } from 'react-icons/fa';
// import { BiChat, BiWeather } from 'react-icons/bi';
import { BsBriefcase } from 'react-icons/bs';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: 'system', content: 'Hello! How can I help you today?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Simulate user data


  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Simulate fetching weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Simulated weather data
        setWeatherData({
          temp: 22,
          description: 'Partly Cloudy',
          city: city,
          humidity: 65,
          wind: 12
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    
    fetchWeather();
  }, [city]);

  // Handle chat message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add user message
    setChatMessages([
      ...chatMessages,
      { id: Date.now(), role: 'user', content: newMessage }
    ]);
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now() + 1, role: 'system', content: 'I received your message. How can I help further?' }
      ]);
    }, 1000);
    
    setNewMessage('');
  };

  // Job listings (simulated data)
  const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', salary: '$90K-$120K' },
    { id: 2, title: 'Backend Engineer', company: 'DataSystems', location: 'New York', salary: '$100K-$140K' },
    { id: 3, title: 'Full Stack Developer', company: 'StartupX', location: 'San Francisco', salary: '$110K-$150K' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold gradient-text">DevConnect</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-accent text-foreground"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              
              <button className="p-2 rounded-full hover:bg-accent text-foreground relative">
                <FaBell />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-2 p-1 rounded hover:bg-accent">
                  <img 
                    className="h-8 w-8 rounded-full bg-muted" 
                    src={user.avatar} 
                    alt="User avatar" 
                  />
                  <span className="text-sm font-medium text-foreground hidden md:block">
                    {user.name}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className="bg-card shadow rounded-lg p-6 border border-border">
                <div className="flex flex-col items-center">
                  <img 
                    className="h-24 w-24 rounded-full bg-muted mb-4" 
                    src={user.avatar} 
                    alt="User avatar" 
                  />
                  <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="mt-4 flex space-x-3">
                    <button className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                      Edit Profile
                    </button>
                    <button className="px-4 py-2 rounded border border-input bg-card hover:bg-muted text-sm flex items-center gap-1">
                      <FaSignOutAlt size={12} />
                      Logout
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-border pt-4">
                  <h3 className="font-medium text-foreground mb-2">Quick Access</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center space-x-2 p-2 text-sm rounded hover:bg-accent">
                      <FaMapMarkerAlt className="text-chart-4" />
                      <span>Location</span>
                    </button>
                    <button className="flex items-center space-x-2 p-2 text-sm rounded hover:bg-accent">
                      <FaSpotify className="text-chart-4" />
                      <span>Spotify</span>
                    </button>
                    <button className="flex items-center space-x-2 p-2 text-sm rounded hover:bg-accent">
                      <FaLink className="text-chart-3" />
                      <span>URL Shortener</span>
                    </button>
                    <button className="flex items-center space-x-2 p-2 text-sm rounded hover:bg-accent">
                      <FaTelegramPlane className="text-chart-2" />
                      <span>Telegram</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Weather Card */}
              <div className="bg-card shadow rounded-lg p-6 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-foreground">Weather</h2>
                  {/* <BiWeather className="text-chart-5 text-xl" /> */}
                </div>
                
                {weatherData && (
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-foreground mb-1">{weatherData.temp}°C</div>
                    <div className="text-muted-foreground mb-4">{weatherData.description}</div>
                    <div className="text-foreground font-medium">{weatherData.city}</div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-background p-2 rounded">
                        <div className="text-muted-foreground">Humidity</div>
                        <div className="font-medium">{weatherData.humidity}%</div>
                      </div>
                      <div className="bg-background p-2 rounded">
                        <div className="text-muted-foreground">Wind</div>
                        <div className="font-medium">{weatherData.wind} km/h</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <form className="mt-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Search city..."
                      className="flex-grow px-3 py-2 bg-background border border-input rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Middle Column - AI Chatbot */}
            <div className="bg-card shadow rounded-lg border border-border flex flex-col h-[600px]">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center">
                  {/* <BiChat className="text-primary mr-2" size={20} /> */}
                  <h2 className="font-medium text-foreground">AI Assistant</h2>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <FaBookmark />
                </button>
              </div>
              
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {chatMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow px-3 py-2 bg-background border border-input rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Job Listings */}
              <div className="bg-card shadow rounded-lg p-6 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-foreground">Latest Job Listings</h2>
                  <BsBriefcase className="text-chart-1 text-xl" />
                </div>
                
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="border border-border rounded-md p-3 hover:bg-accent/50 transition-colors">
                      <h3 className="font-medium text-foreground">{job.title}</h3>
                      <p className="text-muted-foreground text-sm">{job.company}</p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-muted-foreground">{job.location}</span>
                        <span className="font-medium text-chart-4">{job.salary}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    View All Job Listings
                  </button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-card shadow rounded-lg p-6 border border-border">
                <h2 className="text-lg font-medium text-foreground mb-4">Your Stats</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-md p-3">
                    <div className="text-muted-foreground text-sm">Chat Sessions</div>
                    <div className="text-2xl font-semibold text-foreground">24</div>
                  </div>
                  <div className="bg-background rounded-md p-3">
                    <div className="text-muted-foreground text-sm">URLs Created</div>
                    <div className="text-2xl font-semibold text-foreground">7</div>
                  </div>
                  <div className="bg-background rounded-md p-3">
                    <div className="text-muted-foreground text-sm">Location Shares</div>
                    <div className="text-2xl font-semibold text-foreground">3</div>
                  </div>
                  <div className="bg-background rounded-md p-3">
                    <div className="text-muted-foreground text-sm">Weather Searches</div>
                    <div className="text-2xl font-semibold text-foreground">12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;