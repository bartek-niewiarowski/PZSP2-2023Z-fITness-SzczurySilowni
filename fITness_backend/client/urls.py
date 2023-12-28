from django.urls import path, include
from .views import (
    UserApiView,
)

urlpatterns = [
    path('user_api', UserApiView.as_view()),
]
