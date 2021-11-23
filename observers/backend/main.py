from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from dependencies import get_db
from db import models
from db.db import engine

models.Base.metadata.create_all(bind=engine)
app = FastAPI()


@app.get('/')
async def home(db: Session = Depends(get_db)):
    return 'hi'
