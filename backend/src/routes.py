from fastapi import APIRouter
from .docs.router import router as docs_router
from .sim.router import router as sim_router


api_router = APIRouter()

api_router.include_router(docs_router)
api_router.include_router(sim_router)