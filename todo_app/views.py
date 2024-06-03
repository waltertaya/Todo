from django.shortcuts import render
from django.http import HttpResponse



def index(request):
    return render(request, 'todo_app/landing.html')

def register(request):
    return render(request, 'todo_app/register.html')

def login(request):
    return render(request, 'todo_app/login.html')   

def home(request):
    return render(request, 'todo_app/home.html')

# Create your views here.
