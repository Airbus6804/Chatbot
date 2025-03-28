from ...models.User.UserModel import UserModel
from ....utils.hashPassword import hashPassword
from ....utils.db.transaction import Db_Transaction

class UserRepository(Db_Transaction): 

    def createUser(self, email:str, password: str):

        self.start_transaction()

        model = UserModel()

        model.email = email
        model.password = hashPassword(password)

        return model.save(), self.commit_transaction, self.rollback_transacton
    
    def getUserFromId(self, id:int):   
        users = UserModel.select().where(UserModel.id == id)
    
        user_list = [
            {"id": user.id, "email": user.email, "createdAt": user.createdAt, 'password': user.password}
            for user in users
        ]

        return user_list
    
    def getUserFromEmailAndPassword(self, email:str, password:str):   
        users = UserModel.select().where(UserModel.email == email, UserModel.password == hashPassword(password))
    
        users_list = list(users)

        if(len(users_list) == 0): return False
        return users_list[0]
    
    def getUserFromEmail(self, email:str):   
        users = UserModel.select().where(UserModel.email == email)
    
        users_list = list(users)

        if(len(users_list) == 0): return False
        return users_list[0]
    
    def setEmailValid(self, email:str):
        users = UserModel.update(email_confirmed = True).where(UserModel.email == email).returning(UserModel.email, UserModel.id)
    
        users_list = list(users)

        if(len(users_list) == 0): return False
        return users_list[0]
            
                
        