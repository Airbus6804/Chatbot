from flask import Flask
from ...Services.User.authService import email_verify_service

def authController(app:Flask):
    @app.get('/email_verify/<jwt>')
    def email_verify(jwt:str):
        return email_verify_service(jwt)