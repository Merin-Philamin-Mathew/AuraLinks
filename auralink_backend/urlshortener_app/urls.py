
# shortener/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('urls/', views.ShortURLListCreateView.as_view(), name='url-list-create'),
    path('urls/<int:pk>/', views.ShortURLDetailView.as_view(), name='url-detail'),
    path('urls/<int:pk>/analytics/', views.ShortURLAnalyticsView.as_view(), name='url-analytics'),
    path('<str:short_code>/', views.redirect_url, name='redirect-url'),
]
