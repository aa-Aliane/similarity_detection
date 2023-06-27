from pymongo import MongoClient
from dotenv import load_dotenv

import os

load_dotenv()

db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

MONGODB_URI = f"mongodb://{db_user}:{db_password}@db_mongo:27017"


def get_db():
    client = MongoClient(MONGODB_URI)
    db = client["docs_db"]
    yield db