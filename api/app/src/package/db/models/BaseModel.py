from peewee import Model, AutoField, DateTimeField
from ..connection import pg_db
from datetime import datetime

class BaseModel(Model):
    
    id = AutoField(primary_key=True)
    createdAt = DateTimeField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.createdAt = datetime.now()
    
    class Meta: 
        database = pg_db


