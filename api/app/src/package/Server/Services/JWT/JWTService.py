from ....lib.JWT import JWT

def create_auth_jwt(userId: int, email: str):
    return JWT().create_jwt({"userId": userId, "email": email})

def verify_auth_jwt(token:str):
    return JWT().decode_jwt(token, JWT.auth_ttl)

def create_email_activation_jwt(email:str):
    return JWT().create_jwt({"email": email})

def verify_email_activation_jwt(token:str):
    return JWT().decode_jwt(token, JWT.email_ttl)