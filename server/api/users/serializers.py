import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from rest_framework.validators import UniqueValidator
from django.conf import settings

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
                regex=r'^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*_)[a-zA-Z0-9_]{3,30}$',
                message="Username must be 3-30 characters, contain at least one letter, one number, and one underscore. Only alphanumeric characters and underscores are allowed."
            ),

            UniqueValidator(
                queryset=User.objects.all(),
                message="This username is already taken. Please choose another one."
            )
        ],
        error_messages={
            'required': 'Username is required',
            'max_length': 'Username cannot exceed 30 characters',
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
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"]
        )
        user.set_password(validated_data["password"])  # hash password
        user.is_active = False 
        user.save()
        return user



# apps/authentication/serializers.py
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(write_only=True)  # can be username or email
    password = serializers.CharField(write_only=True, style={"input_type": "password"})
    
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        user = obj["user"]
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_active": user.is_active,
        }

    def validate(self, attrs):
        identifier = attrs.get("identifier")
        password = attrs.get("password")

        try:
            user = User.objects.get(email__iexact=identifier)
        except User.DoesNotExist:
            try:
                user = User.objects.get(username__iexact=identifier)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")

        if not user.is_active:
            raise serializers.ValidationError("Please verify your email to activate your account. we have already sent you a verification email before")

        user.last_login_at= timezone.now()
        user.save(update_fields=["last_login_at"])

        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        return {
            "refresh": str(refresh),
            "access": access,
            "user":self.get_user({"user": user}),
        }




from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
           self.user = User.objects.get(email=value)
        except User.DoesNotExist:
            self.user= None

        return value

    def save(self, **kwargs):
        user = self.user
        if user:
            print("user",user,user.email)
            uid = urlsafe_base64_encode(smart_bytes(user.username))
            token = PasswordResetTokenGenerator().make_token(user)

            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
            print("user---",uid,token,reset_url)


            send_mail(
                "Password Reset",
                f"Click here to reset your password: {reset_url}",
                "no-reply@example.com",
                [user.email],
                fail_silently=False,
            )
            return reset_url
        




from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    password = serializers.CharField(
        write_only=True, 
        min_length=8,
        error_messages={
            'required': 'Password is required',
            'min_length': 'Password must be at least 8 characters long',
            'blank': 'Password cannot be blank'
        }
    )
    def validate(self, attrs):
        try:
            uid = smart_str(urlsafe_base64_decode(attrs.get("uid")))
            user = User.objects.get(username=uid)

            token = attrs.get("token")
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError("This reset password credentials/url are not valid anymore")

            self.user = user
        except (ValueError, TypeError, OverflowError, User.DoesNotExist,DjangoUnicodeDecodeError):
            raise serializers.ValidationError("You are not authorized to update the password")
        
        return attrs

    def save(self, **kwargs):
        password = self.validated_data.get("password")
        self.user.set_password(password)
        self.user.save()
        return self.user



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'last_login_at','is_active']
        read_only_fields = ['id','email', 'date_joined', 'last_login_at']
        

    def to_representation(self, instance):
        """Override to conditionally include sensitive fields"""
        representation = super().to_representation(instance)
        
        # Check if this is the requesting user's own profile
        request = self.context.get('request')
        if request and request.user != instance:
            # Remove sensitive fields for other users
            representation.pop('email', None)
            representation.pop('date_joined', None)
            representation.pop('last_login_at', None)
            representation.pop('is_active', None)
        
        return representation

