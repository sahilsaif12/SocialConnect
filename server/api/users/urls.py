from django.urls import path
from .views import LoginView, PasswordResetView, RegisterView, VerifyEmailView

urlpatterns = [
    path("register/", RegisterView().as_view(), name="register"),
    path("verify-email/", VerifyEmailView().as_view(), name="verify-email"),
    path("login/", LoginView().as_view(), name="register"),
    path("password-reset/", PasswordResetView().as_view(), name="register"),

]
