FROM python:3.10-bullseye

WORKDIR /code

COPY backend/src/req.txt ./src/req.txt

RUN pip install --upgrade pip

RUN pip install torch --index-url https://download.pytorch.org/whl/cpu

RUN pip install -r ./src/req.txt





COPY backend /code/

ENV UVICORN_PORT 80


EXPOSE $UVICORN_PORT