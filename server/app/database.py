import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from dotenv import load_dotenv

load_dotenv()

# อ่าน DATABASE_URL จาก .env หรือ fallback เป็น SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency สำหรับใช้ใน endpoint
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
