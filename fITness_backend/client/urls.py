from django.urls import path, include
from .views import (
    UserApiView,
)

urlpatterns = [
    path('api', UserApiView.as_view()),
]
