// src/components/Weather/index.jsx
import { fetchWeatherByCoordinates } from '@/redux/weatherSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import WeatherWidget from './WeatherWidgets';

const Weather = () => {


  return (
    <div className="p-4">
      <WeatherWidget />
    </div>
  );
};

export default Weather;