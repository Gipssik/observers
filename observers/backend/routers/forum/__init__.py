from fastapi import APIRouter

from . import questions, tags

router = APIRouter(prefix='/forum')

router.include_router(questions.router)
router.include_router(tags.router)
