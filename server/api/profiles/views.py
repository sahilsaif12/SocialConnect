from django.shortcuts import render

from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db.models import Q

from api.utlls import SupabaseStorage
from .models import Profile, Follow
from .serializers import ProfileSerializer, ProfileUpdateSerializer, UserListSerializer
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser


User = get_user_model()

def _ensure_profile(user):
    profile, _ = Profile.objects.get_or_create(user=user)
    return profile

def _can_view_profile(request_user, target_user, profile):
    if request_user and (request_user.is_staff or request_user == target_user):
        return True
    vis = profile.visibility
    if vis == Profile.Visibility.PUBLIC:
        return True
    if vis == Profile.Visibility.PRIVATE:
        return False
    if vis == Profile.Visibility.FOLLOWERS_ONLY:
        if not request_user or not request_user.is_authenticated:
            return False
        return Follow.objects.filter(follower=request_user, following=target_user).exists()
    return False



class UserDetailView(APIView):
    """
    GET /api/users/{username}/ 
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        profile = _ensure_profile(user)
        if not _can_view_profile(request.user, user, profile):
            return Response({"message": "This profile is not available for you"}, status=400)
        data = ProfileSerializer(profile, context={'request': request}).data
        return Response(data)

    
    def put(self, request,username):
        return Response({"msg":"hello"},status=200)




class MeProfileView(APIView):
    """
    GET /api/users/me/ -> get own profile
    PATCH /api/users/me/ - > update own profile
    """
    permission_classes = [IsAuthenticated]
    http_method_names = [ 'patch','get' ]  

    def get(self, request):
        profile = _ensure_profile(request.user)
        return Response(ProfileSerializer(profile).data)

    def patch(self, request):
        profile = _ensure_profile(request.user)
        ser = ProfileUpdateSerializer(profile, data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ProfileSerializer(profile).data)

class UserListView(generics.ListAPIView):
    """
    GET /api/users/?q=search  
    """
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserListSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        qs = super().get_queryset()
        
        q = self.request.query_params.get("q")

        if q:
            qs = qs.filter(
                Q(username__icontains=q) |
                Q(first_name__icontains=q) |
                Q(last_name__icontains=q)
            )
        
        return qs

class AvatarUploadView(APIView):
    """
    POST /api/users/me/avatar/  (multipart/form-data: file=<image>)
    Validates, uploads to Supabase Storage, saves profile.avatar_url
    """
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):

        file = request.FILES.get("file")
        if not file:
            return Response({"detail": "No file provided."}, status=400)

        # Basic validation
        if file.content_type not in ("image/png", "image/jpeg","image/jpg"):
            return Response({"detail": "Only PNG or JPEG allowed."}, status=400)

        if file.size > 2 * 1024 * 1024:
            return Response({"detail": "File too large (max 2MB)."}, status=400)
        
        # return Response({"detail": "working"}, status=200)

        storage = SupabaseStorage()
        file_path = f"avatars/user_{request.user.id}/{file}"
        res=storage.upload_file(file,'avatars',file_path)
        if res.get("success"):
            public_url=res.get("public_url")
            profile = _ensure_profile(request.user)
            profile.avatar_url = public_url
            profile.save(update_fields=["avatar_url"])
            return Response({"avatar_url": public_url}, status=200)
        
        return Response({"detail": "Unable to upload the profile picture, try again laterr"}, status=500)



