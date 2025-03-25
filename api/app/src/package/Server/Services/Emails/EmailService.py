from ....email.EmailTemplates import EmailConfirmationMail
from ..JWT.JWTService import create_email_activation_jwt
from os import getenv
def sendActivationEmail(email:str):
    jwt = create_email_activation_jwt(email)
    emailInstance = EmailConfirmationMail(emailTo=email, link=f'{getenv('URL')}/email_verify/{jwt}')
    emailInstance.send()