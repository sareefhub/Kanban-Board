# app/main.py

from fastapi import FastAPI
from sqlalchemy import text
from app.database import engine, Base
import app.models
from app.routers import api_router

app = FastAPI()

# ลบทุกตารางด้วย CASCADE แล้วสร้างตารางใหม่
with engine.connect() as conn:
    conn.execute(text("DROP SCHEMA public CASCADE"))
    conn.execute(text("CREATE SCHEMA public"))
    conn.commit()


# สร้างตารางใหม่จากโมเดลทั้งหมด
# Base.metadata.create_all(bind=engine)

# รวม router ทั้งหมด
app.include_router(api_router)