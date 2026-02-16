from django.contrib import admin
from django.urls import path
from blog import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # React frontend routes
    path('', views.home, name='home'),
    path('blogs', views.home),
    path('create', views.home),

    # Auth APIs
    path('api/login/', views.api_login),
    path('api/logout/', views.api_logout),

    # Blog API
    path('api/posts/', views.create_blog),
]
