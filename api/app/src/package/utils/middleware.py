from flask import request
from functools import wraps


class Middleware: 

    request

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
    


def use(middleware: Middleware, **middleware_args):


    def decorator(controller):
        @wraps(controller)
        def _decorator(*args, **kwargs):

            def call_controller():
                return controller(*args, **kwargs)
            _middleware = middleware(**middleware_args)
            result = _middleware.before(call_controller)
            
            _middleware.after()
            return result
        return _decorator
    return decorator