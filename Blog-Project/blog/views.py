from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer


# ================== AUTH ==================

@api_view(["POST"])
@permission_classes([AllowAny])
def api_register(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username & password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    token, _ = Token.objects.get_or_create(user=user)

    return Response({"token": token.key}, status=201)


@api_view(["POST"])
@permission_classes([AllowAny])
def api_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid credentials"}, status=401)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key}, status=200)


# ================== BLOG CRUD ==================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def posts(request):
    """
    GET  → list all posts of logged-in user
    POST → create new post
    """

    # 🔹 LIST POSTS
    if request.method == "GET":
        all_posts = Post.objects.filter(author=request.user).order_by("-id")
        serializer = PostSerializer(all_posts, many=True)
        return Response(serializer.data, status=200)

    # 🔹 CREATE POST
    if request.method == "POST":
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def post_detail(request, pk):
    """
    GET    → retrieve single post (for Edit page)
    PUT    → update post
    DELETE → delete post
    """

    try:
        post = Post.objects.get(pk=pk, author=request.user)
    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=404)

    # 🔹 GET SINGLE POST
    if request.method == "GET":
        serializer = PostSerializer(post)
        return Response(serializer.data, status=200)

    # 🔹 UPDATE POST
    if request.method == "PUT":
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    # 🔹 DELETE POST
    if request.method == "DELETE":
        post.delete()
        return Response({"message": "Post deleted"}, status=204)
