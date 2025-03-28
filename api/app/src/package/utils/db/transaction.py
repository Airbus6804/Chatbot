from ...db.connection import pg_db

class Db_Transaction:
    def start_transaction(self):
        pg_db.begin()
    def commit_transaction(self):
        pg_db.commit()
    def rollback_transacton(self):
        pg_db.rollback()
    