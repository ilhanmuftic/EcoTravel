from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from app.models import Score  # Import your Score model
from django.db.models import Sum

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        total_score = Score.objects.filter(user=user).aggregate(Sum('score'))['score__sum'] or 0

        return Response({
            "username": user.username,
            "score": total_score
        })
