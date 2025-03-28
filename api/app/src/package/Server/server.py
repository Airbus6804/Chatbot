from flask import Flask, jsonify
from .Responses.error import errorResponse
from ..utils.singleton import singleton
from ..Server.Controllers.User import loginController, registerController, authController, chatController
from ..LLM.llm import LLM

@singleton
class Server:
    app:Flask

    def __init__(self):
        self.app = Flask(__name__)
        LLM()
        loginController.loginController(self.app)
        registerController.registerController(self.app)
        authController.authController(self.app)
        chatController.chatController(self.app)

        @self.app.ensure_sync(Exception)
        def handleExeption(e): self.errorHandler(e)
        
    def errorHandler(e):
        print(e)
        return jsonify(errorResponse('generic error')), 500

        
