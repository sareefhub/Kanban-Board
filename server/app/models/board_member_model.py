from sqlalchemy import Column, Integer, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

class MemberRole(enum.Enum):
    owner = "owner"
    member = "member"

class BoardMember(Base):
    __tablename__ = "board_members"
    board_id = Column(Integer, ForeignKey("boards.id", ondelete="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    role = Column(Enum(MemberRole), default=MemberRole.member, nullable=False)
    joined_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    board = relationship("Board", back_populates="members")
    user = relationship("User", back_populates="memberships")
