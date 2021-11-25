import datetime
from typing import ForwardRef, List, Optional

from pydantic import BaseModel, EmailStr

User = ForwardRef('User')
Notification = ForwardRef('Notification')
Question = ForwardRef('Question')
Comment = ForwardRef('Comment')


class RoleBase(BaseModel):
    title: str


class RoleCreate(RoleBase):
    pass


class Role(RoleBase):
    id: int
    users: list[User] = []

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
    questions: list[Question] = []
    notifications: list[Notification] = []

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
    questions: list[Question] = []

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
    tags: list[TagBase] = []
    comments: list[Comment] = []

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


Role.update_forward_refs()
User.update_forward_refs()
Tag.update_forward_refs()
Question.update_forward_refs()
