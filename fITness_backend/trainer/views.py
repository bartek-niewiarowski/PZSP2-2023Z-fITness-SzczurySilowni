from datetime import datetime

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Appointments
from .serializers import AppointmentsSerializer


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
