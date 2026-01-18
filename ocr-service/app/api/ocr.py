from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io
from app.services.ocr_engine import run_ocr
from app.services.parser import clean_lines, extract_visa_data

from app.utils.validators import validate_visa_screenshot
from app.services.cache import OCR_CACHE
from app.utils.image import resize_image, image_hash

router = APIRouter()

@router.post("/")
async def ocr_endpoint(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    image = resize_image(image)
    img_hash = image_hash(image)

    # Cache
    if img_hash in OCR_CACHE:
        return OCR_CACHE[img_hash]
    raw_text = run_ocr(image)
    lines = clean_lines(raw_text)

    data = extract_visa_data(lines)

    # Visa screenshot validation
    if not validate_visa_screenshot(raw_text, lines):
        return {
            "success": False,
            "error_code": "INVALID_SCREENSHOT",
            "message": "Please upload a valid visa appointment screenshot"
        }

    # data = extract_form_fields(lines)

    response = {
        "success": True,
        "raw_text": raw_text,
        "form_data": data
    }

    OCR_CACHE[img_hash] = response
    return response
