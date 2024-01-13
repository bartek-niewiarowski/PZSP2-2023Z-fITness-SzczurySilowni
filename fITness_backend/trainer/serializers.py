from rest_framework import serializers
from .models import (
    Appointments, Exercises, Gyms
)


class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = '__all__'


class ExercisesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercises
        fields = '__all__'

class GymsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gyms
        fields = '__all__'
