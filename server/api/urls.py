from django.http import JsonResponse
from django.urls import path, include


def ping(request):
    return JsonResponse({"ping": "pong"})

urlpatterns = [
    path("auth/", include("api.users.urls")),
    path("users/", include("api.profiles.urls")),
    path("ping/", ping, name="ping"),

]