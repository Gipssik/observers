from fastapi import HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from . import models, schemas
from security import hashing


async def create_role(db: Session, role: schemas.RoleCreate):
    """
    Creates a Role with a given Role schema.

    :param db: Database connection.
    :param role: Role Pydantic model.
    :return: A new Role
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


async def get_role(db: Session, role_id: int):
    """
    Returns a Role by role_id.

    :param db: Database connection.
    :param role_id: Role's id.
    :return: Role model object.
    """

    role = db.query(models.Role).get(role_id)
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role with this id doesn't exist."
        )

    return role


async def get_roles(db: Session, skip: int = 0, limit: int = 100):
    """
    Returns all Roles in range[skip:skip+limit].

    :param db: Database connection.
    :param skip: Integer number of how many roles you need to skip.
    :param limit: Integer maximum number of how many roles you need to get.
    :return: All Role model objects.
    """

    r = db.query(models.Role).offset(skip).limit(limit).all()
    return r


async def create_user(db: Session, user: schemas.UserCreate):
    """
    Creates a User with a given User schema.

    :param db: Database connection.
    :param user: User Pydantic model.
    :return: A new User.
    """

    if db.query(models.User).filter(
        or_(
            models.User.username == user.username,
            models.User.email == user.email
        )
    ).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this username or email already exists."
        )

    if not db.query(models.Role).get(user.role_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role with this id does not exist."
        )

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


async def get_user(db: Session, user_id: int):
    """
    Returns a User by user_id.

    :param db: Database connection.
    :param user_id: User's id.
    :return: User model object.
    """

    return db.query(models.User).get(user_id)


async def get_users(db: Session, skip: int = 0, limit: int = 100):
    """
    Returns all Users in range[skip:skip+limit].

    :param db: Database connection.
    :param skip: Integer number of how many users you need to skip.
    :param limit: Integer maximum number of how many users you need to get.
    :return: All User model objects.
    """

    return db.query(models.User).offset(skip).limit(limit).all()


async def get_user_by_username(db: Session, username: str):
    """
    Returns a User by username.

    :param db: Database connection.
    :param username: String value of User's username.
    :return: A User by username.
    """

    return db.query(models.User).filter(models.User.username == username).first()


async def get_user_by_email(db: Session, email: str):
    """
    Returns a User by email.

    :param db: Database connection.
    :param email: String value of User's email.
    :return: A User by email.
    """

    return db.query(models.User).filter(models.User.email == email).first()
