from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login , logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse
from .models import Task



def index(request):
    return render(request, 'todo_app/landing.html')

def register(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('userName')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password2 = request.POST.get('confirmPassword')

        if password == password2:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username is already taken')
                return redirect('register')
            else:
                if User.objects.filter(email=email).exists():
                    messages.error(request, 'Email is already taken')
                    return redirect('register')
                else:
                    user = User.objects.create_user(username=username, email=email, password=password)
                    user.save()
                    messages.success(request, 'Account created successfully')
                    return redirect('login')
                
        else:
            messages.error(request, 'Passwords do not match')
            return redirect('register')

    return render(request, 'todo_app/register.html')


def user_login(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        username = request.POST.get('userName')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid credentials')
            return redirect('login')
    return render(request, 'todo_app/login.html')   

@login_required
def home(request):
    if request.method == 'POST':
        task = request.POST.get('task')

        if task:
            task = Task(user=request.user, title=task)
            task.save()

    
    tasks = Task.objects.filter(user=request.user)
    context = {'tasks': tasks}
    return render(request, 'todo_app/home.html', context)
    

@login_required
def delete_task(request, name):
    task = Task.objects.get(user = request.user, title=name)
    task.delete()
    return redirect('home')

@login_required
def complete_task(request, name):
    task = Task.objects.get(user = request.user, title=name)
    task.complete = True
    task.save()
    return redirect('home')


@login_required
def user_logout(request):
    logout(request)
    messages.success(request, 'You are now logged out')
    return redirect('login')

# Create your views here.
