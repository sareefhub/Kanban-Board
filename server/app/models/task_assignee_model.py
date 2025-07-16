from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class TaskAssignee(Base):
    __tablename__ = "task_assignees"
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    assigned_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    task = relationship("Task", back_populates="assignees")
    user = relationship("User", back_populates="assigned_tasks")
