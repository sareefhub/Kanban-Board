from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    boards = relationship("Board", back_populates="owner")
    memberships = relationship("BoardMember", back_populates="user")
    assigned_tasks = relationship("TaskAssignee", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
