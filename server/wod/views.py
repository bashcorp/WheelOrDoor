from django.shortcuts import render
from django.http import HttpResponse
from channels.layers import get_channel_layer

from asgiref.sync import async_to_sync

react_mainpage = 'index.html'

def index(request):
    return render(request, react_mainpage)
