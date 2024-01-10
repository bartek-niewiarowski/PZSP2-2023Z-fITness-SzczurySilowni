from django.urls import path, include
from .views import (
    UserApiView, TrainingApiView, UpdateUserView, DeleteTrainingView, SubscriptionPlansView, DeleteUserView,
    UserByIdView,
)

urlpatterns = [
    path('user_api', UserApiView.as_view()),
    path('get_user/<int:id>', UserByIdView.as_view()),
    path('training_api', TrainingApiView.as_view()),
    path('update_user/<int:pk>', UpdateUserView.as_view()),
    path('delete_training/<int:pk>', DeleteTrainingView.as_view()),
    path('get_subscription', SubscriptionPlansView.as_view()),
    path('delete_user/<int:pk>', DeleteUserView.as_view())
]
