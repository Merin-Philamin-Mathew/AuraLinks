import { api } from "@/config/apis/axios"
import { CloudRain, Sun, Cloud, CloudLightning, CloudSnow, CloudDrizzle } from "lucide-react"
import { useEffect, useState } from "react"

function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [locationInfo, setLocationInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get current location
    const getCurrentLocationWeather = () => {
      setIsLoading(true)
      setError(null)

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords

            // Get location details using reverse geocoding
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
              .then((response) => response.json())
              .then((data) => {
                // Extract location information
                const locationData = {
                  location: data.display_name || "",
                  address: data.address?.road || "",
                  city: data.address?.city || data.address?.town || data.address?.village || "",
                }
                setLocationInfo(locationData)

                // Fetch weather data using axios
                return api.post('api/weather/coordinates/', {
                  'lat':latitude,
                  'lon':longitude, 
                });
              })
              .then((response) => {
                // Axios already parses JSON, so we can directly use response.data
                setCurrentWeather(response.data.weather)
                setIsLoading(false)
              })
              .catch((err) => {
                console.error("Error fetching data:", err)
                setError("Failed to fetch weather data.")
                setIsLoading(false)
              })
          },
          (err) => {
            console.error("Error getting current location:", err)
            setError("Failed to get your current location. Please enable location services.")
            setIsLoading(false)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
      } else {
        setError("Geolocation is not supported by this browser.")
        setIsLoading(false)
      }
    }

    getCurrentLocationWeather()
  }, [])

  // Weather icon mapping
  const getWeatherIcon = (weather) => {
    if (!weather || !weather.weather?.[0]) return <CloudRain size={48} className="text-chart-2" />

    const weatherMain = weather.weather[0].main.toLowerCase()

    if (weatherMain.includes("rain")) {
      return <CloudRain size={48} className="text-chart-2" />
    } else if (weatherMain.includes("clear")) {
      return <Sun size={48} className="text-chart-1" />
    } else if (weatherMain.includes("cloud")) {
      return <Cloud size={48} className="text-muted-foreground" />
    } else if (weatherMain.includes("thunder")) {
      return <CloudLightning size={48} className="text-chart-3" />
    } else if (weatherMain.includes("snow")) {
      return <CloudSnow size={48} className="text-chart-4" />
    } else if (weatherMain.includes("drizzle")) {
      return <CloudDrizzle size={48} className="text-chart-5" />
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
    if (locationInfo?.city) return locationInfo.city
    return "Unknown Location"
  }

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

      {error && !isLoading && (
        <div className="text-center py-4 bg-red-50 rounded-lg">
          <p className="text-red-500 flex items-center justify-center">
            <CloudLightning size={20} className="mr-2" />
            {error}
          </p>
        </div>
      )}

      {currentWeather && !isLoading && !error && (
        <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-card dark:to-card/80 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-foreground">{formatTemp(currentWeather.main?.temp)}</div>
              <div className="text-sm text-muted-foreground">{getCityName()}</div>
              <div className="text-xs text-muted-foreground mt-1 capitalize">
                {currentWeather.weather?.[0]?.description}
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-background rounded-full shadow-md">{getWeatherIcon(currentWeather)}</div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-border grid grid-cols-3 gap-2 text-center">
            <div className="text-xs">
              <div className="font-semibold">Humidity</div>
              <div>{currentWeather.main?.humidity || "N/A"}%</div>
            </div>
            <div className="text-xs">
              <div className="font-semibold">Wind</div>
              <div>{currentWeather.wind?.speed || "N/A"} m/s</div>
            </div>
            <div className="text-xs">
              <div className="font-semibold">Pressure</div>
              <div>{currentWeather.main?.pressure || "N/A"} hPa</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherDashboard