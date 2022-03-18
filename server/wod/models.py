from django.db import models
from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async

class Results(models.Model):
    wheels = models.IntegerField(default=0)
    doors = models.IntegerField(default=0)
    percentage = models.FloatField(default=0)


@sync_to_async
def inc(wheel):
    if Results.objects.count() == 0:
        newr = Results.objects.create()
        newr.save()

    r = Results.objects.all().first()
    if wheel:
        r.wheels += 1
    else:
        r.doors += 1
    r.percentage = r.wheels / (r.wheels + r.doors)
    r.save()

    return r.percentage


async def inc_wheels():
    perc = await inc(True)

    channel_layer = get_channel_layer()
    await channel_layer.group_send("default", {"type": "update", "percentage": perc})



async def inc_doors():
    perc = await inc(False)

    channel_layer = get_channel_layer()
    await channel_layer.group_send("default", {"type": "update", "percentage": perc})
