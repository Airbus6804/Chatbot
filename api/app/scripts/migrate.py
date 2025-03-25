from utils.switchpath import switch_path

switch_path(False)

from package.db.connection import pg_db
from package.db.models.User.UserModel import UserModel

migrationResult = pg_db.create_tables([UserModel])