from .models import *
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'user_name', 'email', 'password', 'access_rights', 'name', 'second_name', 'surname', 'gender', 'subscription_plan', 'subscription_expiration')
