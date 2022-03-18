import os

import django
from channels.http import AsgiHandler
from channels.routing import ProtocolTypeRouter, get_default_application, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddlewareStack
from django.urls import path

from . import consumers 

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wheelordoor.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": AsgiHandler(),
    "websocket": AllowedHostsOriginValidator(AuthMiddlewareStack(
        URLRouter([
            path('socket-test', consumers.WODConsumer().as_asgi())
        ])
    )),
})
