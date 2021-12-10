from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from database.db import SessionLocal
from database import models
from security import security_token, schemas
from services import get_user_by_username_or_email


def get_db():
    """Returns a database `Session`.

    Yields:
        `Iterator[SessionLocal]`: A database connection.
    """

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_current_user(user_token: str = Depends(security_token.oauth2_scheme),
                           db: Session = Depends(get_db)) -> models.User:
    """Returns the current user if he passes authentication.

    Args:
        `user_token` (str, optional): User's token.
        `db` (Session, optional): Database connection.

    Raises:
        `HTTPException`: If there's no key `sub` in a given token.
        `HTTPException`: In case of JWTError.
        `HTTPException`: If there's no user with this username.

    Returns:
        models.User: A current user.
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

    user = get_user_by_username_or_email(db=db, username=token_data.username)

    if user is None:
        raise credentials_exception
    return user
