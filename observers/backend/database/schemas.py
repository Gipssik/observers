import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class RoleBase(BaseModel):
    title: str


class RoleCreate(RoleBase):
    pass


class Role(RoleBase):
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: EmailStr
    role_id: int


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    date_created: datetime.datetime
    profile_image: Optional[str] = None

    class Config:
        orm_mode = True


class NotificationBase(BaseModel):
    title: str
    user_id: int
    question_id: int


class NotificationCreate(NotificationBase):
    pass


class Notification(NotificationBase):
    id: int

    class Config:
        orm_mode = True


class TagBase(BaseModel):
    title: str


class TagCreate(TagBase):
    pass


class Tag(TagBase):
    id: int

    class Config:
        orm_mode = True


class QuestionBase(BaseModel):
    title: str
    content: str
    author_id: int


class QuestionCreate(QuestionBase):
    pass


class Question(QuestionBase):
    id: int
    date_created: datetime.datetime
    views: int

    class Config:
        orm_mode = True


class CommentBase(BaseModel):
    content: str
    author_id: int
    question_id: int


class CommentCreate(CommentBase):
    pass


class Comment(CommentBase):
    id: int
    date_created: datetime.datetime
    rating: int
    is_answer: bool

    class Config:
        orm_mode = True


class ArticleBase(BaseModel):
    title: str


class ArticleCreate(ArticleBase):
    pass


class Article(ArticleBase):
    id: int
    date_created: datetime.datetime
    likes: int
    dislikes: int

    class Config:
        orm_mode = True
