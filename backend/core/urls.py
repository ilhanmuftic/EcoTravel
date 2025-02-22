# myproject/urls.py
from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),        # Admin interface
    re_path('', include('app.urls')), # Routes to the app's URLs
]
