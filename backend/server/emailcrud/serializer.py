from rest_framework import serializers
from emailcrud.models import User

class UserSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(required=True)
  class Meta: 
    model = User
    fields = ['id', 'first_name', 'last_name', 'email', 'frequency', 'emails_sent']