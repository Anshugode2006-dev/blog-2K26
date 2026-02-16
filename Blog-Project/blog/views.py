from django.shortcuts import render, get_object_or_404, redirect
from .models import Post, Comment, Profile
from .forms import PostForm, CommentForm, SignUpForm, ProfileForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Count, Q
from django.core.paginator import Paginator

# ================= TEMPLATE VIEWS =================

def home(request):
    posts = Post.objects.all()
    return render(request, 'blog/home.html', {'posts': posts})


def about(request):
    return render(request, 'blog/about.html')


def contact(request):
    return render(request, 'blog/contact.html')


def signup_view(request):
    return render(request, 'blog/signup.html')


def login_view(request):
    return render(request, 'blog/login.html')


def logout_view(request):
    return redirect('home')


def profile(request, username):
    user_obj = get_object_or_404(User, username=username)
    return render(request, 'blog/profile.html', {'profile_user': user_obj})


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})


@login_required
def post_create(request):
    return render(request, 'blog/post_form.html')


@login_required
def post_update(request, pk):
    return render(request, 'blog/post_form.html')


@login_required
def post_delete(request, pk):
    return redirect('home')


# ================= API VIEWS FOR REACT =================

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import PostSerializer


@api_view(['POST'])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def api_posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        return Response(PostSerializer(posts, many=True).data)

    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def api_post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk, author=request.user)

    if request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    if request.method == 'DELETE':
        post.delete()
        return Response(status=204)
