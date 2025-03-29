from ...utils.middleware import BodyMiddleware
from flask import jsonify
from ..Responses.error import errorResponse
from cerberus import Validator

class ValidationMiddleware(BodyMiddleware):

    
    schema: dict

    def __init__(self, schema):
        self.schema = schema
        super().__init__()


    def before(self,next, **params):
        v = Validator(self.schema)
        print(self.body)
        try:
            if(v.validate(self.body)):
                return next(**params)
            return jsonify(errorResponse('body error')), 400
        except Exception as e:
            return jsonify(errorResponse('body error')), 400

