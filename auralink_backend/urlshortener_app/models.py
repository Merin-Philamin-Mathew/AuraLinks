# shortener/models.py
from django.db import models
import random
import string
from django.utils import timezone

class ShortURL(models.Model):
    original_url = models.URLField(max_length=1000)
    short_code = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.short_code} -> {self.original_url[:50]}"

    @classmethod
    def generate_short_code(cls, length=6):
        """Generate a random short code"""
        chars = string.ascii_letters + string.digits
        while True:
            short_code = ''.join(random.choice(chars) for _ in range(length))
            if not cls.objects.filter(short_code=short_code).exists():
                return short_code


class ClickEvent(models.Model):
    short_url = models.ForeignKey(ShortURL, on_delete=models.CASCADE, related_name='clicks')
    clicked_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    referrer = models.CharField(max_length=500, null=True, blank=True)
    user_agent = models.CharField(max_length=500, null=True, blank=True)
    device_type = models.CharField(max_length=20, null=True, blank=True) 
    
    def __str__(self):
        return f"Click on {self.short_url.short_code} at {self.clicked_at}"

