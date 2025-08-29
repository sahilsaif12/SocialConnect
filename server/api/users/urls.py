from django.urls import path
from .views import LoginView, LogoutView, PasswordResetConfirmView, PasswordResetView, RegisterView, VerifyEmailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView().as_view(), name="register"),
    path("verify-email/", VerifyEmailView().as_view(), name="verify-email"),
    path("login/", LoginView().as_view(), name="login"),
    path("password-reset/", PasswordResetView().as_view(), name="password-reset"),
    path("password-reset-confirm/", PasswordResetConfirmView().as_view(), name="password-reset-confirm"),
    path("token/refresh/", TokenRefreshView().as_view(), name="token-refresh"),
    path("logout/", LogoutView().as_view(), name="logout"),
]
