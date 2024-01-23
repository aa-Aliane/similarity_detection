from pymongo.collection import Collection
from . import core


def most_similar(text, cln: Collection):
    search_result, rates = core.search(text, 50)

    db_query = {"index": {"$in": search_result}}
    docs = cln.find(db_query)

    document_list = []
    for d, rate in zip(docs, rates):
        del d["_id"]
        document_list.append({**d, "rate": rate})

    return document_list


def details(article_id, target, cln: Collection):
    db_query = {"article_id": article_id}
    source_path = cln.find_one(db_query)["url"]
    with open(source_path, "r", encoding="utf8") as f:
        source = f.read().split("\n\n*****\n\n")
    print("sourceeeeeeeeeeeeeeeeeeeee", len(source))
    scores = core.compare(source, target)

    return scores
