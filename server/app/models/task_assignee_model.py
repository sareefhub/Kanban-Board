from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship

class TaskAssignee(Base):
    __tablename__ = "task_assignees"
    
    task_id = Column(Integer, ForeignKey("tasks.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    
    task = relationship("Task", back_populates="assignees")
    user = relationship("User", back_populates="assigned_tasks")