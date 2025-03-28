
from ....db.repositories.User.UserRepository import UserRepository
from flask import request, jsonify
from ..Emails.EmailService import sendActivationEmail
from ...Responses import success, error
import asyncio
from peewee import DatabaseError

def registerService():
    try: 

        body = request.get_json()
        repo = UserRepository()

        try :
            save, commit, rollback = repo.createUser(body['email'], body['password'])
        except DatabaseError as e:
            return jsonify(error.errorResponse('Email gia utilizzata')), 400

        asyncio.run(sendActivationEmail(body['email']))

        commit()

        return jsonify(success.successResponse())
    
    except Exception as e:
        rollback()
        return jsonify(error.errorResponse('Generic server error')), 500