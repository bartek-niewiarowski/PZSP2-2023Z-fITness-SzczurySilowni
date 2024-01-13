from django.urls import path, include
from .views import (
    AppointmentsForClientView, AppointmentsForTrainerView, UpdateAppointmentView
)

urlpatterns = [
    path('get_appointment_client', AppointmentsForClientView.as_view()),
    path('get_appointment_trainer', AppointmentsForTrainerView.as_view()),
    path('update_appointment/<int:pk>', UpdateAppointmentView.as_view())
]
