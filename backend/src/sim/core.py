import faiss, os, json
import unicodedata as ud
from sentence_transformers import SentenceTransformer
import numpy as np
import time, os, pprint

pp = pprint.PrettyPrinter(indent=4)

temp = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_DIR = os.path.join(temp, "data")

model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

index = faiss.read_index(os.path.join(DATA_DIR, "pnst.kphrases.index"))


def search(query, top_k):
    t = time.time()
    query_vector = model.encode([query])
    rates, top_k = index.search(query_vector, top_k)
    rates = rates[0]

    pp.pprint(top_k)
    rates = [100 * float(rate) // 10 for rate in rates]

    print(">>>> Results in Total Time: {}".format(time.time() - t))
    top_k_ids = top_k.tolist()[0]
    pp.pprint(top_k_ids)
    top_k_ids = list(set(top_k_ids))

    return top_k_ids