from sqlalchemy import Column as SAColumn, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class BoardColumn(Base):
    __tablename__ = "columns"

    id       = SAColumn(Integer, primary_key=True, index=True)
    title    = SAColumn(String(100), nullable=False)
    position = SAColumn(Integer, default=0)
    board_id = SAColumn(Integer, ForeignKey("boards.id", ondelete="CASCADE"))

    board = relationship("Board", back_populates="columns")
    tasks = relationship("Task", back_populates="column", cascade="all, delete-orphan")