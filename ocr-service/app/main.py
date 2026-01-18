from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.ocr import router as ocr_router
from paddleocr import PaddleOCR

paddle_ocr = PaddleOCR(
    lang="en",
    use_angle_cls=False,
    
)
app = FastAPI(title="Visa-Grade OCR Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ocr_router, prefix="/ocr", tags=["OCR"])
# app.include_router(ocr_router)
@app.get("/health")
def health():
    return {"status": "ok"}
@app.on_event("startup")
def warm_ocr():
    import numpy as np
    dummy = np.zeros((200, 200, 3), dtype="uint8")
    paddle_ocr.ocr(dummy)
