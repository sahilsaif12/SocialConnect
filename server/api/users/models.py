from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ("user", "User"),
        ("admin", "Admin"),
    )
    
    first_name = models.CharField(max_length=30, blank=False)  
    last_name = models.CharField(max_length=30, blank=False)   
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="user")
    email = models.EmailField(unique=True,blank=False)
    last_login_at = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return self.username
