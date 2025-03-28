from flask import request
from functools import wraps, partial


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
        

        

#middleware stack
middlewares = {}

def use(middleware: Middleware, **middleware_args):

    def decorator(controller):
        if(not controller.__name__ in middlewares): 
            middlewares[controller.__name__] = list()
        middlewares[controller.__name__].append((middleware, middleware_args))

        @wraps(controller)
        def _decorator(**kwargs):

            middlewareStack = middlewares[controller.__name__]

            instances = list()

            def call_controller(**middleware_args):
                return controller(**middleware_args)
            result = kwargs

            for middleware, middleware_args in middlewareStack:
                instances.append(middleware(**middleware_args))

            instances.reverse()

            for i in range(len(instances)):

                if i < len(instances) - 1:
                    instances[i].next = instances[i+1].before
                else:
                    instances[i].next = call_controller
                

            return instances[0].before(**kwargs)
        return _decorator
    return decorator