from ....LLM.llm import LLM
from flask import request, Response, jsonify
from ....db.repositories.Chat.ChatRepository import ChatRepository
import json
from ...Responses.chat import chatCreatedResponse, chatResponse, chatResponseSession, successResponse
from ...Responses.error import errorResponse
from ..JWT.JWTService import create_chat_jwt, verify_invite_jwt
from ....lib.keyValue import KeyValueLib
from ..Emails.EmailService import sendInvitationEmail
import requests
import asyncio

cache = KeyValueLib()

def getResponseStream(response: requests.Response, callback):

    receivedLines = list()
    def responseStream():
        for line in response.iter_lines():
            lineDict = json.loads(line)
            if(not lineDict['done']):
                receivedLines.append(lineDict['response'])
                yield json.dumps({'content': lineDict['response'], 'done': False}) + '\n'
            else: 
                callbackResponse = callback(receivedLines, lineDict)
                
        yield json.dumps(callbackResponse())
    
    return responseStream

def chatService(chat_id, user):

    repo = ChatRepository()

    body = request.get_json()

    llm = LLM()

    cachedContext = cache.get(f'chat-context-{chat_id}')

    if(cachedContext):
        context = json.loads(cachedContext)
    else:
        context = repo.getChatContextFromId(id=int(chat_id))

    response = llm.chat(body['chat'], context)

    def callback(receivedLines:list, lineDict: dict):
        record = repo.updateChat(newContext=lineDict['context'], chat_id=int(chat_id), llmresponse=''.join(receivedLines), userMail=user['email'], userText=body['chat'])
        cache.set(f'chat-context-{chat_id}', json.dumps(record.context), 86400)
        cache.set(f'chat-history-{chat_id}', json.dumps(record.chat_history), 86400)
        def callbackResponse():
           return chatResponse()
        return callbackResponse
    
    responseStream = getResponseStream(response, callback)

    return Response(responseStream(), content_type='application/json')

def returnChat(chat_id):

    cachedChatHistory = cache.get(f'chat-history-{chat_id}')

    if(cachedChatHistory):
        chatHistory = json.loads(cachedChatHistory)
    else:
        chatHistory = ChatRepository().getChatFromId(int(chat_id))
        cache.set(f'chat-history-{chat_id}', json.dumps(chatHistory), 86400)

    return jsonify(chatHistory)

def createChatService(user):

    body = request.get_json()

    llm = LLM()

    chatName = llm.getChatName(body['chat']).json()['response']

    response = llm.chat(body['chat'])

    def callback(receivedLines:list, lineDict: dict):
        llmResponse = ''.join(receivedLines)
        chatRepo = ChatRepository()
        chatRecord, messages = chatRepo.createChat(owner=user['userId'], ownerMail=user['email'], firstText=body['chat'], llmresponse=llmResponse, name=chatName, context=lineDict['context'])
        cache.set(f'chat-context-{chatRecord.id}', json.dumps(lineDict['context']), 86400)
        cache.set(f'chat-history-{chatRecord.id}', json.dumps(messages), 86400)

        def callbackResponse(): 
            return chatCreatedResponse(chatRecord.id, create_chat_jwt(chatId=chatRecord.id, role='owner', userId=user['userId']))
        return callbackResponse
    
    responseStream = getResponseStream(response=response, callback=callback)

    cache.delete(f'user-{user['userId']}-owner-chats')

    return Response(responseStream(), content_type='application/json')

def returnChatSessionService(user, chat_id, owner: bool):
    
    if(owner):
        isAuthorized = ChatRepository().isChatOwner(user_id=int(user['userId']), chat_id=int(chat_id))
    else:
        isAuthorized = ChatRepository().isAuthorized(user_id=int(user['userId']), chat_id=int(chat_id))

    token = create_chat_jwt(int(chat_id), 'owner' if owner else 'guest', int(user['userId']))

    if(not isAuthorized): return jsonify(errorResponse('Forbidden')), 401

    return jsonify(chatResponseSession(token))

def inviteToChatService(user, chat_id):
    
    emailTo = request.get_json()['emailTo']
    asyncio.run(sendInvitationEmail(int(chat_id), emailTo, user['email']))

    return jsonify(successResponse({}))

def acceptInviteToChat(mail_token, user):
    
    try:
        token = verify_invite_jwt(mail_token)
        if(token['has_expired']):
            return jsonify(errorResponse('Expired Token'))
        if(token['email'] != user['email']): raise
    except Exception as r:
        return jsonify(errorResponse('Forbidden')), 401
    
    ChatRepository().addGuestToChat(int(user['userId']), int(token['chatId']))
    chatAccessToken = create_chat_jwt(int(token['chatId']), 'guest', int(user['userId']))

    cache.delete(f'user-{user['userId']}-guest-chats')

    return jsonify(chatResponseSession(chatAccessToken))

def getChats(user):

    cachedOwnerChats = cache.get(f'user-{user['userId']}-owner-chats')
    cachedGuestChats = cache.get(f'user-{user['userId']}-guest-chats')

    cachedOwnerChats = None
    cachedGuestChats = None

    if(cachedOwnerChats):
        ownerChats = json.loads(cachedOwnerChats)
    else:
        ownerChats = ChatRepository().getOwnerChats(int(user['userId']))
        cache.set(f'user-{user['userId']}-owner-chats', json.dumps(ownerChats))

    if(cachedGuestChats):
        guestChats = json.loads(cachedGuestChats)
    else:
        guestChats = ChatRepository().getGuestChats(int(user['userId']))
        cache.set(f'user-{user['userId']}-guest-chats', json.dumps(guestChats))
        
    return jsonify({'ownerChats': ownerChats, 'guestChats': guestChats})
    





