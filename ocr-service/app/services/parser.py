import re
from datetime import datetime

MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
]

def clean_lines(text: str) -> list[str]:
    return [
        l.strip()
        for l in text.split("\n")
        if len(l.strip()) > 1
    ]

def validate_visa_screenshot(lines: list[str]) -> bool:
    required_keywords = [
        "ofc",
        "appointment",
        "interview location",
        "available",
        "select"
    ]

    joined = " ".join(lines).lower()
    score = sum(1 for k in required_keywords if k in joined)

    # ✅ must match at least 3 visa-related keywords
    return score >= 3


def extract_location(lines: list[str]) -> str | None:
    for i, line in enumerate(lines):
        if "location" in line.lower():
            if i + 1 < len(lines):
                return lines[i + 1]
    return None


def normalize_date(text: str) -> str | None:
    try:
        dt = datetime.strptime(text, "%A %B %d, %Y")
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return None


def extract_available_slots(lines: list[str]) -> list[dict]:
    slots = []

    for i, line in enumerate(lines):

        # ✅ First Available Appointment pattern
        if "first available appointment" in line.lower():
            if i + 1 < len(lines):
                date_line = lines[i + 1]
                slots.append({
                    "date": normalize_date(date_line),
                    "display": date_line,
                    "type": "first_available"
                })

        # ✅ Slot count pattern (e.g. 236)
        if line.isdigit() and int(line) > 50:
            prev_line = lines[i - 1] if i > 0 else None
            if prev_line and any(m in prev_line for m in MONTHS):
                slots.append({
                    "date": normalize_date(prev_line),
                    "count": int(line),
                    "type": "count"
                })

    return slots


def extract_visa_data(lines: list[str]) -> dict:
    """
    🔑 MAIN FUNCTION YOU ASKED ABOUT
    """
    return {
        "location": extract_location(lines),
        "available_slots": extract_available_slots(lines)
    }
