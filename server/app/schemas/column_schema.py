from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ColumnCreate(BaseModel):
    title: str
    board_id: int
    position: Optional[int] = 0


class ColumnUpdate(BaseModel):
    title: Optional[str] = None
    position: Optional[int] = None


class ColumnOut(BaseModel):
    id: int
    title: str
    board_id: int
    position: int
    created_at: datetime

    model_config = {"from_attributes": True}
