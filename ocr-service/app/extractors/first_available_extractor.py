# app/extractors/first_available_extractor.py
import re
from app.extractors.base import BaseExtractor
from app.utils.date_utils import normalize_date, clean_display_date

TRIGGER_PHRASES = [
    "first available appointment",
    "first available date",
    "earliest available appointment"
]

class FirstAvailableExtractor(BaseExtractor):
    def extract(self, lines: list[str]) -> dict | None:
        for i, line in enumerate(lines):
            text = line.lower()

            if any(p in text for p in TRIGGER_PHRASES):
                # Look ahead for a date (next 1–3 lines)
                for j in range(1, 4):
                    if i + j >= len(lines):
                        break

                    date_line = lines[i + j].strip()
                    date = normalize_date(date_line)
                    if date:
                        return {
                            "slots": [
                                {
                                    "date": date,
                                    "time": None,
                                    "count": None,
                                    "display": clean_display_date(date_line),
                                    "source": "first_available"
                                }
                            ],
                            "source": "first_available",
                            "confidence": 0.6
                        }

        return None
