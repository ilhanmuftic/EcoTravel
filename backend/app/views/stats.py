
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Score, LocationRating
from rest_framework.views import APIView
from app.serializers.score import ScoreSerializer, RatingSerializer
from django.db.models import Sum
from django.contrib.auth.models import User




class PostScoreView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    serializer_class = ScoreSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        score_value = request.data.get('score')

        if serializer.is_valid():  # Check if the data is valid
            score_value = serializer.validated_data['score']  # Get validated data

            # Create the score object
            score = Score.objects.create(user=request.user, score=score_value)

            return Response({"message": "Score posted successfully."}, status=status.HTTP_201_CREATED)
        
        # If the data is not valid, return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LeaderboardView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        # Aggregate scores per user
        leaderboard = Score.objects.values('user') \
            .annotate(total_score=Sum('score')) \
            .order_by('-total_score')[:3]  # Get top 3 players by total score

        # Prepare the response data
        top_players = [
            {
                'username': User.objects.get(id=entry['user']).username,  # Get the username by user ID
                'total_score': entry['total_score']
            }
            for entry in leaderboard
        ]

        return Response(top_players, status=status.HTTP_200_OK)
    

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class PostRatingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        location_id = request.data.get('location')  # Assuming location_id is provided in the request
        rating_value = request.data.get('rating')  # Assuming rating value is provided in the request

        # Use update_or_create to either update the existing rating or create a new one
        rating, created = LocationRating.objects.update_or_create(
            user=user, 
            location_id=location_id,  # Matching user and location
            defaults={'rating': rating_value}  # If found, update the rating value
        )

        # Respond with different messages based on whether it's an update or creation
        if created:
            return Response({"detail": "Rating submitted successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Rating updated successfully."}, status=status.HTTP_200_OK)