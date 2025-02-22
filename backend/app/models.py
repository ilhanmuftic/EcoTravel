from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User


class Location(models.Model):
    name = models.CharField(max_length=255)  # Name of the location
    city = models.CharField(max_length=255)  # City where the location is
    lat = models.FloatField()  # Latitude
    lng = models.FloatField()  # Longitude
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically sets the creation time
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)  # Soft delete field
    is_approved = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        """Override the delete method to perform a soft delete."""
        self.deleted_at = now()
        self.save()

    def restore(self):
        """Restore a soft-deleted record."""
        self.deleted_at = None
        self.save()

    @property
    def is_deleted(self):
        return self.deleted_at is not None
    
    @property
    def average_rating(self):
        # Get the ratings for the location
        ratings = LocationRating.objects.filter(location=self)
        if ratings.exists():
            return sum(rating.rating for rating in ratings) / ratings.count()
        return 0

    
    class Meta:
        unique_together = ('lat', 'lng')


class Score(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the User model
    score = models.IntegerField()  # Score of the player
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically sets the creation time



class LocationRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the User model
    location = models.ForeignKey(Location, related_name='ratings', on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=[(i, str(i)) for i in range(1, 6)])  # Rating from 1 to 5
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically sets the creation time

    class Meta:
        unique_together = ('user', 'location')  # A user can only rate a location once
