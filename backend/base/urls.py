from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('products/', views.viewProducts),
    path('products/<str:productkey>/', views.viewProduct),

    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name = "Register"),
    
    path('users/profile/', views.viewUserProfile),
    path('users/profile/edit/', views.editUserProfile),
    path('users/', views.viewUsers),

    path('orders/add/', views.setOrderItem),
    path('orders/<str:key>/', views.viewOrderById),

]