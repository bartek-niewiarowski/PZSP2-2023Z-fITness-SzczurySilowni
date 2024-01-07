from rest_framework import serializers
from .models import (
    Appointments, Equipments, Exercises, Gyms, GymsTrainers, Payments, Reps, SubscriptionPlans, Trainings, Users
)


class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = '__all__'


class EquipmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipments
        fields = '__all__'


class ExercisesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercises
        fields = '__all__'


class GymsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gyms
        fields = '__all__'


class GymsTrainersSerializer(serializers.ModelSerializer):
    class Meta:
        model = GymsTrainers
        fields = '__all__'


class PaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = '__all__'


class RepsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reps
        fields = '__all__'


class SubscriptionPlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlans
        fields = '__all__'


class TrainingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainings
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
