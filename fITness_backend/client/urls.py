from django.urls import path, include
from .views import (
    UserApiView, TrainingApiView, UpdateUserView, DeleteTrainingView, SubscriptionPlansView, DeleteUserView,
    UserByIdView, UpdateTrainingView, GetAllClientTrainings, GetAllClientAppointments, GetTotalTimeSpentInLastMonth,
    GetAllTrainingsThisMonth, GetMostCommonTrainerForClient
)

urlpatterns = [
    path('user_api', UserApiView.as_view()),
    path('get_user_by_id/<int:id>', UserByIdView.as_view()),
    path('training_api', TrainingApiView.as_view()),
    path('update_user/<int:pk>', UpdateUserView.as_view()),
    path('update_training/<int:pk>', UpdateTrainingView.as_view()),
    path('delete_training/<int:pk>', DeleteTrainingView.as_view()),
    path('get_subscription', SubscriptionPlansView.as_view()),
    path('delete_user/<int:pk>', DeleteUserView.as_view()),
    path('get_client_trainings/<int:id>', GetAllClientTrainings.as_view()),
    path('get_client_appointments/<int:id>', GetAllClientAppointments.as_view()),
    path('get_client_total_time_last_month/<int:id>', GetTotalTimeSpentInLastMonth.as_view()),
    path('get_client_last_month_trainings/<int:id>', GetAllTrainingsThisMonth.as_view()),
    path('get_client_most_common_trainer/<int:id>', GetMostCommonTrainerForClient.as_view()),

]
