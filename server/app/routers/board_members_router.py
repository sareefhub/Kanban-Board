from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import BoardMember, Board
from app.schemas.board_member_schema import BoardMemberCreate, BoardMemberOut
from app.core.auth import get_current_user

router = APIRouter(prefix="/boards/{board_id}/members", tags=["board-members"])

@router.post("/", response_model=BoardMemberOut, status_code=status.HTTP_201_CREATED)
def invite_member(board_id: int, data: BoardMemberCreate, current=Depends(get_current_user), db: Session = Depends(get_db)):
    board = db.query(Board).get(board_id)
    if not board or board.owner_id != current.id:
        raise HTTPException(status_code=404, detail="Board not found")
    member = BoardMember(board_id=board_id, user_id=data.user_id)
    db.add(member); db.commit(); db.refresh(member)
    return member

@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_member(board_id: int, member_id: int, current=Depends(get_current_user), db: Session = Depends(get_db)):
    member = db.query(BoardMember).get(member_id)
    if not member or member.board_id != board_id:
        raise HTTPException(status_code=404, detail="Member not found")
    db.delete(member); db.commit()
