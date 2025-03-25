from flask import Flask
from ..utils.singleton import singleton
from ..Server.Controllers.User import loginController, registerController, authController

@singleton
class Server:
    app:Flask

    def __init__(self):
        self.app = Flask(__name__)
        loginController.loginController(self.app)
        registerController.registerController(self.app)
        authController.authController(self.app)

        
