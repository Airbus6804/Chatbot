
from ....db.repositories.User.UserRepository import UserRepository
from flask import request
from ..Emails.EmailService import sendActivationEmail

def registerService():
    body = request.get_json()
    repo = UserRepository()
    repo.createUser(body['email'], body['password'])
    
    sendActivationEmail(body['email'])

    return 'registered'