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

    # Must match at least 3 visa-related keywords
    return score >= 3

def fix_ocr_year(text: str) -> str:
    return re.sub(r'20[a-zA-Z]20', '2020', text)

def extract_location(lines: list[str]) -> str | None:
    for i, line in enumerate(lines):
        l = line.lower()
        if "location" in l or "iocation" in l:
            if i + 1 < len(lines):
                return lines[i + 1].strip()
    return None



def normalize_date(text: str) -> str | None:
    if not text:
        return None

    text = text.strip()

    # 1️⃣ Fix OCR-corrupted years generically
    # Replaces any non-digit inside a 4-digit year
    # Example: 20a20 → 2020, 20O26 → 2026
    text = re.sub(
        r'(20)(\D)(\d)',
        r'\1\3',
        text
    )

    # 2️⃣ Remove trailing punctuation
    text = text.rstrip(".,;:")

    # 3️⃣ Try strict parse
    try:
        dt = datetime.strptime(text, "%A %B %d, %Y")
        return dt.strftime("%Y-%m-%d")
    except ValueError:
        return None


# def extract_available_slots(lines: list[str]) -> list[dict]:
#     slots = []

#     for i, line in enumerate(lines):

#         # First Available Appointment pattern
#         if "first available appointment" in line.lower():
#             if i + 1 < len(lines):
#                 date_line = lines[i + 1]
#                 slots.append({
#                     "date": normalize_date(date_line),
#                     "display": date_line,
#                     "type": "first_available"
#                 })

#         # Slot count pattern - table format (e.g., "3", "6", "8 slots", "33 slots")
#         # Pattern 1: Standalone digit (table column "Available" with values like "3", "6")
#         # if line.isdigit():
#             count = int(line)
#             # Look for associated date in nearby lines
#             # Check previous line for date
#             if i > 0:
#                 prev_line = lines[i - 1]
#                 # Check if previous line contains a date
#                 if any(m in prev_line for m in MONTHS) or "," in prev_line and any(char.isdigit() for char in prev_line):
#                     date_normalized = normalize_date(prev_line)
#                     if date_normalized:
#                         slots.append({
#                             "date": date_normalized,
#                             "display": prev_line,
#                             "count": count,
#                             "type": "table_count"
#                         })
#             # Check next line for date (sometimes date comes after)
#             if i + 1 < len(lines):
#                 next_line = lines[i + 1]
#                 if any(m in next_line for m in MONTHS) or "," in next_line and any(char.isdigit() for char in next_line):
#                     date_normalized = normalize_date(next_line)
#                     if date_normalized:
#                         slots.append({
#                             "date": date_normalized,
#                             "display": next_line,
#                             "count": count,
#                             "type": "table_count"
#                         })

#         # Pattern 2: "X slots" format (e.g., "8 slots", "33 slots")
#         slot_match = re.search(r'(\d+)\s*slots?', line, re.IGNORECASE)
#         if slot_match:
#             count = int(slot_match.group(1))
#             # Look for date in nearby lines
#             for j in range(max(0, i - 3), min(len(lines), i + 4)):
#                 if j != i and any(m in lines[j] for m in MONTHS):
#                     date_normalized = normalize_date(lines[j])
#                     if date_normalized:
#                         slots.append({
#                             "date": date_normalized,
#                             "display": lines[j],
#                             "count": count,
#                             "type": "slots_text"
#                         })
#                         break

#         # Pattern 3: Large number after date line (e.g., "236" after "Monday September 16, 2019")
#         if line.isdigit() and int(line) > 50:
#             prev_line = lines[i - 1] if i > 0 else None
#             if prev_line and any(m in prev_line for m in MONTHS):
#                 date_normalized = normalize_date(prev_line)
#                 if date_normalized:
#                     slots.append({
#                         "date": date_normalized,
#                         "display": prev_line,
#                         "count": int(line),
#                         "type": "count"
#                     })

#     # Remove duplicates (same date + count combinations)
#     seen = set()
#     unique_slots = []
#     for slot in slots:
#         key = (slot.get("date"), slot.get("count"))
#         if key not in seen and key[0] is not None:  # Only if date is present
#             seen.add(key)
#             unique_slots.append(slot)

#     return unique_slots

def extract_available_slots(lines: list[str]) -> list[dict]:
    slots = []

    for i, line in enumerate(lines):
        if "first available appointment" in line.lower():
            for j in range(i + 1, min(i + 5, len(lines))):
                candidate = lines[j]
                date = normalize_date(candidate)
                if date:
                    slots.append({
                        "date": date,
                         "display": clean_display_date(candidate),
                        "type": "first_available"
                    })
                    break

    return slots
def clean_display_date(text: str) -> str:
    if not text:
        return text

    # Fix OCR-corrupted years (generic)
    text = re.sub(r'(20)\D(\d)', r'\1\2', text)

    # Remove trailing punctuation
    text = text.strip().rstrip(".,;:")

    return text
def extract_visa_data(lines: list[str]) -> dict:
    """
    Extracts visa appointment data from OCR lines.
    Returns location, dates, and slot counts.
    """
    slots = extract_available_slots(lines)
    
    # Calculate total slots (sum of all slot counts)
    total_slots = sum(slot.get("count", 0) for slot in slots if slot.get("count"))
    
    # Get earliest and latest dates from slots
    dates_with_slots = [slot.get("date") for slot in slots if slot.get("date")]
    earliest_date = min(dates_with_slots) if dates_with_slots else None
    latest_date = max(dates_with_slots) if dates_with_slots and len(dates_with_slots) > 1 else None
    
    return {
        "location": extract_location(lines),
        "available_slots": slots,
        "total_slots": total_slots if total_slots > 0 else None,
        "earliest_date": earliest_date,
        "latest_date": latest_date if latest_date != earliest_date else None
    }
