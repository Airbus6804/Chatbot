from flask import Flask
from ....utils import schemas
from ....utils.middleware import use
from ...Middlewares.validation import ValidationMiddleware
from ...Services.User.registerService import registerService

def registerController(app: Flask):
    @app.post('/register')
    @use(ValidationMiddleware, schema={'email': schemas.email, 'password': schemas.password})
    def register():
        return registerService()