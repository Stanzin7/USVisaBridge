# app/services/visa_parser.py
from app.extractors.location_extractor import LocationExtractor
from app.extractors.table_extractor import TableAvailabilityExtractor
from app.extractors.first_available_extractor import FirstAvailableExtractor

class VisaParser:
    def __init__(self):
        self.location_extractor = LocationExtractor()
        self.availability_extractors = [
            TableAvailabilityExtractor(),
            FirstAvailableExtractor()
        ]

    def parse(self, lines: list[str]) -> dict:
        result = {
            "location": None,
            "available_slots": [],
            "total_slots": None,
            "earliest_date": None,
            "latest_date": None,
            "meta": {}
        }

        # Location
        loc = self.location_extractor.extract(lines)
        if loc:
            result["location"] = loc["location"]

        # Availability (pick best confidence)
        best = None
        for extractor in self.availability_extractors:
            data = extractor.extract(lines)
            if data and (best is None or data["confidence"] > best["confidence"]):
                best = data

        if best:
            result["available_slots"] = best["slots"]
            result["meta"]["source"] = best["source"]
            result["meta"]["confidence"] = best["confidence"]

            counts = [s.get("count", 0) for s in best["slots"]]
            if any(counts):
                result["total_slots"] = sum(counts)

            dates = [s["date"] for s in best["slots"]]
            result["earliest_date"] = min(dates)
            result["latest_date"] = max(dates) if len(dates) > 1 else None

        return result
