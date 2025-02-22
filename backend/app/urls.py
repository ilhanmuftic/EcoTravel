from django.urls import re_path
from app.views import OkView, LocationListView, RandomLocationView

urlpatterns = [
    re_path('ok/?$', OkView.as_view(), name='ok'),
    re_path('locations/?$', LocationListView.as_view(), name="locations"),
    re_path('random-location/?$', RandomLocationView.as_view(), name="random-location")
]
