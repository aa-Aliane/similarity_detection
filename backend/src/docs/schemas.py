from pydantic import BaseModel
from enum import Enum
from bson import ObjectId


class Author(BaseModel):
    name: str


class Language(str, Enum):
    fr = "fr"
    en = "en"
    ar = "ar"
    ot = "ot"


class Doc(BaseModel):
    title: str
    url: str
    authors: list[Author]
    language: Language


class DocResponse(Doc):
    _id: ObjectId

    class Config:
        arbitrary_types_allowed = True


class Docs(BaseModel):
    docs: list[Doc]
