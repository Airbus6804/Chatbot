from ....lib.JWT import JWT
from typing import Literal

def create_auth_jwt(userId: int, email: str):
    return JWT().create_jwt({"userId": userId, "email": email})

def verify_auth_jwt(token:str):
    return JWT().decode_jwt(token, JWT.auth_ttl)

def create_email_activation_jwt(email:str):
    return JWT().create_jwt({"email": email})

def verify_email_activation_jwt(token:str):
    return JWT().decode_jwt(token, JWT.email_ttl)

def create_chat_jwt(chatId:int, role:Literal ['owner', 'guest'], userId:int):
    return JWT().create_jwt({"chatId": chatId, "role": role, 'userId': userId})

def verify_chat_jwt(token:str):
    return JWT().decode_jwt(token, JWT.chat_ttl)

def create_invite_jwt(chatId:int, email:str):
    return JWT().create_jwt({'chatId': chatId, 'email':email})

def verify_invite_jwt(token:str):
    return JWT().decode_jwt(token, JWT.email_ttl)