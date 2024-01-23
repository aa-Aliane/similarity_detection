from fastapi import APIRouter, Depends, Query
from pymongo.database import Database
from bson import ObjectId
from . import crud, schemas

# from . import auth_services as auth

import os, sys

# Append parent directory to the system path to import the "database" module
PARENT_DIR = os.path.dirname(os.path.dirname(__file__))
sys.path.append(PARENT_DIR)

from database import get_db

# Create an APIRouter instance for the similarity_detection endpoints
router = APIRouter(
    prefix="/docs",
    tags=["Docs"],
    responses={404: {"description": "Not found"}},
)


@router.post("/create")
async def create_user(doc: schemas.Doc, db: Database = Depends(get_db)):
    cln = db["docs"]
    reponse = crud.create(doc=doc, cln=cln)

    return {"message": reponse}


@router.post("/from_json")
async def from_json(db: Database = Depends(get_db)):
    cln = db["docs"]
    reponse = crud.from_json(cln=cln)

    return {"message": reponse}


@router.post("/update_json")
async def update_json(db: Database = Depends(get_db)):
    cln = db["docs"]
    reponse = crud.update_json(cln=cln)

    return {"message": reponse}


@router.get("/read")
async def read_articles(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Database = Depends(get_db),
):
    cln = db["docs"]
    response = crud.read(cln=cln, page=page, limit=limit)

    return {"articles": response}
