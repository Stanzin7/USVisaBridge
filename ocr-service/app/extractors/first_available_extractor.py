# app/extractors/first_available_extractor.py
from app.extractors.base import BaseExtractor
from app.utils.date_utils import normalize_date, clean_display_date

class FirstAvailableExtractor(BaseExtractor):
    def extract(self, lines: list[str]) -> dict | None:
        for i, line in enumerate(lines):
            if "first available appointment" in line.lower():
                for j in range(i + 1, min(i + 5, len(lines))):
                    date = normalize_date(lines[j])
                    if date:
                        return {
                            "slots": [{
                                "date": date,
                                "display": clean_display_date(lines[j]),
                                "type": "first_available"
                            }],
                            "source": "first_available",
                            "confidence": 0.6
                        }
        return None
