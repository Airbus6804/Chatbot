from ..lib.keyValue import KeyValueLib
from ..lib.JWT import JWT

def invalidEmailJWTSKey(jwt:str):
    return f'iejk-{jwt}'


def invalidateEmailToken(jwt:str):
    KeyValueLib().set(invalidEmailJWTSKey(jwt), 1, JWT.email_ttl)

def isEmailTokenInvalid(jwt):
    return KeyValueLib().get(invalidEmailJWTSKey(jwt)) == b'1'