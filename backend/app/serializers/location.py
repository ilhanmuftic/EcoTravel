from rest_framework import serializers
from app.models import Location
from app.constants.validation import MAX_LAT, MAX_LNG, MIN_LAT, MIN_LNG
from app.utils.handlers import WrapperException
from app.constants.error import LOCATION_ALREADY_EXISTS
import logging

logger = logging.getLogger(__name__)

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class CreateLocationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    lat = serializers.FloatField()
    lng = serializers.FloatField()
    city = serializers.CharField(max_length=255, required=False)

    def validate_lat(self, value):
        """Ensure latitude is within the valid range for Bosnia and Herzegovina."""
        if not (MIN_LAT <= value <= MAX_LAT):
            raise serializers.ValidationError(
                f"Latitude must be between {MIN_LAT} and {MAX_LAT} for Bosnia and Herzegovina."
            )
        return value

    def validate_lng(self, value):
        """Ensure longitude is within the valid range for Bosnia and Herzegovina."""
        if not (MIN_LNG <= value <= MAX_LNG):
            raise serializers.ValidationError(
                f"Longitude must be between {MIN_LNG} and {MAX_LNG} for Bosnia and Herzegovina."
            )
        return value        
    
    def validate(self, data):
        """
        Ensure that a location with the same latitude and longitude doesn't already exist.
        """
        lat = data.get('lat')
        lng = data.get('lng')

        # Check if a location with the same lat and lng already exists
        if Location.objects.filter(lat=lat, lng=lng).exists():
            # If location exists, raise WrapperException with the error key
            raise WrapperException(LOCATION_ALREADY_EXISTS)

        return data
    
    def create(self, validated_data):
        return Location.objects.create(**validated_data)