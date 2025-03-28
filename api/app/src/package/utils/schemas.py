email = {
       'type': 'string',
       'regex': '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    }

password = {
    'type': 'string',
    'min': 8,
    'max': 20
}

llmChatMessage = {
    'type': 'string',
    'min': 1,
    'max': pow(2, 12)
}