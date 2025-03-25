from peewee import TextField, BooleanField
from ..BaseModel import BaseModel

class UserModel(BaseModel):
    email = TextField(index=True, unique=True, null=False)
    password = TextField(null=False)
    email_confirmed = BooleanField(default=False, null=False)
    