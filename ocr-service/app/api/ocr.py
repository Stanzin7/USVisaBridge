from fastapi import APIRouter, UploadFile, File ,HTTPException
import io
from PIL import Image, UnidentifiedImageError



from app.services.ocr_engine import run_ocr
from app.services.parser import clean_lines
from app.services.visa_parser import VisaParser
from app.utils.helper import build_form_response
from app.utils.validators import validate_visa_screenshot
from app.services.cache import OCR_CACHE
from app.utils.image import resize_image, image_hash

router = APIRouter()
parser = VisaParser()


@router.post("/")

@router.post("")
@router.post("/")
async def ocr_endpoint(file: UploadFile = File(None)):
    # No file at all
    if file is None:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "error_code": "NO_FILE",
                "message": "No file uploaded"
            }
        )

    #  Empty filename (common browser edge case)
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "error_code": "NO_FILE",
                "message": "No file selected"
            }
        )

    #  Wrong content type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "error_code": "INVALID_FILE_TYPE",
                "message": "Please upload a valid image file"
            }
        )

    # Read & decode image
    try:
        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail={
                    "success": False,
                    "error_code": "EMPTY_FILE",
                    "message": "Uploaded file is empty"
                }
            )

        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    except UnidentifiedImageError:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "error_code": "INVALID_IMAGE",
                "message": "Uploaded file is not a readable image"
            }
        )

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "error_code": "IMAGE_PROCESSING_ERROR",
                "message": str(e)
            }
        )

    #  Continue normal flow
    image = resize_image(image)
    img_hash = image_hash(image)

    if img_hash in OCR_CACHE:
        return OCR_CACHE[img_hash]

    return process_visa_screenshot(image)



def process_visa_screenshot(image):
    img_hash = image_hash(image)

    if img_hash in OCR_CACHE:
        return OCR_CACHE[img_hash]

    raw_text = run_ocr(image)
    lines = clean_lines(raw_text)

    # THIS is where non-visa images are rejected
    if not validate_visa_screenshot(raw_text ,lines):
        response = {
            "success": False,
            "error_code": "INVALID_SCREENSHOT",
            "message": "Please upload a valid visa appointment screenshot"
        }
        OCR_CACHE[img_hash] = response
        return response

    data = parser.parse(lines)

    response = {
        "success": True,
        "form_data":  build_form_response(data)
    }

    OCR_CACHE[img_hash] = response
    return response

