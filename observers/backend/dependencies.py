import re

from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from database.db import SessionLocal
from security import security_token, schemas
from database.crud import get_user_by_username, get_user_by_email


def get_db():
    """
    Returns a new database session.

    :return: A new database session.
    """

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_by_username_or_email(db: Session, username: str):
    return await get_user_by_email(db, email=username)\
        if re.fullmatch(r'^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$', username)\
        else await get_user_by_username(db, username=username)


async def get_current_user(user_token: str = Depends(security_token.oauth2_scheme), db: Session = Depends(get_db)):
    """
    Returns a current user if client is logged in. Otherwise, raises error.

    :param user_token: User jwt as a string.
    :param db: Database connection.
    :return: A current user.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(user_token, security_token.SECRET_KEY, algorithms=[security_token.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = await get_user_by_username_or_email(db=db, username=username)

    if user is None:
        raise credentials_exception
    return user
