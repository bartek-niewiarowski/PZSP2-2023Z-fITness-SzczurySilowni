from django.urls import path, include
from .views import (
    AppointmentsForClientView, AppointmentsForTrainerView, UpdateAppointmentView, DeleteAppointmentView,
    AddAppointmentView, ExerciseView, AllGymsView
)

urlpatterns = [
    path('get_appointment_client', AppointmentsForClientView.as_view()),
    path('get_appointment_trainer', AppointmentsForTrainerView.as_view()),
    path('update_appointment/<int:pk>', UpdateAppointmentView.as_view()),
    path('delete_appointment/<int:pk>', DeleteAppointmentView.as_view()),
    path('add_appointment', AddAppointmentView.as_view()),
    path('get_exercises', ExerciseView.as_view()),
    path('delete_exercise/<int:pk>', ExerciseView.as_view()),
    path('add_exercise', ExerciseView.as_view()),
    path('get_gyms', AllGymsView.as_view())
]
