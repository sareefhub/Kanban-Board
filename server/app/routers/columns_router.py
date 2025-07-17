from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import BoardColumn, Board
from app.schemas.column_schema import BoardColumnCreate, BoardColumnOut, BoardColumnUpdate
from app.core.auth import get_current_user

router = APIRouter(prefix="/boards/{board_id}/columns", tags=["columns"])

@router.get("/", response_model=list[BoardColumnOut])
def get_columns(board_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    columns = db.query(BoardColumn).filter(BoardColumn.board_id == board_id).all()
    if not columns:
        raise HTTPException(status_code=404, detail="No columns found for this board")
    return columns

@router.get("/{column_id}", response_model=BoardColumnOut)
def get_column(board_id: int, column_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    column = db.query(BoardColumn).filter(BoardColumn.id == column_id, BoardColumn.board_id == board_id).first()
    if not column:
        raise HTTPException(status_code=404, detail="Column not found")
    return column

@router.post("/", response_model=BoardColumnOut, status_code=status.HTTP_201_CREATED)
def create_column(board_id: int, data: BoardColumnCreate, current=Depends(get_current_user), db: Session = Depends(get_db)):
    board = db.query(Board).get(board_id)
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    col_data = data.dict()
    col_data.pop('board_id', None)
    col = BoardColumn(**col_data, board_id=board_id)
    db.add(col)
    db.commit()
    db.refresh(col)
    return col

@router.put("/{column_id}", response_model=BoardColumnOut)
def update_column(board_id: int, column_id: int, data: BoardColumnUpdate, current=Depends(get_current_user), db: Session = Depends(get_db)):
    col = db.query(BoardColumn).get(column_id)
    if not col or col.board_id != board_id:
        raise HTTPException(status_code=404, detail="Column not found")
    for k, v in data.dict().items():
        setattr(col, k, v)
    db.commit(); db.refresh(col)
    return col

@router.delete("/{column_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_column(board_id: int, column_id: int, current=Depends(get_current_user), db: Session = Depends(get_db)):
    col = db.query(BoardColumn).get(column_id)
    if not col or col.board_id != board_id:
        raise HTTPException(status_code=404, detail="Column not found")
    db.delete(col); db.commit()
