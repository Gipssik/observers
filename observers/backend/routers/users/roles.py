from typing import Optional
from fastapi import APIRouter, Depends, status
from fastapi.responses import Response
from sqlalchemy.orm import Session

from database import crud, schemas, models
from dependencies import get_db


router = APIRouter(prefix='/roles', tags=['roles'])


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


@router.get('/{role_id}/', response_model=schemas.Role)
def get_role(role_id: int, db: Session = Depends(get_db)) -> models.Role:
    """Gets a `Role` object from the database by `role_id` and returns it to the client.

    Args:
        `role_id` (int): A `Role` object id.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Role`: A new `Role` object.
    """

    return crud.get_object(cls=models.Role, db=db, object_id=role_id)


@router.delete('/{role_id}/')
def delete_role(role_id: int, db: Session = Depends(get_db)) -> Response:
    """Deletes a role by a given `role_id`.

    Args:
        `role_id` (int): `Role`'s id.
        `db` (Session, optional): Database connection.

    Returns:
        `Response`: No content response.
    """

    crud.delete_object(cls=models.Role, db=db, object_id=role_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch('/{role_id}/', response_model=schemas.Role)
def update_role(role_id: int, role: schemas.RoleUpdate, db: Session = Depends(get_db)) -> schemas.Role:
    """Updates `Role` object by given `role_id` and `role` schema and returns it.

    Args:
        `role_id` (int): `Role` object's id.
        `role` (schemas.RoleUpdate): Pydantic role schema.
        `db` (Session, optional): Database connection.

    Returns:
        `schemas.Role`: Updated `Role` object.
    """

    return crud.update_role(db=db, role_id=role_id, role=role)
