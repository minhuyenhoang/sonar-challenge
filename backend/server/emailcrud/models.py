from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

# Create your models here.
class User(models.Model):
  first_name = models.CharField(max_length=10, default='')
  last_name = models.CharField(max_length=10, default='')
  email = models.CharField(max_length=100, default='')
  frequency = ArrayField(models.IntegerField(), size=3, blank=True, default=list)
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField(default=timezone.now)