from .success import successResponse

def chatCreatedResponse(chatId, chatToken):
    return successResponse({'chatId': chatId, 'chatToken': chatToken, 'done':True})    
def chatResponse():
    return successResponse({'done': True})
def chatResponseSession(token):
    return successResponse({'chatToken': token})