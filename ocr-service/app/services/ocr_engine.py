import numpy as np
from PIL import Image
from paddleocr import PaddleOCR

paddle_ocr = PaddleOCR(
    lang="en",
    use_angle_cls=False,
    
)


def run_ocr(image: Image.Image) -> str:
    image = image.convert("RGB")

    img_np = np.array(image, dtype="uint8")
    result = paddle_ocr.ocr(img_np)

    if not result:
        return ""

    # PP-OCRv5 / PaddleX dict output
    if isinstance(result[0], dict) and "rec_texts" in result[0]:
        texts = [
            t.strip()
            for t in result[0]["rec_texts"]
            if isinstance(t, str) and t.strip()
        ]
        return "\n".join(texts)

    # Legacy PaddleOCR output
    texts = []
    for item in result[0]:
        try:
            text = item[1][0]
            if text.strip():
                texts.append(text.strip())
        except Exception:
            continue

    return "\n".join(texts)
