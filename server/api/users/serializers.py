import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from rest_framework.validators import UniqueValidator

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        min_length=8,
        error_messages={
            'required': 'Password is required',
            'min_length': 'Password must be at least 8 characters long',
            'blank': 'Password cannot be blank'
        }
    )
    
    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message="This email is already registered with another account"
)],
        error_messages={
            'required': 'Email address is required',
            'invalid': 'Please enter a valid email address',
            'blank': 'Email cannot be empty',
        }
    )
    
    username = serializers.CharField(
         validators=[
            RegexValidator(
                regex=r'^[a-zA-Z0-9_]{3,30}$',
                message="Username must be 3-30 characters, alphanumeric with underscores only."
            )
        ],
        error_messages={
            'required': 'Username is required',
            'invalid': 'Username can only contain letters, numbers and @/./+/-/_ characters',
            'max_length': 'Username cannot exceed 30 characters',
            'unique': 'This username is already taken',
            'blank': 'username cannot be empty',
        }
    )
    
    first_name = serializers.CharField(
        error_messages={
            'required': 'First name is required',
            'blank': 'First name cannot be blank',
            'max_length': 'First name cannot exceed 30 characters'
        }
    )
    
    last_name = serializers.CharField(
        error_messages={
            'required': 'Last name is required',
            'blank': 'Last name cannot be blank',
            'max_length': 'Last name cannot exceed 30 characters'
        }
    )


    class Meta:
        model = User
        fields = ["id", "email", "username", "password","first_name","last_name"]


  
    def create(self, validated_data):
        user = User(
            email=validated_data["email"],
            username=validated_data.get("username", validated_data["email"])
        )
        user.set_password(validated_data["password"])  # hash password
        user.is_active = False 
        user.save()
        return user
