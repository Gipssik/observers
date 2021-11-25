from datetime import datetime, timedelta
from typing import Optional

from fastapi.security import OAuth2PasswordBearer
from jose import jwt


SECRET_KEY = "538326bae1ce1fa25826e6681d360144606d6978b2820554ce019053a98407a0"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Creates access token with a given `data` and `expires_delta`.

    Args:
        `data` (dict): A `dict` where exists a key "sub" with value of username.
        `expires_delta` (Optional[timedelta], optional): Time of token expiration. Defaults to None.

    Returns:
        `str`: A Json Web Token.
    """

    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
