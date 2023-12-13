from .models import *
from rest_framework import serializers


class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gym
        fields = ('gym_id', 'name', 'address', 'description', 'mens_lockers', 'womans_lockers', 'manager')
