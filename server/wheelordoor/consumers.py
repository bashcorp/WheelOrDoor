import asyncio
import json
from channels.consumer import AsyncConsumer

class WODConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        print("Connected", event)

        await self.send({"type": "websocket.accept", })

    async def websocket_receive(self, event):
        print("Receive", event)

    async def websocket_disconnect(self, event):
        print("Disconnect", event)
