from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Board, BoardColumn, BoardMember, User
from app.schemas.column_schema import ColumnCreate, ColumnOut, ColumnUpdate
from app.routers.auth import get_current_user

router = APIRouter(prefix="/columns", tags=["columns"])


# ✅ CREATE
@router.post("/", response_model=ColumnOut, status_code=status.HTTP_201_CREATED)
def create_column(
    col_in: ColumnCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    board = db.get(Board, col_in.board_id)
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")

    membership = db.query(BoardMember).filter_by(
        board_id=col_in.board_id, user_id=current_user.id
    ).first()

    if not membership and board.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not permitted")

    column = BoardColumn(
        title=col_in.title,
        board_id=col_in.board_id,
        position=col_in.position,
    )
    db.add(column)
    db.commit()
    db.refresh(column)
    return column


# ✅ READ (List by board_id)
@router.get("/{board_id}", response_model=List[ColumnOut])
def list_columns(
    board_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    membership = db.query(BoardMember).filter_by(
        board_id=board_id, user_id=current_user.id
    ).first()

    board = db.get(Board, board_id)

    if not membership and (not board or board.owner_id != current_user.id):
        raise HTTPException(status_code=403, detail="Not a member")

    return (
        db.query(BoardColumn)
        .filter_by(board_id=board_id)
        .order_by(BoardColumn.position)
        .all()
    )


# ✅ UPDATE
@router.put("/{column_id}", response_model=ColumnOut)
def update_column(
    column_id: int,
    col_in: ColumnUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    column = db.get(BoardColumn, column_id)
    if not column:
        raise HTTPException(status_code=404, detail="Column not found")

    board = db.get(Board, column.board_id)
    membership = db.query(BoardMember).filter_by(
        board_id=column.board_id, user_id=current_user.id
    ).first()

    if not membership and board.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not permitted")

    column.title = col_in.title
    column.position = col_in.position
    db.commit()
    db.refresh(column)
    return column


# ✅ DELETE
@router.delete("/{column_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_column(
    column_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    column = db.get(BoardColumn, column_id)
    if not column:
        raise HTTPException(status_code=404, detail="Column not found")

    board = db.get(Board, column.board_id)
    membership = db.query(BoardMember).filter_by(
        board_id=column.board_id, user_id=current_user.id
    ).first()

    if not membership and board.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not permitted")

    db.delete(column)
    db.commit()
