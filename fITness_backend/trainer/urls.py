from django.urls import path, include
from .views import (
    AppointmentsForClientView, AppointmentsForTrainerView
)

urlpatterns = [
    path('get_training_client', AppointmentsForClientView.as_view()),
    path('get_training_trainer', AppointmentsForTrainerView.as_view())
]