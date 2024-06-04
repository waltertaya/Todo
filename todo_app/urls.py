from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('home/', views.home, name='home'),
    path('delete/<str:name>/', views.delete_task, name='delete_task'),
    path('complete/<str:name>/', views.complete_task, name='complete_task'),
   
]
