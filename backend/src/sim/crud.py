from pymongo.collection import Collection
from . import core


def most_similar(text, cln: Collection):
    search_result, rates = core.search(text, 50)

    document_list = []
    for index, rate in zip(search_result, rates):
        db_query = {"index": index}
        doc = cln.find_one(db_query)

        if doc:
            del doc["_id"]
            document_list.append({**doc, "rate": round(rate, 2)})

    return document_list


def most_similar_mono(text, cln: Collection):
    search_result, rates = core.search_mono(text)
    print("results", search_result)
    document_list = []
    for article_id, rate in zip(search_result, rates):
        db_query = {"article_id": article_id}
        doc = cln.find_one(db_query)

        if doc:
            del doc["_id"]
            document_list.append({**doc, "rate": round(rate, 2)})

    return document_list


def details(article_id, target, cln: Collection):
    db_query = {"article_id": article_id}
    source_path = cln.find_one(db_query)["path"]
    with open(source_path, "r", encoding="utf8") as f:
        source = f.read().split("\n\n*****\n\n")[1:]

    scores = core.compare(source, target)

    return scores
