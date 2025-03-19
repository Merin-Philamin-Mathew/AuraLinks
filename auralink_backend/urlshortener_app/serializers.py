
# shortener/serializers.py
from rest_framework import serializers
from .models import ShortURL, ClickEvent
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

class ClickEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClickEvent
        fields = ['id', 'clicked_at', 'referrer', 'device_type']


class ShortURLSerializer(serializers.ModelSerializer):
    clicks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ShortURL
        fields = ['id', 'original_url', 'short_code', 'created_at', 'clicks_count']
    
    def get_clicks_count(self, obj):
        return obj.clicks.count()


class ShortURLCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortURL
        fields = ['original_url', 'short_code']
    
    def validate_short_code(self, value):
        if value:
            if ShortURL.objects.filter(short_code=value).exists():
                raise serializers.ValidationError("This short code is already in use.")
            return value
        return None
    
    def create(self, validated_data):
        if not validated_data.get('short_code'):
            validated_data['short_code'] = ShortURL.generate_short_code()
        return super().create(validated_data)


class AnalyticsSerializer(serializers.ModelSerializer):
    total_clicks = serializers.SerializerMethodField()
    daily_clicks = serializers.SerializerMethodField()
    referrer_breakdown = serializers.SerializerMethodField()
    device_breakdown = serializers.SerializerMethodField()
    
    class Meta:
        model = ShortURL
        fields = ['id', 'short_code', 'total_clicks', 'daily_clicks', 'referrer_breakdown', 'device_breakdown']
    
    def get_total_clicks(self, obj):
        return obj.clicks.count()
    
    def get_daily_clicks(self, obj):
        # Last 7 days of clicks
        last_week = timezone.now() - timedelta(days=7)
        daily_data = obj.clicks.filter(
            clicked_at__gte=last_week
        ).extra(
            select={'day': "DATE(clicked_at)"}
        ).values('day').annotate(count=Count('id')).order_by('day')
        
        return [{'date': item['day'], 'clicks': item['count']} for item in daily_data]
    
    def get_referrer_breakdown(self, obj):
        referrer_data = obj.clicks.values('referrer').annotate(
            count=Count('id')
        ).order_by('-count')
        
        return [{'source': item['referrer'] or 'Direct', 'count': item['count']} for item in referrer_data]
    
    def get_device_breakdown(self, obj):
        device_data = obj.clicks.values('device_type').annotate(
            count=Count('id')
        ).order_by('-count')
        
        return [{'name': item['device_type'] or 'Unknown', 'count': item['count']} for item in device_data]
