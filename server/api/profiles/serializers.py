from rest_framework import serializers
from api.users.models import User
from api.users.serializers import UserSerializer


from .models import Profile, Follow



class ProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    posts_count = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = (
            "bio", "avatar_url", "website", "location", "visibility","user",
            "followers_count", "following_count", "posts_count",
        )

    def get_followers_count(self, obj):
        return Follow.objects.filter(following=obj.user).count()

    def get_following_count(self, obj):
        return Follow.objects.filter(follower=obj.user).count()

    def get_posts_count(self, obj):
        # return obj.user.posts.count()
        return 0

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("bio", "website", "location", "visibility")

    def validate_bio(self, v):
        if len(v) > 160:
            raise serializers.ValidationError("Bio must be at most 160 characters.")
        return v

class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "first_name","last_name")
