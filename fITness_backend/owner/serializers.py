from rest_framework import serializers
from .models import Trainings


class TrainingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainings
        fields = '__all__'
