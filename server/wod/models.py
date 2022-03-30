from django.db import models
from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async

class Results(models.Model):
    wheels = models.IntegerField(default=0)
    doors = models.IntegerField(default=0)
    percentage = models.FloatField(default=0)
    connections = models.IntegerField(default=0)


def getResultsObject():
    if Results.objects.count() == 0:
        newr = Results.objects.create()
        newr.save()

    r = Results.objects.all().first() 
    return r



@sync_to_async
def change_conn(inc):
    r = getResultsObject()

    if inc:
        r.connections += 1
    else:
        r.connections -= 1
    r.save()

    return r.connections


async def inc_conn():
    conn = await change_conn(True)

    channel_layer = get_channel_layer()
    await channel_layer.group_send("default", {"type": "connection_update", "connections": conn})


async def dec_conn():
    conn = await change_conn(False)

    channel_layer = get_channel_layer()
    await channel_layer.group_send("default", {"type": "connection_update", "connections": conn})


@sync_to_async
def inc(wheel):
    r = getResultsObject()

    if wheel:
        r.wheels += 1
    else:
        r.doors += 1
    r.percentage = r.wheels / (r.wheels + r.doors)
    r.save()

    return (r.wheels, r.doors)


@sync_to_async
def get_results():
    r = getResultsObject()
    return (r.wheels, r.doors)


async def inc_wheels():
    (wheels, doors) = await inc(True)

    channel_layer = get_channel_layer()
    await channel_layer.group_send("default", {"type": "data_update", "wheels": wheels, "doors": doors})



async def inc_doors():
    (wheels, doors) = await inc(False)

    channel_layer = get_channel_layer()
    await channel_layer.group_send("default", {"type": "data_update", "wheels": wheels, "doors": doors})
