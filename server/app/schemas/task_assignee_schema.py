from pydantic import BaseModel

class TaskAssigneeCreate(BaseModel):
    user_id: int

    class Config:
        orm_mode = True

class TaskAssigneeOut(TaskAssigneeCreate):
    id: int
    task_id: int

    class Config:
        from_attributes = True
