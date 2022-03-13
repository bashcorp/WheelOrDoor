from django.shortcuts import render

react_mainpage = 'index.html'

def index(request):
    return render(request, react_mainpage)
