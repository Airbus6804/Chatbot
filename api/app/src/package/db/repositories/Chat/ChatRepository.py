from ...models.User.UserModel import UserModel
from ...models.Chat.ChatModel import ChatModel, User_Chat_Relation_Model
from ....utils.db.transaction import Db_Transaction
from peewee import fn, Cast
from psycopg2.extras import Json 
from datetime import datetime
import json
import html

class ChatRepository(Db_Transaction): 

    def chatFactory(self, text: str, sender: str):
        return {"text": html.escape(text), "email": sender, "timestamp": int(datetime.now().timestamp())}

    def getChatFromId(self, id:int):
        chat =  list(ChatModel().select().where(ChatModel.id==id))

        if(len(chat) == 0): return False 

        return {'id': chat[0].id, 'chat': chat[0].chat_history}
    
    def getChatContextFromId(self, id:int):
        chat =  list(ChatModel().select(ChatModel.context).where(ChatModel.id==id))

        if(len(chat) == 0): return False 

        return chat[0].context

    def createChat(self, owner:int, ownerMail:str, firstText:str, llmresponse: str, name:str, context:list):
        messages = [self.chatFactory(firstText, ownerMail), self.chatFactory(llmresponse, 'chatbot')]
        model = ChatModel()
        record = model.create(owner=owner, name = name, chat_history = messages, context = context)

        return record, messages
    
    def updateChat(self, newContext:list, userText:str, llmresponse:str, chat_id:int, userMail:str):
        messages = [self.chatFactory(userText, userMail), self.chatFactory(llmresponse, 'chatbot')]
        json_messages = Cast(Json(messages), 'jsonb')
        record = list(ChatModel().update(context=newContext,chat_history=ChatModel.chat_history.concat(json_messages)).where(ChatModel.id==chat_id).returning(ChatModel.context, ChatModel.chat_history).execute())[0]

        return record
    
    def isChatOwner(self, user_id: int, chat_id: int):
        record = ChatModel().select().where(ChatModel.owner==user_id, ChatModel.id == chat_id).count()
        return record > 0
    
    def isAuthorized(self, user_id: int, chat_id: int):
        record = User_Chat_Relation_Model().select().where(User_Chat_Relation_Model.guest==user_id, User_Chat_Relation_Model.chat == chat_id).count()
        return record > 0
    
    def addGuestToChat(self, user_id:int, chat_id:int):
        record = User_Chat_Relation_Model().create(guest=user_id, chat=chat_id)
        return record
    
    def getOwnerChats(self, user_id: int):
        chats = list(ChatModel().select(ChatModel.name, ChatModel.id).order_by(ChatModel.id.desc()).where(ChatModel.owner == user_id).dicts())

        return chats

    def getGuestChats(self, user_id:int):
        chats = list(User_Chat_Relation_Model().select(ChatModel.name, ChatModel.id).order_by(User_Chat_Relation_Model.id.desc()).join(ChatModel, on=(User_Chat_Relation_Model.chat == ChatModel.id)).where(User_Chat_Relation_Model.guest == user_id).dicts())
        
        return chats
        
        

        
        