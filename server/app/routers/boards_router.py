from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, select
from app.database import get_db
from app.models import Board, BoardMember
from app.schemas.board_schema import BoardCreate, BoardOut, BoardUpdate
from app.core.auth import get_current_user

router = APIRouter(prefix="/boards", tags=["boards"])

@router.post("/", response_model=BoardOut, status_code=status.HTTP_201_CREATED)
def create_board(
    data: BoardCreate,
    current=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    board = Board(**data.dict(), owner_id=current.id)
    db.add(board)
    db.commit()
    db.refresh(board)
    return board

@router.get("/", response_model=list[BoardOut])
def list_boards(
    current=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    subquery = select(BoardMember.board_id).where(BoardMember.user_id == current.id)
    boards = db.query(Board).filter(
        or_(
            Board.owner_id == current.id,
            Board.id.in_(subquery)
        )
    ).all()
    return boards

@router.put("/{board_id}", response_model=BoardOut)
def update_board(
    board_id: int,
    data: BoardUpdate,
    current=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    board = db.query(Board).filter(Board.id == board_id, Board.owner_id == current.id).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    board.title = data.title
    db.commit()
    db.refresh(board)
    return board

@router.delete("/{board_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_board(
    board_id: int,
    current=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    board = db.query(Board).filter(Board.id == board_id, Board.owner_id == current.id).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    db.delete(board)
    db.commit()
