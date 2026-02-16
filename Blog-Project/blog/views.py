from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Post
import json


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
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return JsonResponse({"message": "Login success"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)


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
