from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from database import crud, models, schemas
from dependencies import get_db

router = APIRouter(prefix='/questions', tags=['questions'])


@router.post('/', response_model=schemas.Question)
async def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)) -> models.Question:
    """Creates a `Question` object with a given `QuestionCreate` schema.

    Args:
        `question` (schemas.QuestionCreate): A `schemas.QuestionCreate` object.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Question`: [description]
    """

    return await crud.create_question(db=db, question=question)
