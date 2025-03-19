"use client"

import { CloudRain, Sun, Cloud, CloudLightning, CloudSnow, CloudDrizzle } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchWeatherByCoordinates, setCurrentLocation } from "@/redux/weatherSlice"

function WeatherDashboard() {
  const dispatch = useDispatch()
  const { currentWeather, selectedLocation, currentLocation, status, locationStatus, error } = useSelector(
    (state) => state.weather,
  )

  const [locationError, setLocationError] = useState(null)

  useEffect(() => {
    // Only get current location if we don't already have it in Redux
    if (!currentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords

            // Get location details using reverse geocoding
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
              .then((response) => response.json())
              .then((data) => {
                // Extract location information
                const locationInfo = {
                  location: data.display_name || "",
                  address: data.address?.road || "",
                  city: data.address?.city || data.address?.town || data.address?.village || "",
                }

                // Store the current location in Redux
                dispatch(
                  setCurrentLocation({
                    lat: latitude,
                    lon: longitude,
                    locationInfo,
                  }),
                )

                // Only fetch weather if we don't have it already
                if (!currentWeather) {
                  dispatch(
                    fetchWeatherByCoordinates({
                      lat: latitude,
                      lon: longitude,
                      locationInfo,
                    }),
                  )
                }
              })
              .catch((err) => {
                console.error("Error fetching location details:", err)
                // Set minimal location info
                const locationInfo = { location: "", address: "", city: "" }

                dispatch(
                  setCurrentLocation({
                    lat: latitude,
                    lon: longitude,
                    locationInfo,
                  }),
                )

                // Only fetch weather if we don't have it already
                if (!currentWeather) {
                  dispatch(
                    fetchWeatherByCoordinates({
                      lat: latitude,
                      lon: longitude,
                      locationInfo,
                    }),
                  )
                }
              })
          },
          (err) => {
            console.error("Error getting current location:", err)
            setLocationError("Failed to get your current location. Please enable location services.")
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
      } else {
        setLocationError("Geolocation is not supported by this browser.")
      }
    } else if (!currentWeather) {
      // If we have location but no weather, fetch weather
      dispatch(
        fetchWeatherByCoordinates({
          lat: currentLocation.lat,
          lon: currentLocation.lon,
          locationInfo: {
            location: currentLocation.location || "",
            address: currentLocation.address || "",
            city: currentLocation.city || "",
          },
        }),
      )
    }
  }, [dispatch, currentLocation, currentWeather])

  // Weather icon mapping
  const getWeatherIcon = (weather) => {
    if (!weather || !weather.weather?.[0]) return <CloudRain size={48} className="text-chart-2" />

    const weatherMain = weather.weather[0].main.toLowerCase()

    if (weatherMain.includes("rain")) {
      return <CloudRain size={48} className="text-chart-2" />
    } else if (weatherMain.includes("clear")) {
      return <Sun size={48} className="text-chart-1" /> // Changed from text-yellow-500 to text-chart-1
    } else if (weatherMain.includes("cloud")) {
      return <Cloud size={48} className="text-muted-foreground" /> // Changed from text-gray-400 to text-muted-foreground
    } else if (weatherMain.includes("thunder")) {
      return <CloudLightning size={48} className="text-chart-3" /> // Changed from text-purple-500 to text-chart-3
    } else if (weatherMain.includes("snow")) {
      return <CloudSnow size={48} className="text-chart-4" /> // Changed from text-blue-200 to text-chart-4
    } else if (weatherMain.includes("drizzle")) {
      return <CloudDrizzle size={48} className="text-chart-5" /> // Changed from text-blue-400 to text-chart-5
    }

    return <CloudRain size={48} className="text-chart-2" />
  }

  // Format temperature
  const formatTemp = (temp) => {
    if (!temp) return "N/A"
    return `${Math.round(temp)}°C`
  }

  // Get city name
  const getCityName = () => {
    if (selectedLocation?.city) return selectedLocation.city
    if (currentLocation?.city) return currentLocation.city
    return "Unknown Location"
  }

  // Show loading state
  const isLoading = status === "loading" || locationStatus === "loading"

  // Get weather data
  const weatherData = currentWeather

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-medium text-foreground mb-2 flex items-center">
        <Cloud size={20} className="mr-2" />
        Weather Dashboard
      </h3>

      {isLoading && (
        <div className="text-center py-4 flex flex-col items-center">
          <div className="animate-pulse flex space-x-2 mb-2">
            <div className="rounded-full bg-gray-200 h-2 w-2"></div>
            <div className="rounded-full bg-gray-200 h-2 w-2"></div>
            <div className="rounded-full bg-gray-200 h-2 w-2"></div>
          </div>
          <p className="text-muted-foreground">Fetching weather data...</p>
        </div>
      )}

      {locationError && !isLoading && (
        <div className="text-center py-4 bg-red-50 rounded-lg">
          <p className="text-red-500 flex items-center justify-center">
            <CloudRain size={20} className="mr-2" />
            {locationError}
          </p>
        </div>
      )}

      {error && !isLoading && !locationError && (
        <div className="text-center py-4 bg-red-50 rounded-lg">
          <p className="text-red-500 flex items-center justify-center">
            <CloudLightning size={20} className="mr-2" />
            Failed to load weather data
          </p>
        </div>
      )}

      {weatherData && !isLoading && !locationError && !error && (
        <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-card dark:to-card/80 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-foreground">{formatTemp(weatherData.main?.temp)}</div>
              <div className="text-sm text-muted-foreground">{getCityName()}</div>
              <div className="text-xs text-muted-foreground mt-1 capitalize">
                {weatherData.weather?.[0]?.description}
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-background rounded-full shadow-md">{getWeatherIcon(weatherData)}</div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-border grid grid-cols-3 gap-2 text-center">
            <div className="text-xs">
              <div className="font-semibold">Humidity</div>
              <div>{weatherData.main?.humidity || "N/A"}%</div>
            </div>
            <div className="text-xs">
              <div className="font-semibold">Wind</div>
              <div>{weatherData.wind?.speed || "N/A"} m/s</div>
            </div>
            <div className="text-xs">
              <div className="font-semibold">Pressure</div>
              <div>{weatherData.main?.pressure || "N/A"} hPa</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherDashboard

