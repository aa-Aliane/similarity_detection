import faiss, os
import unicodedata as ud
from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import time, os, pprint


pp = pprint.PrettyPrinter(indent=4)

temp = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_DIR = os.path.join(temp, "data")

model = SentenceTransformer(
    "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
)

index = faiss.read_index(os.path.join(DATA_DIR, "arxiv:latest.index"))

# Connect to your Elasticsearch instance
es = Elasticsearch([{"host": "es01", "port": 9200}])

# Index name
es_index = "es_db"


def search(query, top_k):
    query_vector = model.encode([ud.normalize("NFKD", query)])

    rates, top_k = index.search(query_vector, top_k)

    # results = [ doc_id : rate for  ####### ]

    rates = rates[0]
    rates = [100 * float(rate) / 10 for rate in rates]

    top_k_ids = top_k.tolist()[0]
    top_k_ids = list(top_k_ids)
    pp.pprint(top_k_ids)

    return top_k_ids, rates


def search_mono(query):
    # query the index here
    search_query = {"query": {"match": {"content": {"query": query}}}}

    # Execute the full-text search query
    results = es.search(index=es_index, body=search_query)

    top_k_ids = []
    rates = []

    try:
        # Get the maximum score in the result set
        max_score = max(hit["_score"] for hit in results["hits"]["hits"])

        for hit in results["hits"]["hits"]:
            top_k_ids.append(hit["_source"]["filename"])
            rate = (hit["_score"] / max_score) * 100
            rates.append(rate)
    except:
        pass

    return top_k_ids, rates


def compare(source, target):
    source_vectors = model.encode(source)
    target_vectors = model.encode(target)

    # Calculate cosine similarity for each pair of source and target paragraphs
    similarity_scores = [
        {
            "text": text,
            "rate": cosine_similarity([source_vectors], [target_vectors])[0][0],
        }
        for text, source_vectors in zip(source, source_vectors.tolist())
    ]

    return similarity_scores


def compare_mono(source, target):
    source_vectors = model.encode(source)
    target_vectors = model.encode(target)

    # Calculate cosine similarity for each pair of source and target paragraphs
    similarity_scores = [
        {
            "text": text,
            "rate": cosine_similarity([source_vectors], [target_vectors])[0][0],
        }
        for text, source_vectors in zip(source, source_vectors.tolist())
    ]

    return similarity_scores
