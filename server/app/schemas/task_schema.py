from pydantic import BaseModel
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None

    class Config:
        from_attributes = True

class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    priority: str

    class Config:
        from_attributes = True

class TaskReorder(BaseModel):
    task_id: int
    new_column_id: int
    new_position: int

    class Config:
        from_attributes = True
