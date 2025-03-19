# tasks.py
from celery import shared_task
from datetime import timedelta
from django.utils import timezone
from .models import WeatherSearch
from .utils import get_weather_by_coordinates  

@shared_task
def update_weather_data():
    """Task to update weather data for recent searches"""
    print('==========================')
    print('==========================')
    print('update_weather_data')
    recent_time = timezone.now() - timedelta(hours=24)
    
    # Fix the distinct query by adding ORDER BY that matches the DISTINCT ON columns
    recent_searches = WeatherSearch.objects.filter(search_date__gte=recent_time).order_by(
        'city', 'lat', 'lon', '-search_date'
    ).distinct('city', 'lat', 'lon')
    
    for search in recent_searches:
        try:
            weather_data = get_weather_by_coordinates(search.lat, search.lon)
            if weather_data and 'main' in weather_data and 'temp' in weather_data['main']:
                weather_description = weather_data.get('weather', [{}])[0].get('description', '')
                # Create a new entry with updated temperature
                new_search = WeatherSearch(
                    city=search.city,
                    location_name=search.location_name,
                    address=search.address,
                    lat=search.lat,
                    lon=search.lon,
                    temperature=weather_data['main']['temp'],
                    weather_description=weather_description,
                    user=search.user
                )
                print(new_search,'=========================')
                new_search.save()
        except Exception as e:
            print(f"Error updating weather for {search.city}: {str(e)}")
    
    return f"Updated weather data for {len(recent_searches)} locations"