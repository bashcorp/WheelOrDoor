import asyncio
import json
from channels.consumer import AsyncConsumer

from wod.models import inc_wheels, inc_doors, inc_conn, dec_conn
from asgiref.sync import async_to_sync

class WODConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        await self.channel_layer.group_add("default", self.channel_name)

        await self.send({"type": "websocket.accept", })

        await inc_conn()


    async def websocket_receive(self, event):
        j = json.loads(event.get('text'))

        if j.get('vote') == 'wheel':
            print("wheel")
            await inc_wheels()

        elif j.get('vote') == 'door':
            await inc_doors()
        


    async def websocket_disconnect(self, event):
        await dec_conn()
        await self.channel_layer.group_discard("default", self.channel_name)


    async def data_update(self, event):
        j = {"type": "data", "percentage": event.get("percentage")}
        await self.send({"type": "websocket.send", "text": json.dumps(j)})


    async def connection_update(self, event):
        j = {"type": "connections", "connections": event.get("connections")}
        await self.send({"type": "websocket.send", "text": json.dumps(j)})
