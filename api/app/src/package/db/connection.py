from peewee import PostgresqlDatabase, DatabaseError
import os

pg_db = PostgresqlDatabase(database=os.getenv('POSTGRES_DB'), user=os.getenv('POSTGRES_USER'), password=os.getenv('POSTGRES_PASSWORD'),
                           host=os.getenv('PG_HOST'), port=os.getenv('POSTGRES_PORT'),)


try: 
    pg_db.connect(reuse_if_open=True)

except DatabaseError as e:
    print(f"❌ DATABASE CONNECTION ERROR: {e}")

print("Db connection status:",pg_db.is_connection_usable())
