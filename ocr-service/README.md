# Visa Screenshot OCR – Auto-Fill Backend

This service allows users to upload a screenshot (for example, a visa appointment page) and automatically extract form-ready data such as location, selected date, and available slots.

It is designed specifically for screenshot-based form auto-fill, not full document OCR.

# What This Service Does

Accepts a screenshot image (PNG/JPG)

Reads visible text using OCR

Removes UI noise (calendar labels, symbols, junk)

Extracts only the data needed to auto-fill a form

Returns clean, structured JSON to the frontend

# High-Level Processing Flow
UploadFile (from frontend)
   ↓
Convert to PIL Image
   ↓
run_ocr(image)
   → raw_text (string)
   ↓
clean_ocr_lines(raw_text)
   → cleaned lines (list)
   ↓
parse_calendar(cleaned_lines)
   → structured JSON
   ↓
API response to frontend

# Project Structure
ocr-service/
├─ app/
│  ├─ main.py                # FastAPI entrypoint
│  ├─ api/
│  │  └─ ocr.py              # /ocr endpoint
│  ├─ services/
│  │  ├─ ocr_engine.py       # PaddleOCR logic
│  │  ├─ parser.py           # Clean + extract fields
│  │  └─ cache.py            # In-memory OCR cache
│  └─ utils/
│     └─ image.py            # Resize + hash helpers
├─ requirements.txt
├─ Dockerfile
├─ docker-compose.yml
└─ README.md

# Requirements

Python 3.10 (important – PaddleOCR is unstable on 3.13)

pip / conda

CPU only (no GPU required)

# Local Setup (Recommended)
Create & activate environment:
conda create -n ocr310 python=3.10
conda activate ocr310

# Install dependencies
pip install fastapi uvicorn pillow paddleocr python-multipart

# Start the server
uvicorn app.main:app --reload


Server will run at:

http://127.0.0.1:8000

# Health check

Open in browser:

http://127.0.0.1:8000/health


Expected response:

{ "status": "ok" }
# Test the OCR Endpoint
Using curl
curl -X POST http://127.0.0.1:8000/ocr \
  -F "file=@screenshot.png"

Swagger UI

Open:

http://127.0.0.1:8000/docs


You can upload an image directly from the browser.

# Example API Response
{
  "success": true,
  "raw_text": "Schedule OFC Appointment\nHYDERABAD IW\nMonday September 16, 2019\n236",
  "form_data": {
    "location": "HYDERABAD IW",
    "date": "Monday September 16, 2019",
    "available_slots": 236
  }
}

Performance Notes

Images are resized before OCR for speed

OCR results are cached in memory

Typical response time: 300–700 ms

Re-uploading the same screenshot is instant
# Restarting the Server
Soft restart
uvicorn app.main:app --reload

Hard restart (if stuck)
pkill -f uvicorn
uvicorn app.main:app --reload

# Docker (Production-Safe)
Build & run
docker compose up --build