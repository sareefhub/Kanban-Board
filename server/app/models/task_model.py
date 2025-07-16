# task_model.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    position = Column(Integer, default=0)
    column_id = Column(Integer, ForeignKey("columns.id", ondelete="CASCADE"))

    column = relationship("BoardColumn", back_populates="tasks")
    tags = relationship("TaskTag", back_populates="task", cascade="all, delete-orphan", overlaps="tag_items")
    tag_items = relationship("Tag", secondary="task_tags", back_populates="tasks", overlaps="tags")
    assignees = relationship("TaskAssignee", back_populates="task", cascade="all, delete-orphan")
