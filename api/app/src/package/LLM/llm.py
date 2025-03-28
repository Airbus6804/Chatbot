from os import getenv
from ..utils.singleton import singleton
import requests
from flask import Response

@singleton
class LLM():
    
    ollama_host = getenv('OLLAMA_HOST')
    ollama_port = getenv('OLLAMA_PORT')
    model = getenv('OLLAMA_MODEL')

    url=f'http://{ollama_host}:{ollama_port}/api'

    def __init__(self) : 
        with requests.post(f'{self.url}/pull', json={"model": self.model},stream=True) as response:
            for line in response.iter_lines():
                if(line):
                    print(str(line))

    def getChatBody(self,text:str, context = None):
        chatBody = {"model": self.model, "prompt": text}
        if(context): chatBody['context'] = context
        return chatBody

    def chat(self, text:str, context = None):
        return requests.post(f'{self.url}/generate', json=self.getChatBody(text, context), stream=True)

    def getChatName(self, text:str):
        return requests.post(f'{self.url}/generate', json={**self.getChatBody(f'DO NOT ANSWER Just Summarize the prompt in quotes with exactly three words. No extra text: "{text}"'), 'stream': False})

    def streamLineByLine(self, response:requests.Response, callback):
        for line in response.iter_lines():
            callback(line)
            yield line