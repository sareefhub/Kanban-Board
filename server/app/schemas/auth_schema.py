from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: int | None = None

class LoginRequest(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    password: str
