from django.urls import re_path, path
from app.views import OkView, LocationListView, RandomLocationView, RegisterUser,  \
    LoginUser, LocationRetrieveUpdateDeleteView, PostScoreView, LeaderboardView, PostRatingView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    re_path('ok/?$', OkView.as_view(), name='ok'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path('locations/?$', LocationListView.as_view(), name="locations"),
    re_path(r'^locations/(?P<pk>\d+)/$', LocationRetrieveUpdateDeleteView.as_view(), name="location_retrieve_update_delete"),
    re_path('random-location/?$', RandomLocationView.as_view(), name="random-location"),
    re_path('score/?$', PostScoreView.as_view(), name="score"),
    re_path('leaderboard/?$', LeaderboardView.as_view(), name='leaderboard'),
    path('rate-location/', PostRatingView.as_view(), name='rate-location'),

]
