# models.py
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class WeatherSearch(models.Model):
    city = models.CharField(max_length=100)
    lat = models.FloatField()
    lon = models.FloatField()
    address = models.CharField(max_length=255, null=True, blank=True)
    location_name = models.CharField(max_length=100, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    search_date = models.DateTimeField(default=timezone.now)
    temperature = models.FloatField(null=True, blank=True)
    weather_description = models.CharField(max_length=100, null=True, blank=True)
    
    class Meta:
        ordering = ['-search_date']
    
    def __str__(self):
        return f"{self.location_name or self.city} ({self.search_date.strftime('%Y-%m-%d %H:%M')})"

