import cv2
import numpy as np
from PIL import Image

def preprocess(image: Image.Image) -> Image.Image:
    img = np.array(image)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

    gray = cv2.resize(
        gray, None,
        fx=1.2, fy=1.2,
        interpolation=cv2.INTER_CUBIC
    )

    return Image.fromarray(gray).convert("RGB")
