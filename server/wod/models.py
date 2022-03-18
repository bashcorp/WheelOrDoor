from django.db import models
from channels.layers import get_channel_layer

class Results(models.Model):
    wheels = models.IntegerField(default=0)
    doors = models.IntegerField(default=0)
    percentage = models.FloatField(default=0)

    @staticmethod
    async def inc_wheels():

        import pdb; pdb.set_trace()

        if Results.objects.count() == 0:
            Results.objects.create()
            Resluts.objects.save()

        r = Results.objects.get(pk=1)
        r.wheels += 1
        r.percentage = wheels / (wheels + doors)
        r.save()

        channel_layer = get_channel_layer()
        await channel_layer.group_send("default", {"type": "update", "percentage": r.percentage})



    async def inc_doors():
        if Results.objects.count() == 0:
            Results.objects.create()
            Results.save()

        r = Results.objects.get(pk=1)
        r.doors += 1
        r.percentage = wheels / (wheels + doors)
        r.save()

        channel_layer = get_channel_layer()
        await channel_layer.group_send("default", {"type": "update", "percentage": r.percentage})
