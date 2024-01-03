from django.urls import path, include
from .views import (
    UserApiView, TrainingApiView, UpdateUserView,
)

urlpatterns = [
    path('user_api', UserApiView.as_view()),
    path('training_api', TrainingApiView.as_view()),
    path('update_user/<int:pk>', UpdateUserView.as_view())
]
