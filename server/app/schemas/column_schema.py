from pydantic import BaseModel

class BoardColumnBase(BaseModel):
    title: str
    position: int | None = 0

class BoardColumnCreate(BoardColumnBase):
    board_id: int

class BoardColumnUpdate(BaseModel):
    title: str
    position: int | None = 0

class BoardColumnOut(BoardColumnBase):
    id: int
    board_id: int

    class Config:
        from_attributes = True