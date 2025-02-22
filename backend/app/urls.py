from django.urls import re_path, path
from app.views import OkView, LocationListView, RandomLocationView, RegisterUser, LoginUser
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    re_path('ok/?$', OkView.as_view(), name='ok'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path('locations/?$', LocationListView.as_view(), name="locations"),
    re_path('random-location/?$', RandomLocationView.as_view(), name="random-location")
]
