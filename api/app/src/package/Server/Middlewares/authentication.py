from ...utils.middleware import AuthenticationMiddleware, BodyMiddleware, Middleware
from ..Services.JWT.JWTService import verify_auth_jwt, verify_chat_jwt
from ..Responses.error import errorResponse


class UserAuthenticationMiddleware(AuthenticationMiddleware):

    def before(self, next, **params):

        print('aut')

        try:
        
            user = verify_auth_jwt(self.token)

            print(user)

            if(user['has_expired']): raise
        
        except:
            print('except')
            return errorResponse('Unauthorized'), 403

        return next(**params, user=user)
    
class ChatAuthenticationMiddleware(Middleware):

    chatToken:str

    def before(self, next,**params):

        print('chat aut')

        chatAuthToken = self.request.headers.get('Chat-Auth-Token') or ''

        try:
            chatAuth = verify_chat_jwt(chatAuthToken)
            
            if(chatAuth['has_expired']): return errorResponse('Token Expired'), 401

            if(int(chatAuth['chatId']) != int(params['chat_id'])):
                raise
            if(int(chatAuth['userId']) != int(params['user']['userId'])):
                raise

        except Exception as e:
            return errorResponse('Forbidden'), 401
        
        print('calling controller')

        return next(chatAuth=chatAuth, **params)
    

