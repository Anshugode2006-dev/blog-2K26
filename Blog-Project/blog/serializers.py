from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'image', 'author', 'created_at']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"https://akshitgode.pythonanywhere.com{obj.image.url}"
        return None