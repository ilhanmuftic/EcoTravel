from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from app.utils.handlers import WrapperException
from app.constants.error import USERNAME_PASSWORD_REQUIRED


class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password:
            raise WrapperException(USERNAME_PASSWORD_REQUIRED)
        user = User.objects.create_user(username=username, password=password, email=email)

        # Generate JWT Token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            "message": "User created successfully",
            "access": access_token,
            "refresh": str(refresh)
        }, status=status.HTTP_201_CREATED)


class LoginUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({"access": access_token, "refresh": str(refresh)}, status=status.HTTP_200_OK)
