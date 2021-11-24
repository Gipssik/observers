from sqlalchemy.orm import Session

from . import hashing

from dependencies import get_user_by_username_or_email


async def authenticate_user(db: Session, username: str, password: str):
    user = await get_user_by_username_or_email(db=db, username=username)
    if not user:
        return False
    if not await hashing.verify_password(password, user.password):
        return False
    return user



