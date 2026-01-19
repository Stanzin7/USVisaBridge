# app/services/visa_parser.py
from datetime import datetime

from app.extractors.location_extractor import LocationExtractor
from app.extractors.table_extractor import TableAvailabilityExtractor
from app.extractors.first_available_extractor import FirstAvailableExtractor


class VisaParser:
    def __init__(self):
        self.location_extractor = LocationExtractor()
        self.availability_extractors = [
            TableAvailabilityExtractor(),
            FirstAvailableExtractor(),
        ]

    def parse(self, lines: list[str]) -> dict:
        result = {
            "location": None,
            "available_slots": [],
            "total_slots": None,
            "earliest_date": None,
            "latest_date": None,
            "meta": {
                "sources": [],
                "confidence": 0.0
            }
        }

        # -------------------
        # Location
        # -------------------
        loc = self.location_extractor.extract(lines)
        if loc:
            result["location"] = loc["location"]

        # -------------------
        # Availability (best extractor wins)
        # -------------------
        best = None
        for extractor in self.availability_extractors:
            data = extractor.extract(lines)
            if data and (best is None or data["confidence"] > best["confidence"]):
                best = data

        if best:
            result["available_slots"] = best["slots"]
            result["meta"]["sources"] = [best["source"]]
            result["meta"]["confidence"] = best["confidence"]

            # Dates
            dates = [s["date"] for s in best["slots"] if s.get("date")]
            if dates:
                result["earliest_date"] = min(dates)
                result["latest_date"] = max(dates) if len(dates) > 1 else None

            # Counts (only real integers)
            counts = [
                s["count"] for s in best["slots"]
                if isinstance(s.get("count"), int)
            ]
            result["total_slots"] = sum(counts) if counts else None

        return result

    # -------------------
    # Helpers
    # -------------------

    def _normalize_slot(self, slot: dict, source: str) -> dict:
        """
        Ensure every slot has a consistent structure.
        """
        return {
            "date": slot["date"],
            "time": slot.get("time"),
            "display": slot.get("display"),
            "count": slot.get("count"),
            "source": source,
        }

    def _slot_datetime(self, slot: dict) -> datetime | None:
        """
        Convert slot to datetime for ordering.
        """
        try:
            if slot.get("time"):
                return datetime.strptime(
                    f'{slot["date"]} {slot["time"]}', "%Y-%m-%d %H:%M"
                )
            return datetime.strptime(slot["date"], "%Y-%m-%d")
        except Exception:
            return None
