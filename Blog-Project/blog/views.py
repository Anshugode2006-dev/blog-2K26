from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Post
import json


# React Home
def home(request):
    return render(request, "index.html")


# ---------- REGISTER ----------
@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return JsonResponse({"error": "Username and password required"}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "User already exists"}, status=400)

        User.objects.create_user(username=username, password=password)
        return JsonResponse({"message": "User created successfully"})

    return JsonResponse({"error": "Invalid request"}, status=400)


# ---------- LOGIN ----------
@csrf_exempt
def api_login(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return JsonResponse({"message": "Login success"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)


# ---------- LOGOUT ----------
def api_logout(request):
    logout(request)
    return JsonResponse({"message": "Logged out"})


# ---------- CREATE + READ ----------
@csrf_exempt
def create_blog(request):

    # CREATE
    if request.method == "POST":
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Login required"}, status=401)

        data = json.loads(request.body)
        title = data.get("title")
        content = data.get("content")

        Post.objects.create(title=title, content=content, author=request.user)
        return JsonResponse({"message": "Post created"})

    # READ
    posts = list(Post.objects.values())
    return JsonResponse(posts, safe=False)


# ---------- DELETE ----------
@csrf_exempt
def delete_blog(request, id):
    if request.method == "DELETE":
        try:
            post = Post.objects.get(id=id)

            if not request.user.is_authenticated:
                return JsonResponse({"error": "Login required"}, status=401)

            post.delete()
            return JsonResponse({"message": "Post deleted"})
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)


# ---------- UPDATE ----------
@csrf_exempt
def update_blog(request, id):
    if request.method == "PUT":
        try:
            post = Post.objects.get(id=id)

            if not request.user.is_authenticated:
                return JsonResponse({"error": "Login required"}, status=401)

            data = json.loads(request.body)
            post.title = data.get("title", post.title)
            post.content = data.get("content", post.content)
            post.save()

            return JsonResponse({"message": "Post updated"})
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)
