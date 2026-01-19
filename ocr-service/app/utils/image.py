# app/utils/image.py
import hashlib
from PIL import Image

MAX_WIDTH = 1024

def resize_image(image: Image.Image) -> Image.Image:
    if image.width > MAX_WIDTH:
        ratio = MAX_WIDTH / image.width
        image = image.resize(
            (MAX_WIDTH, int(image.height * ratio))
        )
    return image

def image_hash(image: Image.Image) -> str:
    return hashlib.md5(image.tobytes()).hexdigest()
