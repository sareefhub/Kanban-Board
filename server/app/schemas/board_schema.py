from pydantic import BaseModel
from datetime import datetime

class BoardBase(BaseModel):
    title: str

class BoardCreate(BoardBase):
    pass

class BoardUpdate(BaseModel):
    title: str

class BoardOut(BoardBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True