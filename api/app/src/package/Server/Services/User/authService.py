from ..JWT.JWTService import verify_email_activation_jwt, create_auth_jwt
from ....KeyValue.KeyValue import invalidateEmailToken, isEmailTokenInvalid
from ....db.repositories.User.UserRepository import UserRepository
from flask import jsonify
from ...Responses import error, token

def email_verify_service(jwt:str):
    
    decoded_jwt = verify_email_activation_jwt(jwt)
    
    if(decoded_jwt["has_expired"]):
        return jsonify(error.errorResponse('Email Scaduta')), 403

    if(isEmailTokenInvalid(jwt)):
        return jsonify(error.errorResponse('Email Gia utilizzata')), 403
    
    invalidateEmailToken(jwt)
    
    repo = UserRepository()

    user = repo.setEmailValid(decoded_jwt["email"])

    return jsonify(token.tokenResponse(create_auth_jwt(user.id, user.email)))