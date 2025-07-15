# server/main.py
from fastapi import FastAPI
from app.database import engine, Base
import app.models

app = FastAPI()

# สร้างตาราง
Base.metadata.create_all(bind=engine)

from app.routers import api_router
app.include_router(api_router)
