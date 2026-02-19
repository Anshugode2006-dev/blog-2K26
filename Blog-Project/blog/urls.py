from django.urls import path
from . import views

urlpatterns = [
    path("api/register/", views.api_register),
    path("api/login/", views.api_login),

    # JWT does NOT need logout API
    # logout handled in frontend by deleting token

    path("api/posts/", views.posts),
    path("api/posts/<int:pk>/", views.post_detail),
]
