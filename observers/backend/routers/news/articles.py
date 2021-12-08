from typing import Union
from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm.session import Session

from database import crud, models, schemas
from dependencies import get_db

router = APIRouter(prefix='/articles', tags=['articles'])


@router.post('/', response_model=schemas.Article)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)) -> models.Article:
    """Creates an `Article` object with a given `ArticleCreate` schema.

    Args:
        `article` (schemas.ArticleCreate): A `schemas.ArticleCreate` object.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Article`: `Article` object.
    """

    return crud.create_article(db=db, article=article)


@router.get('/', response_model=list[schemas.Article])
def get_articles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[models.Article]:
    """Gets all `Articles` from database in range [`skip`:`skip+limit`] and returns them to the client.

    Args:
        `skip` (Optional[int], optional): How many objects to skip. Defaults to 0.
        `limit` (Optional[int], optional): Maximum amount of objects. Defaults to 100.
        `db` (Session, optional): Database connection.

    Returns:
        `list[models.Article]`: A `list` of all `Article` objects.
    """

    return crud.get_objects(cls=models.Article, db=db, skip=skip, limit=limit)


@router.get('/{article_id}/', response_model=schemas.Article)
def get_article(article_id: int, db: Session = Depends(get_db)) -> models.Article:
    """Gets `Article` object by `article_id`.

    Args:
        `article_id` (Union[int, str]): `Article` object's id.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Article`: `Article` object.
    """

    return crud.get_object(cls=models.Article, db=db, object_id=article_id)


@router.patch('/{article_id}/', response_model=schemas.Article)
def update_article(article_id: int, article: schemas.ArticleUpdate, db: Session = Depends(get_db)) -> models.Article:
    """Updates `Article` object by `article_id`.

    Args:
        `article_id` (int): `Article` object's id.
        `article` (schemas.ArticleUpdate): `ArticleUpdate` schema.
        `db` (Session, optional): Database connection.

    Returns:
        `models.Article`: `Article` object.
    """

    return crud.update_object(cls=models.Article, db=db, object_id=article_id, schema_object=article)


@router.delete('/{article_id}/')
def delete_tag(article_id: int, db: Session = Depends(get_db)) -> Response:
    """Deletes a article by a given `article_id`.

    Args:
        `article_id` (int): `Article`'s id.
        `db` (Session, optional): Database connection.

    Returns:
        `Response`: No content response.
    """

    crud.delete_object(cls=models.Article, db=db, object_id=article_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
