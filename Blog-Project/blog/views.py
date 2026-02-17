from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from .models import Post
import json
import os



# React Home
def home(request):
    return render(request, "index.html")


# Blog list page (HTML fallback)
def blog_list(request):
    posts = Post.objects.all()
    return render(request, "blogs.html", {"posts": posts})


# -------- LOGIN API --------
@csrf_exempt
def api_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
        except:
            return JsonResponse({"error": "Invalid data"}, status=400)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login success"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def api_register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
        except:
            return JsonResponse({"error": "Invalid data"}, status=400)

        from django.contrib.auth.models import User

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({"message": "User created successfully"})

    return JsonResponse({"error": "Invalid request"}, status=400)


# -------- LOGOUT API --------
def api_logout(request):
    logout(request)
    return JsonResponse({"message": "Logged out"})


# -------- CREATE BLOG API --------
@csrf_exempt
def create_blog(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title")
        content = data.get("content")

        if request.user.is_authenticated:
            Post.objects.create(
                title=title,
                content=content,
                author=request.user
            )
            return JsonResponse({"message": "Post created"})
        else:
            return JsonResponse({"error": "Login required"}, status=401)

    # GET → return all posts
    posts = list(Post.objects.values())
    return JsonResponse(posts, safe=False)
