from pydantic import BaseModel

class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    task_id: int

class TagOut(TagBase):
    id: int
    task_id: int

    class Config:
        from_attributes = True