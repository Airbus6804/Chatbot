from peewee import PostgresqlDatabase, DatabaseError
import os

pg_db = PostgresqlDatabase(database=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'],
                           host='172.18.0.3', port=os.environ['POSTGRES_PORT'],)

try: 
    pg_db.connect(reuse_if_open=True)

except DatabaseError as e:
    print(f"❌ DATABASE CONNECTION ERROR: {e}")

print(pg_db.is_connection_usable())


