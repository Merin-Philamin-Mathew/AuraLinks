
# shortener/admin.py
from django.contrib import admin
from .models import ShortURL, ClickEvent

@admin.register(ShortURL)
class ShortURLAdmin(admin.ModelAdmin):
    list_display = ('short_code', 'original_url', 'created_at', 'clicks_count')
    search_fields = ('short_code', 'original_url')
    readonly_fields = ('created_at',)
    
    def clicks_count(self, obj):
        return obj.clicks.count()
    clicks_count.short_description = 'Clicks'

@admin.register(ClickEvent)
class ClickEventAdmin(admin.ModelAdmin):
    list_display = ('short_url', 'clicked_at', 'ip_address', 'referrer', 'device_type')
    list_filter = ('device_type', 'clicked_at')
    search_fields = ('short_url__short_code', 'referrer')
    readonly_fields = ('clicked_at',)