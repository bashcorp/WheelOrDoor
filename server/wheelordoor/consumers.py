import asyncio
import json
from channels.consumer import AsyncConsumer

from wod.models import inc_wheels, inc_doors, inc_conn, dec_conn, get_results
from asgiref.sync import async_to_sync

import logging
logger = logging.getLogger(__name__)

class WODConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        logger.warning("ATTEMPTED CONNECTION WOOOO")
        await self.channel_layer.group_add("default", self.channel_name)

        await self.send({"type": "websocket.accept", })
        
        (wheels, doors) = await get_results()
        j = {"type": "data", "wheels": wheels, "doors": doors}
        await self.send({"type": "websocket.send", "text": json.dumps(j)})

        await inc_conn()


    async def websocket_receive(self, event):
        j = json.loads(event.get('text'))

        if j.get('vote') == 'wheel':
            print("wheel")
            await inc_wheels()

        elif j.get('vote') == 'door':
            await inc_doors()
        


    async def websocket_disconnect(self, event):
        logger.warning("DISCONNECTING AAAH")
        await dec_conn()
        await self.channel_layer.group_discard("default", self.channel_name)


    async def data_update(self, event):
        j = {"type": "data", "wheels": event.get("wheels"), "doors": event.get("doors")}
        await self.send({"type": "websocket.send", "text": json.dumps(j)})


    async def connection_update(self, event):
        j = {"type": "connections", "connections": event.get("connections")}
        await self.send({"type": "websocket.send", "text": json.dumps(j)})
