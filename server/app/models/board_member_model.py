from sqlalchemy import Column, Integer, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum
from datetime import datetime
from app.database import Base

class MemberRole(PyEnum):
    owner = "owner"
    member = "member"

class BoardMember(Base):
    __tablename__ = "board_members"

    id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, ForeignKey("boards.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    role = Column(Enum(MemberRole), default=MemberRole.member)
    invited_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    board = relationship("Board", back_populates="members")
    user = relationship("User", back_populates="memberships")
