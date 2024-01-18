from django.urls import path, include
from .views import (GetAllEntrances,)

urlpatterns = [
    path('get_all_entrances', GetAllEntrances.as_view()),
]
