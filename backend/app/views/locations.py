from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from app.models import Location
from app.serializers.location import LocationSerializer, CreateLocationSerializer
from django.db.models import Avg
from django_filters import OrderingFilter
from rest_framework.pagination import CursorPagination
from django.db.models.functions import Coalesce
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from django.db.models import Avg
from ..models import LocationRating



class LocationListView(ListCreateAPIView):
    queryset = Location.objects.filter(deleted_at=None)
    def get_serializer_class(self):
        """Dynamically choose serializer class"""
        if self.request.method == 'POST':
            return CreateLocationSerializer  
        return LocationSerializer  


class LocationRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.filter(deleted_at=None)
    serializer_class = LocationSerializer


class RandomLocationView(RetrieveAPIView):
    serializer_class = LocationSerializer

    def get_object(self):
        return Location.objects.order_by('?').first()    
    

from rest_framework import serializers

class TopLocationSerializer(serializers.Serializer):
    location = serializers.IntegerField()  # Location ID
    location_name = serializers.CharField()  # Location name
    location_lat = serializers.FloatField()  # Location latitude
    location_lng = serializers.FloatField()  # Location longitude
    average_rating = serializers.FloatField()  # Average rating for the location

class TopRatedLocationsView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = TopLocationSerializer
    pagination_class = None

    def get_queryset(self):
        """Get average rating per location and order by highest rating."""
        # Aggregate average rating for each location and order by highest rating
        location_ratings = LocationRating.objects.values('location').annotate(
            average_rating=Avg('rating')
        ).order_by('-average_rating')

        # Fetch the corresponding Location objects based on the location IDs
        locations_with_ratings = []
        for location_rating in location_ratings:
            location = Location.objects.get(id=location_rating['location'])
            location_rating['location_name'] = location.name
            location_rating['location_lat'] = location.lat
            location_rating['location_lng'] = location.lng
            locations_with_ratings.append(location_rating)

        return locations_with_ratings
