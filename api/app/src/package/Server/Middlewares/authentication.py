from ...utils.middleware import AuthenticationMiddleware, BodyMiddleware, Middleware
from ..Services.JWT.JWTService import verify_auth_jwt, verify_chat_jwt
from ..Responses.error import errorResponse


class UserAuthenticationMiddleware(AuthenticationMiddleware):

    def before(self, next, **params):

        try:
        
            user = verify_auth_jwt(self.token)

            if(user['has_expired']): raise
        
        except:
            return errorResponse('Unauthorized'), 403

        return next(**params, user=user)
    
class ChatAuthenticationMiddleware(Middleware):

    chatToken:str

    def before(self, next,**params):

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

        return next(chatAuth=chatAuth, **params)
    

