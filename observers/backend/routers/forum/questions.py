from typing import Union
from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm.session import Session

from database import crud, models, schemas
from dependencies import get_db

router = APIRouter(prefix='/questions', tags=['questions'])


@router.post('/', response_model=schemas.Question)
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)) -> models.Question:
    """Creates a `Question` object with a given `QuestionCreate` schema.

    Args:
        `question` (schemas.QuestionCreate): A `schemas.QuestionCreate` object.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Question`: `Question` object.
    """

    a = crud.create_question(db=db, question=question)
    return a


@router.get('/', response_model=list[schemas.Question])
def get_questions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[models.Question]:
    """Gets all `Questions` from database in range [`skip`:`skip+limit`] and returns them to the client.

    Args:
        `skip` (Optional[int], optional): How many objects to skip. Defaults to 0.
        `limit` (Optional[int], optional): Maximum amount of objects. Defaults to 100.
        `db` (Session, optional): Database connection.

    Returns:
        `list[models.Question]`: A `list` of all `Question` objects.
    """

    return crud.get_objects(cls=models.Question, db=db, skip=skip, limit=limit)


@router.get('/{question_key}/', response_model=schemas.Question)
def get_question(question_key: Union[int, str], db: Session = Depends(get_db)) -> models.Question:
    """Gets `Question` object by `question_key`.

    Args:
        `question_key` (Union[int, str]): `Question` object's id or title.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Question`: `Question` object.
    """

    if isinstance(question_key, int):
        return crud.get_object(cls=models.Question, db=db, object_id=question_key)
    return crud.get_question_by_title(db=db, title=question_key)


@router.patch('/{question_id}/', response_model=schemas.Question)
def update_question(question_id: int, question: schemas.QuestionUpdate, db: Session = Depends(get_db)) -> models.Question:
    """Updates `Question` object by `question_id`.

    Args:
        `question_id` (int): `Question` object's id.
        `question` (schemas.QuestionUpdate): `QuestionUpdate` schema.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Question`: `Question` object.
    """

    return crud.update_question(db=db, question_id=question_id, question=question)


@router.delete('/{question_id}/')
def delete_question(question_id: int, db: Session = Depends(get_db)) -> Response:
    """Deletes a question by a given `question_id`.

    Args:
        `question_id` (int): `Question`'s id.
        `db` (Session, optional): Database connection.

    Raises:
        `HTTPException`: If an invalid `question_id` was given.

    Returns:
        `Response`: No content response.
    """

    crud.delete_object(cls=models.Question, db=db, object_id=question_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
