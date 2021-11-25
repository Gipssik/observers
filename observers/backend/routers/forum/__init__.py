from fastapi import APIRouter

from . import questions

router = APIRouter(prefix='/forum')

router.include_router(questions.router)
