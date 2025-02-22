from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from app.models import Location
from app.serializers.location import LocationSerializer, CreateLocationSerializer
from django.db.models import Avg
from django_filters import OrderingFilter
from rest_framework.pagination import CursorPagination
from django.db.models.functions import Coalesce



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
    
