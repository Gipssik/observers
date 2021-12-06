from typing import Union
from fastapi import APIRouter, Depends
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
        `models.Question`: [description]
    """

    return crud.create_question(db=db, question=question)


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
