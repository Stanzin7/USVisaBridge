from fastapi import UploadFile, HTTPException
from app.config import MAX_FILE_SIZE_MB, ALLOWED_TYPES



def validate_file(file: UploadFile):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Invalid file type")

    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)

    if size > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(400, "File too large")


def validate_visa_screenshot(raw_text: str, lines: list[str]) -> bool:
    keywords = ["appointment", "ofc", "visa", "interview", "available", "schedule"]

    text = raw_text.lower()
    keyword_hits = sum(1 for k in keywords if k in text)

    has_location = any(l.isupper() and 5 < len(l) < 30 for l in lines)
    has_date = any("20" in l and "," in l for l in lines)

    return keyword_hits >= 2 and has_location and has_date



