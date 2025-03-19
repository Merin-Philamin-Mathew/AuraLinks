from django.urls import path
from .views import *

urlpatterns = [
  path('test-cors/', test_cors, name='test_cors'),

    path('csrf/', get_csrf_token, name='csrf_token'),
    path('callback/', redirect_to_frontend, name='csrf_token'),
]