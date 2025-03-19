from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auralink_backend.settings')
app = Celery('auralink_backend')

app.config_from_object('django.conf:settings', namespace='CELERY')

# Automatically discover tasks in all installed apps
app.autodiscover_tasks()
# from .celery import app as celery_app

# __all__ = ('celery_app',)