
from datetime import datetime
from fastapi import UploadFile
from .client import supabase 
from uuid import uuid4

def save_image_to_supabase(*, file_bytes: bytes, content_type: str):
    filename = f"screenshots/{uuid4()}.png"

    response = supabase.storage.from_("visa-screenshots").upload(
        path=filename,
        file=file_bytes,
        file_options={
            "contentType": content_type,  # must be str
        },
    )

    if isinstance(response, dict) and response.get("error"):
        raise RuntimeError(response["error"])

    return {
        "bucket": "visa-screenshots",
        "path": filename,
    }

