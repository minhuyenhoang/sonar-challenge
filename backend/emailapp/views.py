from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from emailapp.serializer import UserSerializer
from emailapp.models import User
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os
# from server.settings import SENDGRID_API_KEY, SENDER

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

@api_view(['POST'])
def send(request):
  #if request.data['recipient']
  message = Mail(
    from_email = os.environ.get('SENDER'),
    to_emails = request.data['recipient'],
    subject = request.data['subject'],
    html_content = 'Hi! This is a test'
  )
  sd = SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
  try:
    response = sd.send(message)
    code, body, headers = response.status_code, response.body, response.headers
    print(f"Response code: {code}")
    print(f"Response headers: {headers}")
    print(f"Response body: {body}")
    return Response({'success': 'Your email has been sent!'})
  except Exception as e:
    print("Error {0}".format(e))
    return Response({'error': 'Fail to send email!'})
