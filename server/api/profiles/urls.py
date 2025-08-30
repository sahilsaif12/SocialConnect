
from django.urls import path

from .views import AvatarUploadView, MeProfileView, UserDetailView, UserListView

urlpatterns = [
    path("list/", UserListView.as_view(), name="users-list"),  
    path("me/avatar/", AvatarUploadView.as_view(), name="my-profile-avatar"),
    path("me/", MeProfileView.as_view(), name="my-profile"),
    path("<str:username>/", UserDetailView.as_view(), name="user-details"), # Keep this at last only
    # path("users/me/avatar/", AvatarUploadView.as_view(), name="me_avatar"),

]
