from flask import Flask
from ....utils import schemas
from ....utils.middleware import use
from ...Middlewares.validation import ValidationMiddleware
from ...Services.User.loginService import loginService

def loginController(app: Flask):
    @app.post('/login')
    @use(ValidationMiddleware, schema={'email': schemas.email, 'password': schemas.password})
    def login():
        return loginService()