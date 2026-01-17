import re

MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

YEAR_REGEX = re.compile(r"(19|20)\d{2}")

def parse_calendar(text: str) -> list[dict]:
    lines = [l.strip() for l in text.split("\n") if l.strip()]

    months = []
    current_month = None

    for line in lines:
        # ✅ Detect "Month YYYY" dynamically
        if any(m in line for m in MONTHS) and YEAR_REGEX.search(line):
            current_month = {
                "month": line,
                "selectable_dates": []
            }
            months.append(current_month)
            continue

        # ✅ Detect calendar day numbers
        if current_month and line.isdigit():
            day = int(line)
            if 1 <= day <= 31:
                current_month["selectable_dates"].append(day)

    # Deduplicate + sort
    for m in months:
        m["selectable_dates"] = sorted(set(m["selectable_dates"]))

    return months
