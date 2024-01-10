from datetime import datetime

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Users, Trainings, SubscriptionPlans
from .serializers import UserSerializer, TrainingsSerializer, SubscriptionPlansSerializer


# Create your views here.
# class UserApiView(APIView):
#     def get(self, request, *args, **kwargs):
#         users = Users.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
# Apka Klienta
#
# - obsługa logowania
# - dodanie użytkownika
# - pobranie treningu danego dnia dla danego użytkownika
# - pobranie dokładnych informacji o treningu, ćwiczenia, serie
# - dodanie danego treningu, user, trener, data
# - anulowanie danego treningu / opcjonalnie
# - zmiana subskrybcji
# - update usera


class UserApiView(APIView):
    def get(self, request, format=None):
        email = request.query_params.get('email', None)
        password = request.query_params.get('password', None)
        if email and password:
            users = Users.objects.filter(email=email, password=password)
        else:
            users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TrainingApiView(APIView):
    def get(self, request, format=None):
        start = request.query_params.get('start')
        client = request.query_params.get('client')
        if start and client:
            training = Trainings.objects.filter(start__startswith=start, client=client)
        else:
            training = Trainings.objects.all()
        serializer = TrainingsSerializer(training, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = TrainingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(APIView):
    def put(self, request, pk, format=None):
        user = Users.objects.get(user_id=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteTrainingView(APIView):
    def delete(self, request, pk=None):
        try:
            training = Trainings.objects.get(trainings_id=pk)
            training.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DeleteUserView(APIView):
    def delete(self, request, pk=None):
        try:
            user = Users.objects.get(user_id=pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SubscriptionPlansView(APIView):
    def get(self, request, format=None):
        user_name = request.query_params.get('user_name')
        if user_name:
            user = Users.objects.filter(user_name=user_name)
            subscription_plan = SubscriptionPlans.objects.filter(subscription_plan_id=user[0].subscription_plan_id)
        else:
            subscription_plan = SubscriptionPlans.objects.all()
        serializer = SubscriptionPlansSerializer(subscription_plan, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

