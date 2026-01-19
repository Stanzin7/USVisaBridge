from fastapi import HTTPException
from app.models.auth import OAuthUser
from app.core.security import create_access_token


def oauth_login_service(user: OAuthUser) -> dict:
    if not user.email:
        raise HTTPException(status_code=400, detail="Email required")

    token_payload = {
        "sub": user.email,
        "provider": user.provider,
        "pid": user.provider_id,
    }

    token = create_access_token(token_payload)

    return {
        "success": True,
        "token": token,
        "user": {
            "email": user.email,
            "name": user.name,
            "provider": user.provider,
        },
    }
