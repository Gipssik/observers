from fastapi import FastAPI

from database import models
from database.db import engine
from security import router as security_router
from routers import router

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(router)
app.include_router(security_router.router)
