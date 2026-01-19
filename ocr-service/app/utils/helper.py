from datetime import datetime
def build_form_response(parsed: dict) -> dict:
    meta = parsed.get("meta", {}) or {}
    available_slots = parsed.get("available_slots") or []

    return {
        # always user-entered
        "visa_type": None,

        # normalize location
        "consulate": normalize_consulate(parsed.get("location")),

        # dates (already ISO, just format)
       "earliest_available_date": parsed.get("earliest_date"),

        # "latest_available_date": to_ddmmyyyy(parsed.get("latest_date")),

        # keep slots as-is OR flatten for UI
        "available_slots": [
            {
                "date": (slot.get("date")),
                "time": slot.get("time"),
                "count": slot.get("count"),
                "display": slot.get("display"),
                "source": slot.get("source"),
            }
            for slot in available_slots
        ] if available_slots else [],

        # aggregate count (for simple forms)
        "total_slots": parsed.get("total_slots"),

        # metadata
        "meta": {
            "sources": meta.get("sources", []),
            "confidence": meta.get("confidence", 0.0),
            "note": meta.get("note"),
        },
    }



def to_ddmmyyyy(date_iso: str | None) -> str | None:
    if not date_iso:
        return None
    return datetime.strptime(date_iso, "%Y-%m-%d").strftime("%d/%m/%Y")


CONSULATE_MAP = {
    "HYDERABAD IW": "Hyderabad",
    "DELHI": "Delhi",
    "MUMBAI": "Mumbai",
    "CHENNAI": "Chennai",
    "KOLKATA": "Kolkata",
}


def normalize_slots(total_slots: int | None) -> int | None:
    return total_slots if total_slots and total_slots > 0 else None


def normalize_consulate(raw: str | None) -> str | None:
    if not raw:
        return None
    return CONSULATE_MAP.get(raw.upper(), raw.title())