from datetime import datetime

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Appointments, Exercises, Gyms
from .serializers import AppointmentsSerializer, ExercisesSerializer, GymsSerializer


class AddAppointmentView(APIView):
    def post(self, request, format=None):
        serializer = AppointmentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppointmentsForClientView(APIView):
    def get(self, request, format=None):
        client_id = request.query_params.get('client', None)
        date = request.query_params.get('date', None)
        if client_id and date:
            appointments = Appointments.objects.filter(planned_start__startswith=date, client=client_id)
        else:
            appointments = Appointments.objects.all()
        serializer = AppointmentsSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AppointmentsForTrainerView(APIView):
    def get(self, request, format=None):
        trainer_id = request.query_params.get('trainer', None)
        date = request.query_params.get('date', None)
        if trainer_id and date:
            appointments = Appointments.objects.filter(planned_start__startswith=date, trainer=trainer_id)
        else:
            appointments = Appointments.objects.all()
        serializer = AppointmentsSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateAppointmentView(APIView):
    def put(self, request, pk, format=None):
        training = Appointments.objects.get(appointment_id=pk)
        serializer = AppointmentsSerializer(training, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteAppointmentView(APIView):
    def delete(self, request, pk=None):
        try:
            appointment = Appointments.objects.get(appointment_id=pk)
            appointment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ExerciseView(APIView):
    def post(self, request, format=None):
        serializer = ExercisesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            exercise_id = request.query_params.get('exercise_id')
            if not exercise_id:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            exercise = Exercises.objects.get(exercise_id=exercise_id)
            exercise.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exercises.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, format=None):
        appointment_id = request.query_params.get('appointment_id', None)
        if appointment_id:
            exercises = Exercises.objects.filter(appointment=appointment_id)
        else:
            exercises = Exercises.objects.all()
        serializer = ExercisesSerializer(exercises, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AllGymsView(APIView):
    def get(self, request, format=None):
        gyms = Gyms.objects.all()
        serializer = GymsSerializer(gyms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
