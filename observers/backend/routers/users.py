from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import schemas, crud
from dependencies import get_current_user, get_db

router = APIRouter(prefix='/users', tags=['users'])


@router.get('/roles/', response_model=list[schemas.Role])
async def get_roles(skip: Optional[int] = 0, limit: Optional[int] = 100, db: Session = Depends(get_db)):
    return await crud.get_roles(db=db, skip=skip, limit=limit)


@router.post('/roles/', response_model=schemas.Role)
async def create_role(role: schemas.RoleCreate, db: Session = Depends(get_db)):
    return await crud.create_role(db=db, role=role)


@router.get('/roles/{role_id}/', response_model=schemas.Role)
async def get_role(role_id: int, db: Session = Depends(get_db)):
    return await crud.get_role(db=db, role_id=role_id)


@router.get('/', response_model=list[schemas.User])
async def get_users(skip: Optional[int] = 0, limit: Optional[int] = 100, db: Session = Depends(get_db)):
    return await crud.get_users(db=db, skip=skip, limit=limit)


@router.post('/', response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return await crud.create_user(db=db, user=user)


@router.get('/{user_id}', response_model=schemas.User)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    return await crud.get_user(db=db, user_id=user_id)


@router.get("/me/", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user
