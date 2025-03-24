from utils.switchpath import switch_path

switch_path(False)

from db.connection import pg_db
from db.models.User.UserModel import UserModel

migrationResult = pg_db.create_tables([UserModel])


print(migrationResult)
