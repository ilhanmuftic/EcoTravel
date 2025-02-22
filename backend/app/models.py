from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser


from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Add custom fields here, if any
    # Example:
    # birth_date = models.DateField(null=True, blank=True)

    # Modify groups and user_permissions fields to avoid the clash
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # Custom related name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',  # Custom related name
        blank=True
    )

    def __str__(self):
        return self.username

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
    
    class Meta:
        unique_together = ('lat', 'lng')