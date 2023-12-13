from django.urls import path, include
from .views import (
    GymApiView,
)

urlpatterns = [
    path('api', GymApiView.as_view()),
]