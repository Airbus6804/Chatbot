from flask import Flask
from ...Services.Chat import chatService
from ....utils import schemas
from ....utils.middleware import use
from ...Middlewares import validation, authentication

def chatController(app: Flask):

    @app.post('/chat/<chat_id>')
    @use(validation.ValidationMiddleware, schema={"chat": schemas.llmChatMessage})
    @use(authentication.UserAuthenticationMiddleware)
    @use(authentication.ChatAuthenticationMiddleware)
    def chat(user, chat_id, chatAuth):
        return chatService.chatService(chat_id=chat_id,user=user)
    
    @app.post('/create-chat')
    @use(validation.ValidationMiddleware, schema={"chat": schemas.llmChatMessage})
    @use(authentication.UserAuthenticationMiddleware)
    def createChat(user):
        return chatService.createChatService(user)
    
    @app.get('/chat/<chat_id>')
    @use(authentication.UserAuthenticationMiddleware)
    @use(authentication.ChatAuthenticationMiddleware)
    def getChat(chat_id, user, chatAuth):
        return chatService.returnChat(chat_id)
    
    @app.get('/chat/<chat_id>/session')
    @use(authentication.UserAuthenticationMiddleware)
    def getChatSessionAsOwner(chat_id, user):
        return chatService.returnChatSessionService(user, chat_id, True)
    
    @app.get('/chat/<chat_id>/session/guest')
    @use(authentication.UserAuthenticationMiddleware)
    def getChatSessionAsGuest(chat_id, user):
        return chatService.returnChatSessionService(user, chat_id, False)

    @app.post('/chat/<chat_id>/invite')
    @use(validation.ValidationMiddleware, schema={'emailTo': schemas.email})
    @use(authentication.UserAuthenticationMiddleware)
    @use(authentication.ChatAuthenticationMiddleware)
    def inviteToChat(chat_id, user, chatAuth):
        return chatService.inviteToChatService(user, chat_id)
    
    @app.get('/chat/invite/accept/<mail_token>')
    @use(authentication.UserAuthenticationMiddleware)
    def acceptInviteToChat(mail_token, user):
        return chatService.acceptInviteToChat(mail_token, user)
    
    @app.get('/chats')
    @use(authentication.UserAuthenticationMiddleware)
    def getChats(user):
        return chatService.getChats(user)

