from asyncio.windows_events import NULL
from datetime import datetime
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

# non admin user profile view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewUser(request):
    user = request.user
    serializer = UserSerialization(user, many=False)
    return Response(serializer.data)
    
#admin user profile view
@api_view(['GET'])
@permission_classes([IsAdminUser])
def viewUserById(request, key):
    user = User.objects.get(id=key)
    serializer = UserSerialization(user, many=False)
    return Response(serializer.data)

# update profile by user
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

#update profile by admin
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editUser(request, key):
    user = User.objects.get(id = key)
    

    data = request.data

    user.username = data['username']
    #user.password = make_password(data['password'])
    user.email = data['email']
    user.is_staff = data['is_staff']

    user.save()

    serializer = UserSerialization(user, many=False)

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
            contactInfo = data['shippingAddress']['contactInfo']
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



#view order by id
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewOrderById(request, key):

    user = request.user
    try:
        order = Order.objects.get(_id=key)
        if user.is_staff or order.user == user:
            serializer = OrderSerialization(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not1fawe'}, status=status.HTTP_400_BAD_REQUEST)


#view order of each user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewOrderByUser(request):
    user = request.user
    orders = user.order_set.all()

    serializer = OrderSerialization(orders, many = True)

    return Response(serializer.data)

#delete user
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delUser(request, key):    
    try:
        u = User.objects.get(id = key)
        u.delete()
        return Response('User deleted successfully')
        #messages.sucess(request, "The user is deleted")
    except:
      return Response({'detail': 'User does not exist'}, status=status.HTTP_204_NO_CONTENT)    

#admin delete product
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, key):
    product = Product.objects.get(_id = key)
    product.delete()

    return Response('Product deleted')

#admin view product
@permission_classes([IsAdminUser])
@api_view(['POST'])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'Placeholder name',
        brand = 'Brand',
        category = 'category',
        description = 'description',
        rating = 0,
        price = 0,
        numReviews = 0,
        countInStock = 0,
    )
    serializer = ProductSerialization(product, many = False)

    return Response(serializer.data)

@permission_classes([IsAdminUser])
@api_view(['PUT'])
def editProduct(request, key):
    product = Product.objects.get(_id = key)

    data = request.data

    product.name = data['name']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.price = data['price']
    product.countInStock = data['countInStock'] 

    product.save()

    # product = Product.objects.create(
    #     user = user.name,
    #     name = request.name,
    #     brand = request.brand,
    #     category = request.category,
    #     description = request.description,
    #     price = 0,
    #     countInStock = 0,
    # )

    serializer = ProductSerialization(product, many = False)

    return Response(serializer.data)

#admin order view
@api_view(['GET'])
@permission_classes([IsAdminUser])
def viewOrders(request):
    orders = Order.objects.all()

    serializer = OrderSerialization(orders, many = True)

    return Response(serializer.data)



@api_view(['POST'])
def uploadImage(request):

    data = request.data

    productId = data['productId']
    product = Product.objects.get(_id = productId)

    product.image = request.FILES.get('image')
    
    product.save()

    return Response('Image uploaded')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def orderPaid(request, key):

    order = Order.objects.get(_id = key)


    order.isPaid = True

    order.paidAt = datetime.now()

    order.save()

    return Response('Order is paid')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def orderDelivered(request, key):

    order = Order.objects.get(_id = key)

    order.isDelivered = True

    order.deliveredAt = datetime.now()

    order.save()

    return Response('Order is delivered')




    

    

