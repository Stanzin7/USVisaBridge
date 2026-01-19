from pydantic import BaseModel


class OAuthUser(BaseModel):
    email: str
    name: str | None = None
    provider: str
    provider_id: str
