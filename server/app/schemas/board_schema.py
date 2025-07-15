from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BoardCreate(BaseModel):
    title: str

class BoardUpdate(BaseModel):
    title: Optional[str] 

class BoardOut(BaseModel):
    id: int
    title: str
    owner_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
