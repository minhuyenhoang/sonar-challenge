from __future__ import absolute_import, unicode_literals
import os
from celery import shared_task
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Content
from django.template.loader import render_to_string
from django.apps import apps
from decouple import config

def send(email, user):
    sd = SendGridAPIClient(config('SENDGRID_API_KEY'))
    try:
        response = sd.send(email)
        code, body, headers = response.status_code, response.body, response.headers
        print(f"Response code: {code}")
        print(f"Response headers: {headers}")
        print(f"Response body: {body}")
        user.emails_sent += 1
        user.save()
        return {'success': 'Your email has been sent!'}
    except Exception as e:
        print("Error {0}".format(e))
        print(e.to_dict)
        return {'error': 'Fail to send email!'}

@shared_task
def send_survey_by_frequency(frequency):
    #from emailapp.models import User
    #users = User.objects.filter(frequency=1)
    #print(f"Here")
    model = apps.get_model(app_label='emailapp', model_name='User')
    users = model.objects.filter(frequency)

    for user in users:
        msgTemplate = render_to_string('email.html', {"firstName": user.first_name})
        content = Content("text/html", msgTemplate)
        #print(content)

        message = Mail(
            from_email=config('SENDER'),
            to_emails=user.email,
            subject="How do you feel about the weather today?",
            html_content=content
        )
        send(message, user)
