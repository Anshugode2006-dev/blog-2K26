from django.contrib import admin
from django.urls import path
from blog import views

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/register/", views.api_register),
    path("api/login/", views.api_login),

    path("api/posts/", views.posts),
    path("api/posts/<int:pk>/", views.post_detail),
]
