from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    image = serializers.ImageField(use_url=True)  # ← this is the fix

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'image', 'author', 'created_at']