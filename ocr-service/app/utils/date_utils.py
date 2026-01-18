# app/utils/date_utils.py
import re
from datetime import datetime

def normalize_date(text: str) -> str | None:
    if not text:
        return None

    text = text.strip()

    # Fix OCR corrupted year (20a20, 20S25, 20O26)
    text = re.sub(r'(20)\D(\d)', r'\1\2', text)

    # Remove punctuation
    text = text.rstrip(".,;:")

    try:
        return datetime.strptime(text, "%A %B %d, %Y").strftime("%Y-%m-%d")
    except ValueError:
        return None


def clean_display_date(text: str) -> str:
    if not text:
        return text

    text = re.sub(r'(20)\D(\d)', r'\1\2', text)
    return text.strip().rstrip(".,;:")
