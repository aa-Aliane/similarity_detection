from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import api_router

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Access-Control-Allow-Origin"],  # Add this line
)

app.include_router(api_router)
