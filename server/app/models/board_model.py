from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Board(Base):
    __tablename__ = "boards"

    id         = Column(Integer, primary_key=True, index=True)
    title      = Column(String(100), nullable=False)
    owner_id   = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    owner   = relationship("User", back_populates="boards")
    members = relationship("BoardMember", back_populates="board", cascade="all, delete-orphan")
    columns = relationship("BoardColumn", back_populates="board", cascade="all, delete-orphan")