# app/extractors/table_extractor.py
import re
from app.extractors.base import BaseExtractor
from app.utils.date_utils import normalize_date, clean_display_date

TIME_RE = re.compile(r"^\d{1,2}:\d{2}$")
COUNT_RE = re.compile(r"^\d+$")

MIN_VALID_COUNT = 20  # avoids calendar noise

class TableAvailabilityExtractor(BaseExtractor):
    def extract(self, lines: list[str]) -> dict | None:
        slots = []
        used_indices = set()

        # -------------------------------
        # FORMAT A & B: Time → Date → (Count)
        # -------------------------------
        for i in range(len(lines) - 1):
            time = lines[i].strip()
            date_line = lines[i + 1].strip()

            if TIME_RE.match(time):
                date = normalize_date(date_line)
                if not date:
                    continue

                count = 1
                if i + 2 < len(lines) and COUNT_RE.match(lines[i + 2].strip()):
                    count_val = int(lines[i + 2].strip())
                    if count_val >= MIN_VALID_COUNT:
                        count = count_val
                        used_indices.update({i, i + 1, i + 2})
                        next_i = i + 3
                    else:
                        used_indices.update({i, i + 1})
                        next_i = i + 2
                else:
                    used_indices.update({i, i + 1})
                    next_i = i + 2

                slots.append({
                    "date": date,
                    "time": time,
                    "count": count,
                    "display": f"{clean_display_date(date_line)} {time}",
                    "source": "table_time"
                })

        # -------------------------------
        # FORMAT C: Date → Count (no time)
        # -------------------------------
        for i in range(len(lines) - 1):
            if i in used_indices:
                continue

            date_line = lines[i].strip()
            count_line = lines[i + 1].strip()

            date = normalize_date(date_line)
            if not date:
                continue

            if COUNT_RE.match(count_line):
                count = int(count_line)
                if count < MIN_VALID_COUNT:
                    continue

                slots.append({
                    "date": date,
                    "time": None,
                    "count": count,
                    "display": clean_display_date(date_line),
                    "source": "table_date"
                })

        if not slots:
            return None

        return {
            "slots": slots,
            "source": "table",
            "confidence": (
                0.95 if any(s["time"] for s in slots)
                else 0.9
            )
        }
