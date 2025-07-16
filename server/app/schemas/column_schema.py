from pydantic import BaseModel

class ColumnBase(BaseModel):
    title: str
    position: int | None = 0

class ColumnCreate(ColumnBase):
    board_id: int

class ColumnUpdate(BaseModel):
    title: str
    position: int | None = 0

class ColumnOut(ColumnBase):
    id: int
    board_id: int

    class Config:
        from_attributes = True