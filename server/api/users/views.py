from django.shortcuts import render

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from api.utlls import SupabaseStorage
from .serializers import PasswordResetConfirmSerializer, PasswordResetSerializer, RegisterSerializer
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



from django.core.signing import BadSignature, SignatureExpired
from rest_framework.views import APIView
from rest_framework.response import Response

User = get_user_model()

class VerifyEmailView(APIView):
    def post(self, request):
        token = request.query_params.get("token")
        try:
            email_id = signer.unsign(token)  
            print("user_id",email_id)
            user = User.objects.get(email=email_id)
            user.is_active = True
            user.save()
            return Response({"message": "Email verified successfully."}, status=status.HTTP_200_OK)
        except (BadSignature, SignatureExpired, User.DoesNotExist):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)



from .serializers import LoginSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=200)
    



class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "If the email exists, a reset link has been sent on the mail for reset password."}, status=status.HTTP_200_OK)



class PasswordResetConfirmView(APIView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Your password has been updated successfully"})


from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except TokenError:
            return Response({"detail": "Invalid or expired refresh token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"detail": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)




class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "isAuthenticated": True,
            # "user": UserSerializer(request.user).data
        })

