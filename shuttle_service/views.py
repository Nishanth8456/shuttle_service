# shuttle_service/views.py
from django.shortcuts import render

def homepage(request):
    return render(request, 'home.html')
