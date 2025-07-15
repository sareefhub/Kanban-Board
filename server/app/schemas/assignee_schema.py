from pydantic import BaseModel

class AssigneeCreate(BaseModel):
    task_id: int
    user_id: int
