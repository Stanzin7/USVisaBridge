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
    text = raw_text.lower()

    keyword_groups = {
        "context": ["appointment", "schedule", "ofc", "interview"],
        "calendar": ["monday", "tuesday", "wednesday", "thursday",
                     "friday", "saturday", "sunday"],
        "availability": ["available", "time", "date"]
    }

    hits = 0
    for group in keyword_groups.values():
        if any(k in text for k in group):
            hits += 1

    # Strong date signal
    has_full_date = any(
        "," in l and any(m in l.lower() for m in [
            "january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ])
        for l in lines
    )

    return hits >= 2 and has_full_date




