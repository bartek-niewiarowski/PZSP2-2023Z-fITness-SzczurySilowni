from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Trainings
from .serializers import TrainingsSerializer


class GetAllEntrances(APIView):

    def get(self, request, format=None):
        training = Trainings.objects.all()
        return JsonResponse({'numer_of_entrances': training.count()})
