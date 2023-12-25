from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Users
from .serializers import UserSerializer


# Create your views here.
class UserApiView(APIView):
    def get(self, request, *args, **kwargs):
        '''
        List all the todo items for given requested user
        '''
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
