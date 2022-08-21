

from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

# Create your models here.
class User(models.Model):

  class Frequency(models.IntegerChoices):
    NEVER = 0
    EVERYDAY = 1
    MONDAY = 2
  
  first_name = models.CharField(max_length=10, default='')
  last_name = models.CharField(max_length=10, default='')
  email = models.CharField(max_length=100, default='')
  frequency = models.IntegerField(choices=Frequency.choices)
  emails_sent = models.BigIntegerField(default=0)
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField(default=timezone.now)