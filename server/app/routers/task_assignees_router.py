from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import TaskAssignee, Task
from app.schemas.task_assignee_schema import TaskAssigneeCreate, TaskAssigneeOut
from app.core.auth import get_current_user

router = APIRouter(prefix="/tasks/{task_id}/assignees", tags=["assignees"])

@router.post("/", response_model=TaskAssigneeOut, status_code=status.HTTP_201_CREATED)
def assign(task_id: int, data: TaskAssigneeCreate, current=Depends(get_current_user), db: Session = Depends(get_db)):
    if not db.query(Task).get(task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    a = TaskAssignee(task_id=task_id, user_id=data.user_id)
    db.add(a); db.commit(); db.refresh(a)
    return a

@router.delete("/{assignee_id}", status_code=status.HTTP_204_NO_CONTENT)
def unassign(task_id: int, assignee_id: int, current=Depends(get_current_user), db: Session = Depends(get_db)):
    a = db.query(TaskAssignee).get(assignee_id)
    if not a or a.task_id != task_id:
        raise HTTPException(status_code=404, detail="Assignee not found")
    db.delete(a); db.commit()
