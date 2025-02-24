import time
import os
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError

DATABASE_URL = os.environ.get('DATABASE_URL')

while True:
    try:
        engine = create_engine(
            DATABASE_URL,
            connect_args={'charset': 'utf8mb4'}
        )
        conn = engine.connect()
        conn.close()
        print("Database is ready!")
        break
    except OperationalError:
        print("Waiting for the database to be ready...")
        time.sleep(5)

