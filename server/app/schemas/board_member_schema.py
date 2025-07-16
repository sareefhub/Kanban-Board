from pydantic import BaseModel
from datetime import datetime

class BoardMemberBase(BaseModel):
    user_id: int

class BoardMemberCreate(BoardMemberBase):
    pass

class BoardMemberOut(BoardMemberBase):
    id: int
    board_id: int
    invited_at: datetime

    class Config:
        from_attributes = True
