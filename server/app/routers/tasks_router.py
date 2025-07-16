from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Task, BoardColumn
from app.schemas.task_schema import TaskCreate, TaskOut, TaskUpdate, TaskReorder
from app.core.auth import get_current_user

router = APIRouter(prefix="/columns/{column_id}/tasks", tags=["tasks"])

@router.post("/", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(column_id: int, data: TaskCreate, current=Depends(get_current_user), db: Session = Depends(get_db)):
    col = db.query(BoardColumn).get(column_id)
    if not col:
        raise HTTPException(status_code=404, detail="Column not found")
    t = Task(**data.dict(), column_id=column_id)
    db.add(t); db.commit(); db.refresh(t)
    return t

@router.put("/{task_id}", response_model=TaskOut)
def update_task(column_id: int, task_id: int, data: TaskUpdate, current=Depends(get_current_user), db: Session = Depends(get_db)):
    t = db.query(Task).get(task_id)
    if not t or t.column_id != column_id:
        raise HTTPException(status_code=404, detail="Task not found")
    for k, v in data.dict().items():
        setattr(t, k, v)
    db.commit(); db.refresh(t)
    return t

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(column_id: int, task_id: int, current=Depends(get_current_user), db: Session = Depends(get_db)):
    t = db.query(Task).get(task_id)
    if not t or t.column_id != column_id:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(t); db.commit()

@router.patch("/{task_id}/position", response_model=TaskOut)
def reorder_task(column_id: int, task_id: int, data: TaskReorder, current=Depends(get_current_user), db: Session = Depends(get_db)):
    t = db.query(Task).get(task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    t.position = data.position
    db.commit(); db.refresh(t)
    return t
