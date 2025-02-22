from rest_framework import serializers
from app.models import LocationRating

class ScoreSerializer(serializers.Serializer):
    score = serializers.IntegerField(min_value=0, max_value=5000)  # Validate that score is between 0 and 5000

    def validate_value(self, score):
        # Additional validation (optional)
        if score < 0 or score > 5000:
            raise serializers.ValidationError("Score must be between 0 and 5000.")
        return score




class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationRating
        fields = ['location', 'rating']

    def validate_rating(self, value):
        if not (0 <= value <= 5):  # You can change the range to fit your needs
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value

    def validate(self, data):
        user = self.context['request'].user  # Get the user from request context
        location = data['location']

        # Check if the user has already rated this location
        if LocationRating.objects.filter(user=user, location=location).exists():
            raise serializers.ValidationError("You have already rated this location.")
        
        return data