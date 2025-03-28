import jwt
from os import getenv
from datetime import datetime

class JWT:

    key = getenv("JWT_SECRET")
    auth_ttl = int(getenv('JWT_AUTH_TTL') or 3600) 
    email_ttl = int(getenv('JWT_EMAIL_TTL') or 86400)
    chat_ttl = int(getenv('JWT_CHAT_TTL') or 1800)
    algorithm="HS256"

    def decode_jwt(self, token:str, ttl: int):
        decoded = jwt.decode(token, self.key, algorithms=[self.algorithm])
        return {**decoded, "iat_object" : datetime.fromtimestamp(decoded['iat']), "has_expired": (datetime.timestamp(datetime.now()) - decoded['iat']) > ttl}

    def create_jwt(self, data:dict):
        return jwt.encode({**data, "iat": datetime.now()}, self.key, algorithm=self.algorithm)
