from elasticsearch import Elasticsearch
import os, sys
from tqdm import tqdm


BASE_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data"
)
FILES_DIR = os.path.join(BASE_DIR, "files")

# Connect to your Elasticsearch instance
es = Elasticsearch([{"host": "es01", "port": 9200}])


# Index name in Elasticsearch
index_name = "es_db"

# Mapping for Elasticsearch index
mapping = {
    "properties": {
        "content": {"type": "text", "analyzer": "standard"},
        "filename": {"type": "text"}
        # Add other fields as needed
    }
}

# Delete the index if it exists
# es.indices.delete(index=index_name, ignore=[400, 404])

# Create the index
es.indices.create(index=index_name, body={"mappings": mapping}, ignore=400)


def index_document(file_path):
    """Index a document into Elasticsearch."""
    with open(file_path, "r", encoding="utf-8") as file:
        file_content = file.read()

    document = {"filename": os.path.basename(file_path)[:-4], "content": file_content}
    es.index(index=index_name, body=document)


# Iterate through each file in the folder
for filename in tqdm(os.listdir(FILES_DIR)):
    if filename.endswith(".txt"):
        file_path = os.path.join(FILES_DIR, filename)
        index_document(file_path)

print("Indexing completed.")
