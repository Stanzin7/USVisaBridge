# app/utils/date_utils.py
import re
from datetime import datetime

# app/utils/date_utils.py
import re
from datetime import datetime

MONTHS = {
    "january": "01",
    "february": "02",
    "march": "03",
    "april": "04",
    "may": "05",
    "june": "06",
    "july": "07",
    "august": "08",
    "september": "09",
    "october": "10",
    "november": "11",
    "december": "12",
}


def normalize_date(text: str) -> str | None:
    if not text:
        return None
    t = text.lower()

    # Remove OCR junk punctuation (CRITICAL)
    t = re.sub(r"[.,]", "", t)

    # Extract year
    year_match = re.search(r"\b(20\d{2})\b", t)
    if not year_match:
        return None
    year = year_match.group(1)

    # Extract month
    month = None
    for name, num in MONTHS.items():
        if name in t:
            month = num
            break
    if not month:
        return None

    # Extract day
    day_match = re.search(r"\b(\d{1,2})\b", t)
    if not day_match:
        return None
    day = day_match.group(1).zfill(2)

    return f"{year}-{month}-{day}"


def clean_display_date(text: str) -> str:
    if not text:
        return text

    text = re.sub(r"(20)\D(\d)", r"\1\2", text)
    return text.strip().rstrip(".,;:")
