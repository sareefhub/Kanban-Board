from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth_schema import LoginRequest, Token
from app.models import User
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(req: LoginRequest, db: Session = Depends(get_db)):
    exists = db.query(User).filter((User.email == req.email) | (User.username == req.username)).first()
    if exists:
        raise HTTPException(status_code=400, detail="User already exists")
    user = User(username=req.username, email=req.email, password_hash=get_password_hash(req.password))
    db.add(user); db.commit(); db.refresh(user)
    token = create_access_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter((User.email == req.email) | (User.username == req.username)).first()
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}
