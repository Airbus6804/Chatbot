import hashlib, uuid
from os import getenv

def hashPassword(password: str):
    salt = getenv("PASSWORD_HASH_SALT")
    hashed_password = hashlib.md5((str(salt) + password).encode()).hexdigest()
    return hashed_password

