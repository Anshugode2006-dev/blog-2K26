from django.contrib import admin
from django.urls import path
from blog import views

urlpatterns = [
    path("admin/", admin.site.urls),

    # React frontend
    path("", views.home),
    path("blogs", views.home),
    path("create", views.home),
    path("register", views.home),

    # Auth APIs
    path("api/register/", views.register),
    path("api/login/", views.api_login),
    path("api/logout/", views.api_logout),

    # Blog APIs
    path("api/posts/", views.create_blog),
    path("api/posts/<int:id>/", views.delete_blog),
    path("api/posts/<int:id>/update/", views.update_blog),
]
