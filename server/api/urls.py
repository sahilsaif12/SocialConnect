from django.http import JsonResponse
from django.urls import path, include

urlpatterns = [
    # Example:
    # path("users/", include("apps.users.urls")),
]

def ping(request):
    return JsonResponse({"ping": "pong"})

urlpatterns = [
    path("ping/", ping, name="ping"),
]