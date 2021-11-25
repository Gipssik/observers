from fastapi import HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from .db import Base

from . import models, schemas
from security import hashing


async def get_object(cls: type, db: Session, object_id: int) -> Base:
    """Returns a `cls` object by `object_id`.

    Args:
        `cls` (type): Type of the object to get.
        `db` (Session): Database connection.
        `object_id` (int): Object's id.

    Raises:
        `HTTPException`: If object with this id does not exist.

    Returns:
        `Base`: `Base` model object.
    """

    object_db = db.query(cls).get(object_id)

    if not object_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'{cls.__name__.capitalize()} with this id does not exist.'
        )

    return object_db


async def get_objects(cls: type, db: Session, skip: int = 0, limit: int = 100) -> list[Base]:
    """Returns all `Base` objects in range[`skip`:`skip+limit`].

    Args:
        `cls` (type): Type of the objects to get.
        `db` (Session): Database connection.
        `skip` (int, optional): Integer number of how many users you need to skip. Defaults to 0.
        `limit` (int, optional): Integer maximum number of how many users you need to get. Defaults to 100.

    Returns:
        `list[Base]`: All `Base` model objects.
    """

    return db.query(cls).offset(skip).limit(limit).all()


async def delete_object(cls: type, db: Session, object_id: int) -> None:
    """Deletes object by a given `object_id`.

    Args:
        `cls` (type): Type of the object to delete.
        `db` (Session): Database connection.
        `object_id` (int): Object's id.

    Returns:
        `None`
    """

    object_db = await get_object(cls=cls, db=db, object_id=object_id)
    
    db.delete(object_db)
    db.commit()
    return None


async def create_role(db: Session, role: schemas.RoleCreate) -> models.Role:
    """Creates a model Role with a given `role` schema.

    Args:
        `db` (Session): Database connection.
        `role` (schemas.RoleCreate): Role Pydantic model.

    Raises:
        `HTTPException`: If there's no role with this `title`.

    Returns:
        `models.Role`: A new `Role`.
    """

    if db.query(models.Role).filter(models.Role.title == role.title).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role with this title already exists."
        )

    db_role = models.Role(title=role.title)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role


async def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    """Creates a User with a given `user` schema.

    Args:
        `db` (Session): Database connection.
        `user` (schemas.UserCreate): User Pydantic model.

    Raises:
        `HTTPException`: If there's a `user` with the same username or email.
        `HTTPException`: If there's no `role` with this `role_id`.

    Returns:
        `models.User`: A new `User`.
    """

    if db.query(models.User).filter(
        or_(models.User.username == user.username, models.User.email == user.email) ).first():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User with this username or email already exists."
        )

    await get_object(cls=models.Role, db=db, object_id=user.role_id)

    hashed_password = await hashing.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        role_id=user.role_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


async def get_user_by_username(db: Session, username: str) -> models.User:
    """Returns a User by `username`.

    Args:
        `db` (Session): Database connection.
        `username` (str): String value of User's `username`.

    Returns:
        `models.User`: A `User` by `username`.
    """

    return db.query(models.User).filter(models.User.username == username).first()


async def get_user_by_email(db: Session, email: str) -> models.User:
    """Returns a User by `email`.

    Args:
        `db` (Session): Database connection.
        `email` (str): String value of User's `email`.

    Returns:
        `models.User`: A User by `email`.
    """

    return db.query(models.User).filter(models.User.email == email).first()


async def create_notification(db: Session, notification: schemas.NotificationCreate) -> models.Notification:
    """Creates a `Notification` with a given schema.

    Args:
        `db` (Session): Database connection.
        `notification` (schemas.NotificationCreate): `schemas.NotificationCreate` object.

    Raises:
        HTTPException: If user with `user_id` does not exist.
        HTTPException: If question with `question_id` does not exist.

    Returns:
        models.Notification: A new `Notification` objects.
    """

    await get_object(cls=models.User, db=db, object_id=notification.user_id)
    await get_object(cls=models.Question, db=db, object_id=notification.question_id)

    notification_db = models.Notification(
        title=notification.title,
        user_id=notification.user_id,
        question_id=notification.question_id
    )

    db.add(notification_db)
    db.commit()
    db.refresh(notification_db)
    return notification_db

    
async def create_question(db: Session, question: schemas.QuestionCreate) -> models.Question:
    """Creates a `Question` object if `User` with a given `user_id` exists.

    Args:
        `db` (Session): Database connection.
        `question` (schemas.QuestionCreate): A `schemas.QuestionCreate` schema.

    Raises:
        `HTTPException`: If `User` with `user_id` does not exist.

    Returns:
        `models.Question`: A `Question` object.
    """
    
    await get_object(cls=models.User, db=db, object_id=question.author_id)
    
    question_db = models.Question(
        title=question.title,
        content=question.content,
        author_id=question.author_id
    )
    db.add(question_db)
    db.commit()
    db.refresh(question_db)
    return question_db
