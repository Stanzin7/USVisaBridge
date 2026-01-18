from datetime import datetime
def build_form_response(parsed: dict) -> dict:
    return {
        "visa_type": None,  # always user input
        "consulate": normalize_consulate(parsed.get("location")),
        "earliest_available_date": to_ddmmyyyy(parsed.get("earliest_date")),
        "latest_available_date": to_ddmmyyyy(parsed.get("latest_date")),
        "available_slots": normalize_slots(parsed.get("total_slots")),
        "meta": {
            "source": parsed.get("meta", {}).get("source"),
            "confidence": parsed.get("meta", {}).get("confidence"),
            "note": (
                "Only earliest available date detected"
                if parsed.get("latest_date") is None
                else None
            ),
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