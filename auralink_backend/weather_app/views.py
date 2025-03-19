
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .utils import get_forecast_by_coordinates, get_weather_by_coordinates
from .models import WeatherSearch
@csrf_exempt
def weather_by_coordinates(request):
    """API endpoint to get weather and forecast by coordinates"""
    if request.method == 'POST':
        data = json.loads(request.body)
        lat = data.get('lat')
        lon = data.get('lon')
        address = data.get('address', '')
        location_name = data.get('location', '')
        city = data.get('city', '')
        
        if lat and lon:
            print('1')
            print('1')
            weather_data = get_weather_by_coordinates(lat, lon)
            forecast_data = get_forecast_by_coordinates(lat, lon, count=data.get('count', 24))
            if weather_data:
                # If city is not provided from frontend, use the one from weather data
                if not city:
                    city = weather_data.get('name', 'Unknown Location')
                
                # Save the search to database
                temperature = weather_data.get('main', {}).get('temp')
                weather_description = weather_data.get('weather', [{}])[0].get('description', '')
                print("==========================",city,location_name,address,lat,lon,temperature,weather_description)
                search = WeatherSearch(
                    city=city,
                    location_name=location_name,
                    address=address,
                    lat=lat,
                    lon=lon,
                    temperature=temperature,
                    weather_description=weather_description,
                    user=request.user if request.user.is_authenticated else None
                )
                search.save()
                
                return JsonResponse({
                    'success': True,
                    'weather': weather_data,
                    'forecast': forecast_data
                })
        
        return JsonResponse({
            'success': False,
            'error': 'Invalid coordinates or API error'
        })
    
    return JsonResponse({'success': False, 'error': 'Invalid request method'})

def get_recent_searches(request):
    """API endpoint to get recent searches for current user or all users"""
    if request.user.is_authenticated:
        searches = WeatherSearch.objects.filter(user=request.user)[:10]
    else:
        searches = WeatherSearch.objects.filter(user=None)[:10]
        
    results = []
    for search in searches:
        results.append({
            'id': search.id,
            'city': search.city,
            'location_name': search.location_name,
            'address': search.address,
            'lat': search.lat,
            'lon': search.lon,
            'temperature': search.temperature,
            'weather_description': search.weather_description,
            'search_date': search.search_date.strftime('%Y-%m-%d %H:%M')
        })
        
    return JsonResponse({'success': True, 'searches': results})

