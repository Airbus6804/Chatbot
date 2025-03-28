from ....email.EmailTemplates import EmailConfirmationMail, ChatInviteMail
from ..JWT.JWTService import create_email_activation_jwt, create_invite_jwt
from os import getenv
async def sendActivationEmail(email:str):
    jwt = create_email_activation_jwt(email)
    emailInstance = EmailConfirmationMail(emailTo=email, link=f'{getenv('FRONTEND_URL')}/email_verify/{jwt}')
    await emailInstance.send()

async def sendInvitationEmail(chat_id:int, email:str, emailFrom:str):
    jwt = create_invite_jwt(chatId=chat_id, email=email)
    emailInstance = ChatInviteMail(emailTo=email, link=f'{getenv('FRONTEND_URL')}/chat/invite/accept/{jwt}', emailFrom=emailFrom)
    await emailInstance.send()