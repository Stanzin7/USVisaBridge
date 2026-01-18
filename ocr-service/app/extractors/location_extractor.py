# app/extractors/location_extractor.py
from app.extractors.base import BaseExtractor

class LocationExtractor(BaseExtractor):
    def extract(self, lines: list[str]) -> dict | None:
        for i, line in enumerate(lines):
            l = line.lower()
            if "location" in l or "iocation" in l:
                if i + 1 < len(lines):
                    return {
                        "location": lines[i + 1].strip(),
                        "confidence": 0.9
                    }
        return None
