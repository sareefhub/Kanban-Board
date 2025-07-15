from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    description: Optional[str]
    column_id: int
    position: Optional[int] = 0

class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    column_id: int
    position: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
