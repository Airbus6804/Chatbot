from peewee import ForeignKeyField, TextField
from ..User.UserModel import UserModel
from playhouse.postgres_ext import BinaryJSONField
from ..BaseModel import BaseModel

class ChatModel(BaseModel):
    chat_history = BinaryJSONField(default=[], null=False)
    context = BinaryJSONField(default=[], null=False)
    owner = ForeignKeyField(UserModel, backref='owner', null=False)
    name = TextField(null=False)


class User_Chat_Relation_Model(BaseModel):
    chat = ForeignKeyField(ChatModel, backref='chat', null=False)
    guest = ForeignKeyField(UserModel, backref='guest', null=False)