from pydantic import BaseModel
from datetime import datetime

class NotificationBase(BaseModel):
    message: str

class NotificationCreate(NotificationBase):
    user_id: int

class NotificationOut(NotificationBase):
    id: int
    user_id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True