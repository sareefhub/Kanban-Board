from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import BoardMember, BoardColumn, Task
from app.schemas.task_schema import TaskCreate, TaskOut
from app.schemas.user_schema import UserOut
from app.routers.auth import get_current_user

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(
    t_in: TaskCreate,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user),
):
    col = db.get(BoardColumn, t_in.column_id)
    if not col:
        raise HTTPException(status_code=404, detail="Column not found")
    membership = db.query(BoardMember).filter_by(
        board_id=col.board_id, user_id=current_user.id
    ).first()
    if not membership:
        raise HTTPException(status_code=403, detail="Not a member")
    task = Task(
        title=t_in.title,
        description=t_in.description,
        column_id=t_in.column_id,
        position=t_in.position,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@router.get("/column/{column_id}", response_model=List[TaskOut])
def list_tasks(
    column_id: int,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user),
):
    col = db.get(BoardColumn, column_id)
    if not col:
        raise HTTPException(status_code=404, detail="Column not found")
    membership = db.query(BoardMember).filter_by(
        board_id=col.board_id, user_id=current_user.id
    ).first()
    if not membership:
        raise HTTPException(status_code=403, detail="Not a member")
    return (
        db.query(Task)
        .filter_by(column_id=column_id)
        .order_by(Task.position)
        .all()
    )


@router.put("/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int,
    t_in: TaskCreate,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user),
):
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    membership = db.query(BoardMember).filter_by(
        board_id=task.column.board_id, user_id=current_user.id
    ).first()
    if not membership:
        raise HTTPException(status_code=403, detail="Not a member")
    for attr in ("title", "description", "position"):
        setattr(task, attr, getattr(t_in, attr))
    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user),
):
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    membership = db.query(BoardMember).filter_by(
        board_id=task.column.board_id, user_id=current_user.id
    ).first()
    if not membership:
        raise HTTPException(status_code=403, detail="Not a member")
    db.delete(task)
    db.commit()
