from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Users
from .serializers import UserSerializer


# Create your views here.
# class UserApiView(APIView):
#     def get(self, request, *args, **kwargs):
#         users = Users.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


class UserApiView(APIView):
    def get(self, request, format=None):
        email = request.query_params.get('email', None)
        password = request.query_params.get('password', None)
        if email and password:
            books = Users.objects.filter(email=email, password=password)
        else:
            books = Users.objects.all()
        serializer = UserSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
