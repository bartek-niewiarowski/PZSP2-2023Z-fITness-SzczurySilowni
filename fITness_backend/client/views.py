from datetime import datetime

from django.shortcuts import render
from django.http import JsonResponse
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Users, Trainings, SubscriptionPlans, Appointments
from .serializers import UserSerializer, TrainingsSerializer, SubscriptionPlansSerializer, AppointmentsSerializer


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


class UpdateTrainingView(APIView):
    def put(self, request, pk, format=None):
        training = Trainings.objects.get(trainings_id=pk)
        serializer = TrainingsSerializer(training, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteTrainingView(APIView):
    def delete(self, request, pk=None):
        try:
            training = Trainings.objects.filter(trainings_id=pk)
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


class UserByIdView(APIView):
    def get(self, request, id=None):
        try:
            users = Users.objects.get(user_id=id)
            serializer = UserSerializer(users)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
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


class GetAllClientTrainings(APIView):

    def get(self, request, id=None):
        trainings = Trainings.objects.filter(client=id)
        serializer = TrainingsSerializer(trainings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetAllClientAppointments(APIView):

    def get(self, request, id=None):
        appointments = Appointments.objects.filter(client=id)
        serializer = AppointmentsSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetTotalTimeSpentInLastMonth(APIView):

    def get(self, request, id=None):
        try:
            total_time = Trainings.total_time_last_month(id)
            return JsonResponse({'client_id': id, 'total_time_last_month': total_time})
        except Users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GetAllTrainingsThisMonth(APIView):

    def get(self, request, id=None):
        try:
            last_month_trainings = Trainings.objects.filter(
                client=id,
                start__gte=timezone.now() - timezone.timedelta(days=30)
            )
            serializer = TrainingsSerializer(last_month_trainings, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GetMostCommonTrainerForClient(APIView):

    def get(self, request, id=None):
        try:
            all_trainers = Appointments.get_client_most_common_trainer(id)
            return JsonResponse(all_trainers)
        except Users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GetMonthReportForClintAndMonth(APIView):

    def get(self, request, id=None, year=None, month=None):
        try:
            report = Users.create_report_for_specific_month(id, year, month)
            return JsonResponse(report)
        except Users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
