from django.shortcuts import render
from rest_framework import viewsets
from emailcrud.serializer import UserSerializer
from emailcrud.models import User

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer