# weather_app/utils.py
import requests
from django.conf import settings

def get_weather_by_coordinates(lat, lon):
    """Fetch weather data from OpenWeatherMap API by coordinates"""
    api_key = settings.OPENWEATHERMAP_API_KEY
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else None

def get_forecast_by_coordinates(lat, lon, count=24):
    """Fetch forecast data from OpenWeatherMap API by coordinates"""
    api_key = settings.OPENWEATHERMAP_API_KEY
    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&cnt={count}&appid={api_key}&units=metric"
    
    response = requests.get(url)
    return response.json() if response.status_code == 200 else None