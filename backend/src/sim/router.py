from fastapi import APIRouter, Depends
from pymongo.database import Database
from bson import ObjectId
from . import crud
# from . import schemas
# from . import auth_services as auth
import os, sys

# Append parent directory to the system path to import the "database" module
PARENT_DIR = os.path.dirname(os.path.dirname(__file__))
sys.path.append(PARENT_DIR)

from database import get_db

# Create an APIRouter instance for the similarity_detection endpoints
router = APIRouter(
    prefix="/sim",
    tags=["Sim"],
    responses={404: {"description": "Not found"}},
)


from database import get_db


# Endpoint to get most similar docs
@router.get("/most_similar")
async def most_similar(text, db: Database = Depends(get_db)):
    cln = db["docs"]
    response = crud.most_similar(text, cln)
    return {"results": response}

# Endpoint to get most similar docs
@router.get("/most_similar_mono")
async def most_similar_mono(text, db: Database = Depends(get_db)):
    cln = db["docs"]
    response = crud.most_similar_mono(text, cln)
    return {"results": response}

# Endpoint to get details
@router.get("/details")
async def details(article_id, target, db: Database = Depends(get_db)):
    cln = db["docs"]
    response = crud.details(article_id, target, cln)
    return {"results": response}
