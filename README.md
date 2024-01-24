# 1 build containers
## sudo sysctl -w vm.max_map_count=262144
## docker compose up -d

# 2 create and populate the elastic search index

## docker compose run --rm backend python scripts/elastic/create_and_populate_index.py

# 3 fill the mongodb docs table

## curl -X 'POST' 'http://127.0.0.1:8000/docs/from_json' -H 'accept: application/json' -d ''
