from typing import Optional
from fastapi import APIRouter, Depends, status
from fastapi.responses import Response
from sqlalchemy.orm import Session

from database import crud, schemas, models
from dependencies import get_db


router = APIRouter(prefix='/notifications', tags=['notifications'])


@router.get('/', response_model=list[schemas.Notification])
def get_notifications(skip: Optional[int] = 0, limit: Optional[int] = 100, db: Session = Depends(get_db)) -> list[models.Notification]:
    """Gets all `Notifications` from database in range [`skip`:`skip+limit`] and returns them to the client.

    Args:
        `skip` (Optional[int], optional): How many objects to skip. Defaults to 0.
        `limit` (Optional[int], optional): Maximum amount of objects. Defaults to 100.
        `db` (Session, optional): Database connection.

    Returns:
        list[models.Notification]: A `list` of all `Notification` objects.
    """

    return crud.get_objects(cls=models.Notification, db=db, skip=skip, limit=limit)


@router.post('/', response_model=schemas.Notification)
def create_notification(notification: schemas.NotificationCreate, db: Session = Depends(get_db)) -> models.Notification:
    """Creates a `Notification` object with a given `notification` schema.

    Args:
        `notification` (schemas.NotificationCreate): A `schemas.NotificationCreate` object.
        `db` (Session, optional): [description]. Database connection.

    Returns:
        `models.Notification`: A new `Notification` object.
    """

    return crud.create_notification(db=db, notification=notification)


@router.get('/{user_id}/', response_model=list[schemas.Notification])
def get_notification(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[models.Notification]:
    """Gets notifications by a given `user_id` in range[`skip`:`skip+limit`] and returns them to the client.

    Args:
        `user_id` (int): `User` object id.
        `skip` (int, optional): How many objects to skip. Defaults to 0.
        `limit` (int, optional): Maximum amount of objects. Defaults to 100.
        `db` (Session, optional): Database connection.

    Returns:
        `list[models.Notification]`: A list of `Notification` objects.
    """
    
    return crud.get_notifications_by_user_id(db=db, user_id=user_id, skip=skip, limit=limit)


@router.delete('/{key_id}/')
def delete_notification(key_id: int, by_user_id: bool = False, db: Session = Depends(get_db)) -> Response:
    """Deletes a notification(s) by a given `key_id`.

    Args:
        `key_id` (int): `Notification`'s or `User`'s id.
        `db` (Session, optional): Database connection.

    Returns:
        `Response`: No content response.
    """

    if by_user_id:
        crud.delete_notifications_by_user_id(db=db, user_id=key_id)
    else:
        crud.delete_object(cls=models.Notification, db=db, object_id=key_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch('/{notification_id}/', response_model=schemas.Notification)
def update_notification(
    notification_id: int,
    notification: schemas.NotificationUpdate,
    db: Session = Depends(get_db)
) -> models.Notification:
    """Updates `Notification` object by given `notification_id` and `notification` schema and returns it.

    Args:
        `notification_id` (int): `Notification` object's id.
        `notification` (schemas.UserUpdate): Pydantic notification schema.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Notification`: Updated `Notification` object.
    """

    return crud.update_object(
        cls=models.Notification,
        db=db,
        object_id=notification_id,
        schema_object=notification
    )
