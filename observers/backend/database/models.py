import datetime

from sqlalchemy import Column, DateTime, Integer, String, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship

from .db import Base


tag_question = Table('tag_question', Base.metadata,
                     Column('tag_id', ForeignKey('tags.id'), primary_key=True, index=True),
                     Column('question_id', ForeignKey('questions.id'), primary_key=True, index=True)
)


class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False, unique=True)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    date_created = Column(DateTime, nullable=False, default=datetime.datetime.now)
    profile_image = Column(String, nullable=False, default='default.jpg')
    role_id = Column(Integer, ForeignKey('roles.id'))

    role = relationship('Role', backref='users')


class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    question_id = Column(Integer, ForeignKey('questions.id'))

    user = relationship('User', backref='notifications')
    question = relationship('Question', backref='notifications')


class Tag(Base):
    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, unique=True)

    questions = relationship('Question', secondary=tag_question, backref='tags')


class Question(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, unique=True)
    content = Column(String, nullable=False)
    date_created = Column(DateTime, nullable=False, default=datetime.datetime.now)
    views = Column(Integer, nullable=False, default=0)
    author_id = Column(Integer, ForeignKey('users.id'))

    author = relationship('User', backref='questions')


class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    date_created = Column(DateTime, nullable=False, default=datetime.datetime.now)
    rating = Column(Integer, nullable=False, default=0)
    is_answer = Column(Boolean, nullable=False, default=False)
    author_id = Column(Integer, ForeignKey('users.id'))
    question_id = Column(Integer, ForeignKey('questions.id'))

    author = relationship('User', backref='comments')
    question = relationship('Question', backref='comments')


class Article(Base):
    __tablename__ = 'articles'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    date_created = Column(DateTime, nullable=False, default=datetime.datetime.now)
    likes = Column(Integer, nullable=False, default=0)
    dislikes = Column(Integer, nullable=False, default=0)
