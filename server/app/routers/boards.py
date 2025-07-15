from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Board, BoardMember, User
from app.schemas.board_schema import BoardCreate, BoardOut, BoardUpdate
from app.routers.auth import get_current_user

router = APIRouter(prefix="/boards", tags=["boards"])

# ✅ CREATE
@router.post("/", response_model=BoardOut, status_code=status.HTTP_201_CREATED)
def create_board(
    b_in: BoardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    board = Board(title=b_in.title, owner_id=current_user.id)
    db.add(board)
    db.commit()
    db.refresh(board)

    # เพิ่มตัวสร้างเป็นสมาชิกบอร์ดด้วย
    member = BoardMember(board_id=board.id, user_id=current_user.id)
    db.add(member)
    db.commit()

    return board

# ✅ READ (List all boards of current user)
@router.get("/", response_model=List[BoardOut])
def list_boards(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Board)
        .join(BoardMember, BoardMember.board_id == Board.id)
        .filter(BoardMember.user_id == current_user.id)
        .all()
    )

# ✅ READ (Single board)
@router.get("/{board_id}", response_model=BoardOut)
def get_board(
    board_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    board = (
        db.query(Board)
        .join(BoardMember, BoardMember.board_id == Board.id)
        .filter(Board.id == board_id, BoardMember.user_id == current_user.id)
        .first()
    )
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    return board

# ✅ UPDATE
@router.put("/{board_id}", response_model=BoardOut)
def update_board(
    board_id: int,
    b_update: BoardUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    board = db.query(Board).filter(Board.id == board_id).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    if board.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this board")

    board.title = b_update.title
    db.commit()
    db.refresh(board)
    return board

# ✅ DELETE
@router.delete("/{board_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_board(
    board_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    board = db.query(Board).filter(Board.id == board_id).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    if board.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this board")

    db.delete(board)
    db.commit()
