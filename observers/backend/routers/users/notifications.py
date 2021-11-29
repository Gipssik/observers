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


@router.get('/{notification_id}/', response_model=schemas.Notification)
def get_notification(notification_id: int, db: Session = Depends(get_db)) -> models.Notification:
    """Gets a `Notification` object from the database by `notification_id` and returns it to the client.

    Args:
        `notification_id` (int): A `Notification` object id.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Notification`: A new `Notification` object.
    """

    return crud.get_object(cls=models.Notification, db=db, object_id=notification_id)


@router.delete('/{notification_id}/')
def delete_notification(notification_id: int, db: Session = Depends(get_db)) -> Response:
    """Deletes a notification by a given `notification_id`.

    Args:
        `notification_id` (int): `Notification`'s id.
        `db` (Session, optional): Database connection.

    Returns:
        `Response`: No content response.
    """

    crud.delete_object(cls=models.Notification, db=db, object_id=notification_id)
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