import redis
from ..utils.singleton import singleton
from os import getenv
from json import dumps, loads

@singleton
class KeyValueLib():
    connection: redis.Redis
    def __init__(self):
        self.connection = redis.Redis(password=getenv('REDIS_PASSWORD'), host=getenv('REDIS_HOST'))

    def set(self, key:str, value:str, ttl:int = None):
        if(ttl == None) :
            return self.connection.set(key, value)
        else:
            return self.connection.setex(key, ttl, value)
    def get(self, key:str):
        return self.connection.get(key)
    
    # def setJson(self, key:str, value:dict, ttl:int = None):
    #     return self.set(key, dumps(value), ttl)
    # def getJson(self, key:str):
    #     return loads(self.get(key))
    
    # def setInt(self, key:str, value:int, ttl:int = None):
    #     return self.set(key, str(value), ttl)
    # def getInt(self, key:str):
    #     return int(self.get(key))
    
    # def setBoolean(self, key:str, value:bool, ttl:int = None):
    #     return self.setInt(key, 1 if value else 0 , ttl)
    # def getBoolean(self, key:str):
    #     return True if self.getInt(key) == 1 else False 


