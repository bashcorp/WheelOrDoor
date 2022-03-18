import asyncio
import json
from channels.consumer import AsyncConsumer

from wod.models import Results

class WODConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        print("Connected", event)

        await self.channel_layer.group_add("default", self.channel_name)

        await self.send({"type": "websocket.accept", })


    async def websocket_receive(self, event):
        print("Receive", event)
        if event.get('vote') == 'wheel':
            Results.inc_wheel()
        elif event.get('vote') == 'door':
            Results.inc_door()


    async def websocket_disconnect(self, event):
        await self.channel_layer.group_discard("default", self.channel_name)


    async def update(self, event):
        print("Update", event)

        await self.send({"type": "websocket.send", "percentage": event.get("percentage")})
