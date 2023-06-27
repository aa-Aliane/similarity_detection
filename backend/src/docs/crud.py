from pymongo.collection import Collection
from bson import ObjectId
from . import schemas

import os, sys
import json


# Append parent directory to the system path to import the "database" module
temp = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
PARENT_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(temp, "data")
sys.path.append(PARENT_DIR)


from database import get_db


def create(doc: schemas.Doc, cln: Collection):
    db_doc = doc.dict()
    cln.insert_one(db_doc)
    created_doc = schemas.DocResponse(**db_doc)

    return created_doc


def from_json(cln: Collection):

    cln.delete_many({})

    with open(os.path.join(DATA_DIR, "pnst_sim.json"), "r", encoding="utf8") as f:
        data = json.load(f)

    
    cln.insert_many(data)

    return "inserted"


def read(cln: Collection, page: int = 1, limit: int = 10):
    skip_count = (page - 1) * limit
    docs = cln.find().skip(skip_count).limit(limit)

    response = []
    for d in docs:
        del d["_id"]
        response.append(d)

    return response


