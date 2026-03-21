
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from blog import views

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html")),
    path("admin/", admin.site.urls),

    path("api/register/", views.api_register),
    path("api/login/", views.api_login),

    path("api/posts/", views.posts),
    path("api/posts/<int:pk>/", views.post_detail),
]