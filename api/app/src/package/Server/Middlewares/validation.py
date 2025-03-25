from ...utils.middleware import BodyMiddleware
from cerberus import Validator

class ValidationMiddleware(BodyMiddleware):

    
    schema: dict

    def __init__(self, schema):
        self.schema = schema
        super().__init__()


    def before(self, next):
        v = Validator(self.schema)
        if(v.validate(self.body)):
            return next()
        
        return "body error"

