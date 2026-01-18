from fastapi import APIRouter
from app.models.auth import OAuthUser
from app.services.auth_service import oauth_login_service

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/oauth-login")
def oauth_login(user: OAuthUser):
    """
    Receives verified user data from NextAuth
    Issues app-specific JWT
    """
    return oauth_login_service(user)
