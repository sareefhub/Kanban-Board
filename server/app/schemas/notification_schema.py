from pydantic import BaseModel
from datetime import datetime

class NotificationOut(BaseModel):
    id: int
    user_id: int
    task_id: int
    type: str
    is_read: bool
    created_at: datetime

    model_config = {"from_attributes": True}
