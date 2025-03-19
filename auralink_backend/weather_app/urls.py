# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('coordinates/', views.weather_by_coordinates, name='weather_by_coordinates'),
    path('recent/', views.get_recent_searches, name='get_recent_searches'),
]