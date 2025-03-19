// src/components/Weather/WeatherWidget.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cloud, Droplet, Wind, Thermometer, Clock, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import WeatherIcon from './WeatherIcon';
import ForecastChart from './ForecastChart';
import RecentSearches from './RecentSearches';
import LocationSearch from './LocationSearch';
import { fetchWeatherByCoordinates,fetchRecentSearches } from '@/redux/weatherSlice';


const WeatherWidget = () => {
  const dispatch = useDispatch();
  const { 
    currentWeather: weather, 
    forecast, 
    recentSearches, 
    selectedLocation,
    status,
    lastUpdated
  } = useSelector(state => state.weather);
  
  const [searchLocation, setSearchLocation] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    // Fetch recent searches on component mount
    dispatch(fetchRecentSearches());
    
    // Set up hourly update interval
    const hourlyUpdateInterval = setInterval(() => {
      if (selectedLocation) {
        // If we have a selected location, update weather data
        dispatch(fetchWeatherByCoordinates({
          lat: selectedLocation.lat,
          lon: selectedLocation.lon,
          locationInfo: {
            location: selectedLocation.location,
            address: selectedLocation.address,
            city: selectedLocation.city
          }
        }));
      }
    }, 60 * 60 * 1000); // 1 hour in milliseconds
    
    return () => clearInterval(hourlyUpdateInterval);
  }, [dispatch, selectedLocation]);

  // Set search location when selected location changes
  useEffect(() => {
    if (selectedLocation) {
      setSearchLocation(selectedLocation.location || selectedLocation.city);
    }
  }, [selectedLocation]);

  const handleWeatherByCoordinates = (lat, lon, locationInfo = {}) => {
    dispatch(fetchWeatherByCoordinates({ lat, lon, locationInfo }))
      .unwrap()
      .then(() => {
        dispatch(fetchRecentSearches());
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to fetch weather data. Please try again.",
          variant: "destructive"
        });
      });
  };

  const handleGetCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleWeatherByCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          setLoadingLocation(false);
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please search manually.",
            variant: "destructive"
          });
          setLoadingLocation(false);
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
      setLoadingLocation(false);
    }
  };

  const handleSearchClick = (search) => {
    handleWeatherByCoordinates(
      search.lat, 
      search.lon, 
      {
        location: search.location_name,
        address: search.address,
        city: search.city
      }
    );
  };

  // Format temperature with degree symbol
  const formatTemp = (temp) => `${Math.round(temp)}°C`;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Weather Forecast</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGetCurrentLocation}
              disabled={loadingLocation || status === 'loading'}
            >
              {loadingLocation || status === 'loading' ? (
                <Skeleton className="h-4 w-4 rounded-full" />
              ) : (
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-1"></span>
                  My Location
                </span>
              )}
            </Button>
          </CardTitle>
          
          <LocationSearch 
            searchLocation={searchLocation} 
            setSearchLocation={setSearchLocation} 
            onPlaceSelected={(locationData) => {
              handleWeatherByCoordinates(
                locationData.lat, 
                locationData.lon, 
                {
                  location: locationData.location,
                  address: locationData.address,
                  city: locationData.city
                }
              );
            }}
          />
        </CardHeader>
        
        <CardContent>
          {weather ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{weather.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    {formatTemp(weather.main.temp)}
                  </div>
                  <p className="text-sm capitalize">{weather.weather[0].description}</p>
                </div>
              </div>
              
              <div className="flex justify-center py-2">
                <WeatherIcon weatherCode={weather.weather[0].id} size={64} />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-chart-1" />
                  <span>Feels like: {formatTemp(weather.main.feels_like)}</span>
                </div>
                <div className="flex items-center">
                  <Wind className="h-4 w-4 mr-2 text-chart-2" />
                  <span>Wind: {Math.round(weather.wind.speed)} m/s</span>
                </div>
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-chart-3" />
                  <span>High: {formatTemp(weather.main.temp_max)}</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 mr-2 text-chart-4" />
                  <span>Humidity: {weather.main.humidity}%</span>
                </div>
              </div>
              
              {forecast && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Hourly Forecast</h3>
                  <ForecastChart forecast={forecast} />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {status === 'loading' ? (
                <div className="flex flex-col items-center space-y-4">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ) : (
                <p>Search for a location or use your current location to see the weather forecast</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {recentSearches.length > 0 && (
        <RecentSearches searches={recentSearches} onSearchClick={handleSearchClick} />
      )}
    </div>
  );
};

export default WeatherWidget;