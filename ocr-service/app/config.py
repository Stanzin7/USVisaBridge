import os

APP_NAME = "Visa OCR Service"

API_KEY = os.getenv("OCR_API_KEY", "dev-secret-key")

MAX_FILE_SIZE_MB = 5
ALLOWED_TYPES = ["image/png", "image/jpeg"]

CONFIDENCE_THRESHOLD = 0.90
