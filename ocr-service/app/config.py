import os

APP_NAME = "Visa OCR Service"

API_KEY = os.getenv("OCR_API_KEY", "dev-secret-key")

MAX_FILE_SIZE_MB = 5
ALLOWED_TYPES = ["image/png", "image/jpeg"]

CONFIDENCE_THRESHOLD = 0.90
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_SECONDS = 60 * 60 * 24  