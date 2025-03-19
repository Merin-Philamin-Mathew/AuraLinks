
// src/components/Weather/WeatherIcon.jsx
import React from 'react';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  Sun, 
  CloudLightning, 
  CloudDrizzle,
  Wind as WindIcon
} from 'lucide-react';

const WeatherIcon = ({ weatherCode, size = 24 }) => {
  // Map OpenWeatherMap condition codes to icons
  // https://openweathermap.org/weather-conditions
  const getIcon = () => {
    // Group 2xx: Thunderstorm
    if (weatherCode >= 200 && weatherCode < 300) {
      return <CloudLightning size={size} className="text-chart-5" />;
    }
    // Group 3xx: Drizzle
    else if (weatherCode >= 300 && weatherCode < 400) {
      return <CloudDrizzle size={size} className="text-chart-4" />;
    }
    // Group 5xx: Rain
    else if (weatherCode >= 500 && weatherCode < 600) {
      return <CloudRain size={size} className="text-chart-2" />;
    }
    // Group 6xx: Snow
    else if (weatherCode >= 600 && weatherCode < 700) {
      return <CloudSnow size={size} className="text-primary" />;
    }
    // Group 7xx: Atmosphere (fog, mist, etc.)
    else if (weatherCode >= 700 && weatherCode < 800) {
      return <CloudFog size={size} className="text-muted-foreground" />;
    }
    // 800: Clear
    else if (weatherCode === 800) {
      return <Sun size={size} className="text-chart-5" />;
    }
    // Group 80x: Clouds
    else if (weatherCode > 800 && weatherCode < 900) {
      return <Cloud size={size} className="text-chart-1" />;
    }
    // Default
    return <WindIcon size={size} className="text-muted-foreground" />;
  };

  return (
    <div className="flex justify-center items-center">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;


