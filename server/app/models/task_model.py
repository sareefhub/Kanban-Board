from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text)
    column_id = Column(Integer, ForeignKey("board_columns.id", ondelete="CASCADE"), nullable=False)
    position = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    column = relationship("BoardColumn", back_populates="tasks")
    tags = relationship("TaskTag", back_populates="task")
    assignees = relationship("TaskAssignee", back_populates="task")
    notifications = relationship("Notification", back_populates="task")
