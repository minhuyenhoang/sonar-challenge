# Generated by Django 4.1 on 2022-08-19 02:04

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(default='', max_length=10)),
                ('last_name', models.CharField(default='', max_length=10)),
                ('email', models.CharField(default='', max_length=100)),
                ('frequency', models.IntegerField(choices=[(0, 'Never'), (1, 'Everyday'), (2, 'Monday')])),
                ('emails_sent', models.BigIntegerField(default=0)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
