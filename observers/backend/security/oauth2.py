from sqlalchemy.orm import Session

from . import hashing
from database.crud import get_user_by_username


async def authenticate_user(db: Session, username: str, password: str):
    user = await get_user_by_username(db, username)
    if not user:
        return False
    if not await hashing.verify_password(password, user.password):
        return False
    return user



