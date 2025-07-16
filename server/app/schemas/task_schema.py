from pydantic import BaseModel
from typing import List

class TaskBase(BaseModel):
    title: str
    description: str | None = None
    position: int | None = 0

class TaskCreate(TaskBase):
    column_id: int

class TaskOut(TaskBase):
    id: int
    column_id: int

    class Config:
        from_attributes = True