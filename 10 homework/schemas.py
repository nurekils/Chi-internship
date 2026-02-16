from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: EmailStr

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None



class UserRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool

    model_config = ConfigDict(from_attributes=True)