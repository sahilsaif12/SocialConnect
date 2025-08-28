from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from django.core.signing import TimestampSigner
from django.core.mail import send_mail
from django.conf import settings

User = get_user_model()
signer = TimestampSigner()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    def perform_create(self, serializer):
        """Override to return the created user instance"""
        return serializer.save()  # This returns the user object

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=self.perform_create(serializer)
        token = signer.sign(user.email)

        verification_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"
        try:
            send_mail(
                "Verify your email",
                f"Click to verify and activate your account: {verification_url}",
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                # fail_silently=False,
            )
        except Exception as e:
            print("Error while sending email:", e)

        headers = self.get_success_headers(serializer.data)

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED,headers=headers,)
