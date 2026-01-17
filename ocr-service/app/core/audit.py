import uuid
from datetime import datetime

def audit_log(status: str, confidence: float | None = None):
    log = {
        "request_id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat(),
        "status": status,
        "confidence": confidence,
    }
    print(log)  # replace with proper logger later
