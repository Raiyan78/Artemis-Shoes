from asyncio.windows_events import NULL
from statistics import quantiles
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response

from .products import products

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .serializers import ProductSerialization, UserSerialization, UserSerializationWithToken, OrderSerialization

from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Product, Order, OrderItem, ShippingAddress

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email'] = self.user.email
        # data['isStaff'] = self.user.is_staff
        # data['token'] = self.user.token

        serializer = UserSerializationWithToken(self.user).data
        
        for i,j in serializer.items():
            data[i] = j

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.

@api_view(['POST'])
def registerUser(request):
    data = request.data
    
    try:
        
        user = User.objects.create(
            username = data['username'],
            email = data['email'],
            password = make_password(data['password']),
        )


        serializer = UserSerializationWithToken(user, many = False)
        return Response(serializer.data)
    except:
        message = {'Username already in use'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

# view product function
@api_view(['GET'])
def viewProducts(request): 
    products = Product.objects.all()
    serializer = ProductSerialization(products, many = True)
    return Response(serializer.data)

# view single product
@api_view(['GET'])
def viewProduct(request, productkey):
    product = Product.objects.get(_id = productkey)
    serializer = ProductSerialization(product, many = False)

    return Response(serializer.data)

# view user model
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def viewUser(request): 
    user = request.user
    serializer = UserSerialization(user, many = False)
    return Response(serializer.data)

#view all users model
@api_view(['GET'])
@permission_classes([IsAdminUser])
def viewUsers(request): 
    users = User.objects.all()
    serializer = UserSerialization(users, many = True)
    return Response(serializer.data)

# view profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewUserProfile(request):
    user = request.user
    serializer = UserSerialization(user, many=False)
    return Response(serializer.data)

# update profile
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editUserProfile(request):
    user = request.user
    serializer = UserSerializationWithToken(user, many=False)

    data = request.data

    user.password = make_password(data['password'])
    user.email = data['email']

    user.save()

    return Response(serializer.data)


#OrderView
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def setOrderItem(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({
            'detail' : 'No item to order'}, 
            status = status.HTTP_400_BAD_REQUEST
            )
    else:
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
        )

        shippingAddress = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            postalCode = data['shippingAddress']['postalCode'],
            city = data['shippingAddress']['city'],
            country = data['shippingAddress']['country'],
        )

        for i in orderItems:
            product = Product.objects.get(_id = i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                quantity = i['quantity'],
                price = product.price,
                image = product.image.url,
            )
            if product.countInStock != 0 or product.countInStock != NULL:
                product.countInStock -= item.quantity
            else:
                return Response({
                    'detail' : 'No item to order'}, 
                    status = status.HTTP_400_BAD_REQUEST
                )
                
            product.save()
        
        serializer = OrderSerialization(order, many = False)
        return Response(serializer.data)



