# task_tag_model.py
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class TaskTag(Base):
    __tablename__ = "task_tags"
    
    task_id = Column(Integer, ForeignKey("tasks.id"), primary_key=True)
    tag_id  = Column(Integer, ForeignKey("tags.id"), primary_key=True)

    # task = relationship("Task", back_populates="tags", overlaps="tag_items")
    # tag = relationship("Tag", back_populates="task_tags", overlaps="tasks")