import faiss, os, json
import unicodedata as ud
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import time, os, pprint
from .utils import split_source

pp = pprint.PrettyPrinter(indent=4)

temp = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_DIR = os.path.join(temp, "data")

model = SentenceTransformer(
    "sentence-transformers/paraphrase-mpnet-base-v2"
)

index = faiss.read_index(os.path.join(DATA_DIR, "arxiv:latest.index"))


def search(query, top_k):
    t = time.time()
    query_vector = model.encode([query])
    print("queryyyyyyyyyyyy", query)
    rates, top_k = index.search(query_vector, top_k)
    rates = rates[0]

    pp.pprint(top_k)
    rates = [100 * float(rate) // 10 for rate in rates]

    print(">>>> Results in Total Time: {}".format(time.time() - t))
    top_k_ids = top_k.tolist()[0]
    pp.pprint(top_k_ids)
    top_k_ids = list(set(top_k_ids))

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
