from typing import Union
from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm.session import Session

from database import crud, models, schemas
from dependencies import get_db

router = APIRouter(prefix='/tags', tags=['tags'])


@router.post('/', response_model=schemas.Tag)
def create_tag(tag: schemas.TagCreate, db: Session = Depends(get_db)) -> models.Tag:
    return crud.create_tag(db=db, tag=tag)
