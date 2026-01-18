# app/extractors/table_extractor.py
from app.extractors.base import BaseExtractor
from app.utils.date_utils import normalize_date, clean_display_date

class TableAvailabilityExtractor(BaseExtractor):
    def extract(self, lines: list[str]) -> dict | None:
        slots = []

        for i, line in enumerate(lines):
            date = normalize_date(line)
            if date and i + 1 < len(lines):
                next_line = lines[i + 1].strip()
                if next_line.isdigit() and int(next_line) > 50:
                    slots.append({
                        "date": date,
                        "display": clean_display_date(line),
                        "count": int(next_line),
                        "type": "table_available"
                    })

        if not slots:
            return None

        return {
            "slots": slots,
            "source": "table",
            "confidence": 0.95
        }
