
# shortener/views.py
from django.shortcuts import get_object_or_404, redirect
from django.http import Http404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ShortURL, ClickEvent
from .serializers import ShortURLSerializer, ShortURLCreateSerializer, AnalyticsSerializer
import re

class ShortURLListCreateView(generics.ListCreateAPIView):
    queryset = ShortURL.objects.all().order_by('-created_at')
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ShortURLCreateSerializer
        return ShortURLSerializer


class ShortURLDetailView(generics.RetrieveDestroyAPIView):
    queryset = ShortURL.objects.all()
    serializer_class = ShortURLSerializer


class ShortURLAnalyticsView(APIView):
    def get(self, request, pk):
        try:
            url = ShortURL.objects.get(pk=pk)
            serializer = AnalyticsSerializer(url)
            return Response(serializer.data)
        except ShortURL.DoesNotExist:
            raise Http404


def redirect_url(request, short_code):
    short_url = get_object_or_404(ShortURL, short_code=short_code)
    print('============redirect_url',short_url)
    # Extract information for analytics
    ip_address = request.META.get('REMOTE_ADDR')
    referrer = request.META.get('HTTP_REFERER')
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    
    # Simple device detection
    device_type = 'desktop'
    if re.search(r'Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini', user_agent):
        device_type = 'mobile'
    elif re.search(r'iPad|Tablet', user_agent):
        device_type = 'tablet'
    
    # Record click event
    ClickEvent.objects.create(
        short_url=short_url,
        ip_address=ip_address,
        referrer=referrer,
        user_agent=user_agent,
        device_type=device_type
    )
    print('============redirect_url==========')

    return redirect(short_url.original_url)



