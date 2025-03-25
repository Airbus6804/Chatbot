
from ....db.repositories.User.UserRepository import UserRepository
from flask import request, jsonify
from ...Responses import error, token
from ..JWT.JWTService import create_auth_jwt

def loginService():
    body = request.get_json()
    repo = UserRepository()
    user = repo.getUserFromEmailAndPassword(body['email'], body['password'])
    if(not user):
        return jsonify(error.errorResponse('Email o Password sbagliati')), 400
    if(not user.email_confirmed) :
        return error.errorResponse('Email non confermata'), 403

    return jsonify(token.tokenResponse(create_auth_jwt(user.id, user.email)))