import jwt
import time
from app.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_SECONDS


def create_access_token(payload: dict) -> str:
    payload = payload.copy()
    payload["exp"] = int(time.time()) + JWT_EXPIRE_SECONDS
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
