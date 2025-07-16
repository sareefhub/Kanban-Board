from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Notification
from app.schemas.notification_schema import NotificationOut
from app.core.auth import get_current_user

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("/", response_model=list[NotificationOut])
def list_notifications(current=Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Notification).filter_by(user_id=current.id).all()

@router.patch("/{notif_id}/read", response_model=NotificationOut)
def mark_read(notif_id: int, current=Depends(get_current_user), db: Session = Depends(get_db)):
    n = db.query(Notification).get(notif_id)
    if not n or n.user_id != current.id:
        raise HTTPException(status_code=404, detail="Notification not found")
    n.is_read = True
    db.commit(); db.refresh(n)
    return n
