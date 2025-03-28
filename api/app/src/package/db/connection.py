from peewee import DatabaseError
from playhouse.postgres_ext import PostgresqlExtDatabase
import subprocess
import os

pg_db = PostgresqlExtDatabase(database=os.getenv('POSTGRES_DB'), user=os.getenv('POSTGRES_USER'), password=os.getenv('POSTGRES_PASSWORD'),
                           host=os.getenv('PG_HOST'), port=os.getenv('POSTGRES_PORT'),)


try: 
    pg_db.connect(reuse_if_open=True)
    if not os.getenv('MIGRATION'):
        subprocess.run("MIGRATION=TRUE python /usr/app/scripts/migrate.py", shell=True)

except DatabaseError as e:
    print(f"❌ DATABASE CONNECTION ERROR: {e}")

print("Db connection status:",pg_db.is_connection_usable())
