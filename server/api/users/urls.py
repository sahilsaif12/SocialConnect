from django.urls import path
from .views import LoginView, PasswordResetConfirmView, PasswordResetView, RegisterView, VerifyEmailView

urlpatterns = [
    path("register/", RegisterView().as_view(), name="register"),
    path("verify-email/", VerifyEmailView().as_view(), name="verify-email"),
    path("login/", LoginView().as_view(), name="login"),
    path("password-reset/", PasswordResetView().as_view(), name="password-reset"),
    path("password-reset-confirm/", PasswordResetConfirmView().as_view(), name="password-reset-confirm"),

]
