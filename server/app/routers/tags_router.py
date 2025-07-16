from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import TaskTag, Tag
from app.schemas.tag_schema import TagCreate, TagOut
from app.core.auth import get_current_user

router = APIRouter(prefix="/tasks/{task_id}/tags", tags=["tags"])

@router.post("/", response_model=TagOut, status_code=status.HTTP_201_CREATED)
def add_tag(task_id: int, data: TagCreate, current=Depends(get_current_user), db: Session = Depends(get_db)):
    exists = db.query(TaskTag).filter_by(task_id=task_id, tag_id=data.tag_id).first()
    if exists:
        raise HTTPException(status_code=400, detail="Already tagged")
    assoc = TaskTag(task_id=task_id, tag_id=data.tag_id)
    db.add(assoc); db.commit()
    return db.query(Tag).get(data.tag_id)

@router.delete("/{tag_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_tag(task_id: int, tag_id: int, current=Depends(get_current_user), db: Session = Depends(get_db)):
    assoc = db.query(TaskTag).filter_by(task_id=task_id, tag_id=tag_id).first()
    if not assoc:
        raise HTTPException(status_code=404, detail="Tag association not found")
    db.delete(assoc); db.commit()
