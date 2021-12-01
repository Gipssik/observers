from typing import Optional, Union
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from database import crud, schemas, models
from dependencies import get_db


router = APIRouter(prefix='/roles', tags=['roles'])


@router.post('/', response_model=schemas.Role)
def create_role(role: schemas.RoleCreate, db: Session = Depends(get_db)) -> models.Role:
    """Creates a `Role` object with a given `role` schema and returns it to the client.

    Args:
        `role` (schemas.RoleCreate): A `schemas.RoleCreate` object.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Role`: A new `Role` object.
    """

    return crud.create_role(db=db, role=role)


@router.get('/', response_model=list[schemas.Role])
def get_roles(skip: Optional[int] = 0, limit: Optional[int] = 100, db: Session = Depends(get_db)) -> list[models.Role]:
    """Gets all `Roles` from database in range [`skip`:`skip+limit`] and returns them to the client.

    Args:
        `skip` (Optional[int], optional): How many objects to skip. Defaults to 0.
        `limit` (Optional[int], optional): Maximum amount of objects. Defaults to 100.
        `db` (Session, optional): Database connection.

    Returns:
        `list[models.Role]`: A `list` of all `Role` objects.
    """

    return crud.get_objects(cls=models.Role, db=db, skip=skip, limit=limit)


@router.get('/{role_key}/', response_model=schemas.Role)
def get_role(role_key: Union[int, str], db: Session = Depends(get_db)) -> models.Role:
    """Gets a `Role` object from the database by `role_key` and returns it to the client.

    Args:
        `role_key` (int): A `Role` object id or title.
        `db` (Session, optional): Database connection.

    Raises:
        `HTTPException`: If an invalid `role_key` was given.

    Returns:
        `models.Role`: A new `Role` object.
    """

    if isinstance(role_key, int):
        return crud.get_object(cls=models.Role, db=db, object_id=role_key)
    if role_key.isalpha():
        return crud.get_role_by_title(db=db, title=role_key, raise_404=True)
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail='Unresolved type of role_key.'
    )


@router.patch('/{role_key}/', response_model=schemas.Role)
def update_role(role_key: Union[int, str], role: schemas.RoleUpdate, db: Session = Depends(get_db)) -> schemas.Role:
    """Updates `Role` object by given `role_key` and `role` schema and returns it.

    Args:
        `role_key` (int): `Role` object's id or title.
        `role` (schemas.RoleUpdate): Pydantic role schema.
        `db` (Session, optional): Database connection.
        
    Raises:
        `HTTPException`: If an invalid `role_key` was given.

    Returns:
        `schemas.Role`: Updated `Role` object.
    """

    if isinstance(role_key, int):
        return crud.update_role(db=db, role_id=role_key, role=role)
    elif role_key.isalpha():
        return crud.update_role_by_title(db=db, role_title=role_key, role=role)
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail='Unresolved role_key.'
    )


@router.delete('/{role_key}/')
def delete_role(role_key: Union[int, str], db: Session = Depends(get_db)) -> Response:
    """Deletes a role by a given `role_key`.

    Args:
        `role_key` (int): `Role`'s id or title.
        `db` (Session, optional): Database connection.
        
    Raises:
        `HTTPException`: If an invalid `role_key` was given.

    Returns:
        `Response`: No content response.
    """

    if isinstance(role_key, int):
        crud.delete_object(cls=models.Role, db=db, object_id=role_key)
    elif role_key.isalpha():
        crud.delete_role_by_title(db=db, title=role_key)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Unresolved role_key.'
        )

    return Response(status_code=status.HTTP_204_NO_CONTENT)
