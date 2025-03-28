from flask import request
from functools import wraps


class Middleware: 

    request

    def next(): pass

    def __init__(self):
        super().__init__()
        self.request = request

    def before(self, next):
        return next()
    def after(self):
        pass

class BodyMiddleware(Middleware):
    body:dict

    def __init__(self):
        super().__init__()
        self.body = self.request.get_json()

class AuthenticationMiddleware(Middleware):
    
    token: str = ''
    authHeader: str = ''
    
    def __init__(self):
        super().__init__()
        self.authHeader = self.request.headers.get('Authorization')

        if(self.authHeader):
            splitToken = self.authHeader.split(' ')
            if(splitToken[1]):
                self.token = splitToken[1]
        

    


def use(middleware: Middleware, **middleware_args):


    def decorator(controller):
        @wraps(controller)
        def _decorator(*args, **kwargs):


            def call_controller(**chain):
                return controller(**chain)
            _middleware = middleware(**middleware_args)
            result = _middleware.before(next=call_controller, **kwargs)
            
            _middleware.after()
            return result
        return _decorator
    return decorator