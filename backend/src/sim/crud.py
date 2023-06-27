from pymongo.collection import Collection
from . import core


def most_similar(text, cln: Collection):
    search_result = core.search(text, 10)
    db_query = {"index": {"$in": search_result}}
    docs = cln.find(db_query)

    
    document_list = []
    for d in docs:
        del d["_id"]
        document_list.append(d)

 

    return document_list
