from pydantic import BaseModel

class TaskAssigneeBase(BaseModel):
    task_id: int
    user_id: int

class TaskAssigneeCreate(TaskAssigneeBase):
    pass

class TaskAssigneeOut(TaskAssigneeBase):
    id: int

    class Config:
        from_attributes = True