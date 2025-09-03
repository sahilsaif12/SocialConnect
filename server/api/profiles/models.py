from django.db import models

# Create your models here.


from django.conf import settings

from django.contrib.auth import get_user_model
User = get_user_model()


# User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    class Visibility(models.TextChoices):
        PUBLIC = "public", "Public"
        PRIVATE = "private", "Private"
        FOLLOWERS_ONLY = "followers_only", "Followers Only"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.CharField(max_length=160, blank=True)
    avatar_url = models.URLField(blank=True,null=True)
    website = models.URLField(blank=True,null=True)
    location = models.CharField(max_length=100, blank=True)
    visibility = models.CharField(
        max_length=20, choices=Visibility.choices, default=Visibility.PUBLIC
    )

    def __str__(self):
        return f"Profile<{self.user_id}>"

class Follow(models.Model):
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="followers")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("follower", "following")

    def __str__(self):
        return f"{self.follower_id} -> {self.following_id}"
