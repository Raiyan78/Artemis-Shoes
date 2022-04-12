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
    
    path('users/profile/', views.viewUser),
    path('users/profile/edit/', views.editUserProfile),
    path('users/profile/edit/<str:key>', views.editUser), #admin
    path('users/', views.viewUsers), #admin
    path('users/profile/<str:key>', views.viewUserById), #admin
    path('users/delete/<str:key>', views.delUser), #admin

    path('orders/add/', views.setOrderItem),
    path('orders/myorders/', views.viewOrderByUser),
    path('orders/<str:key>/', views.viewOrderById), #admin


]