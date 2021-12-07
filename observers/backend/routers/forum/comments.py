from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm.session import Session

from database import crud, models, schemas
from dependencies import get_db

router = APIRouter(prefix='/comments', tags=['comments'])


@router.post('/', response_model=schemas.Comment)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)) -> models.Comment:
    """Creates a `Comment` object with a given `CommentCreate` schema.

    Args:
        `comment` (schemas.QuestionCreate): A `schemas.CommentCreate` object.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Comment`: `Comment` object.
    """

    return crud.create_comment(db=db, comment=comment)


@router.get('/', response_model=list[schemas.Comment])
def get_comments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[models.Comment]:
    """Gets all `Comments` from database in range [`skip`:`skip+limit`] and returns them to the client.

    Args:
        `skip` (Optional[int], optional): How many objects to skip. Defaults to 0.
        `limit` (Optional[int], optional): Maximum amount of objects. Defaults to 100.
        `db` (Session, optional): Database connection.

    Returns:
        `list[models.Comment]`: A `list` of all `Comment` objects.
    """

    return crud.get_objects(cls=models.Comment, db=db, skip=skip, limit=limit)


@router.get('/{question_id}/', response_model=list[schemas.Comment])
def get_comments_by_question(question_id: int, db: Session = Depends(get_db)) -> list[models.Comment]:
    """Gets all `Comments` with `question_id` from database and returns them to the client.

    Args:
        `question_id` (int): `Question` object's id.
        `db` (Session, optional): Database connection.

    Returns:
        `list[models.Comment]`: List of `Comment` objects.
    """

    return crud.get_comments_by_question_id(db=db, question_id=question_id)


@router.patch('/{comment_id}/', response_model=schemas.Comment)
def update_comment(comment_id: int, comment: schemas.CommentUpdate, db: Session = Depends(get_db)) -> models.Comment:
    """Updates `Comment` object by `comment_id`.

    Args:
        `comment_id` (int): `Comment` object's id.
        `comment` (schemas.CommentUpdate): `CommentUpdate` schema.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Comment`: `Comment` object.
    """

    return crud.update_object(cls=models.Comment, db=db, object_id=comment_id, schema_object=comment)


@router.delete('/{comment_id}/')
def delete_question(comment_id: int, db: Session = Depends(get_db)) -> Response:
    """Deletes a comment by a given `comment_id`.

    Args:
        `comment_id` (int): `Comment`'s id.
        `db` (Session, optional): Database connection.

    Raises:
        `HTTPException`: If an invalid `comment_id` was given.

    Returns:
        `Response`: No content response.
    """

    crud.delete_object(cls=models.Comment, db=db, object_id=comment_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
