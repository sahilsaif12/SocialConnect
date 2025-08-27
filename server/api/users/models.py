from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ("user", "User"),
        ("admin", "Admin"),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="user")
    email = models.EmailField(unique=True)
    last_login_at = models.DateTimeField(null=True, blank=True)

    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username
