from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress

from rest_framework_simplejwt.tokens import RefreshToken


#Serializes the data to be readable by the frontned

class ProductSerialization(serializers.ModelSerializer):
    class Meta:
       model = Product 
       fields = '__all__' 

class UserSerialization(serializers.ModelSerializer):
    class Meta:
       model = User 
       fields = [
           'id',
           'username',
           'email',
           'is_staff'
       ]

class UserSerializationWithToken(UserSerialization):
    token = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = [
           'id',
           'username',
           'email',
           'is_staff',
           'token',
        ]

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ShippingAddressSerialization(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerialization(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerialization(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerialization(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerialization(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerialization(user, many=False)
        return serializer.data
# class ShippingAddressSerialization(serializers.ModelSerializer):
#     class Meta:
#        model = ShippingAddress 
#        fields = '__all__' 

# class OrderItemSerialization(serializers.ModelSerializer):
#     class Meta:
#        model = OrderItem
#        fields = '__all__' 

# class OrderSerialization(serializers.ModelSerializer):
#     orderItems = serializers.SerializerMethodField(read_only= True)
#     shippingAddress = serializers.SerializerMethodField(read_only= True)
#     user = serializers.SerializerMethodField(read_only= True)

#     class Meta:
#        model = Order
#        fields = '__all__' 

#     def get_orderItems(self,obj):
#         item = obj.orderitem_set.all
#         serializer= OrderItemSerialization(item, many = True)
#         return serializer.data

#     def get_shippingAddress(self,obj):
#         try:
#             address = ShippingAddressSerialization(obj.shippingAddress, many = False)
#             #serializer= OrderItemSerialization(address, many = True)
#         except:
#             address = False

#         return address

#     def get_user(self,obj):
#         user = obj.user
#         serializer= UserSerialization(user, many = False)
#         return serializer.data