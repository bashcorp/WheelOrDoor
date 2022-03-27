import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wheelordoor.settings')
django.setup()

from channels.http import AsgiHandler
from channels.routing import ProtocolTypeRouter, get_default_application, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddlewareStack
from django.urls import path, re_path

from . import consumers 


application = ProtocolTypeRouter({
    "http": AsgiHandler(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            re_path(r'^ws/socket-test$', consumers.WODConsumer().as_asgi())
        ])
    ),
})
