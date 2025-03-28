from utils.switchpath import switch_path

switch_path(False)

from package.db.connection import pg_db
from package.db.models.User.UserModel import UserModel
from package.db.models.Chat.ChatModel import ChatModel, User_Chat_Relation_Model

migrationResult = pg_db.create_tables([UserModel, ChatModel, User_Chat_Relation_Model])