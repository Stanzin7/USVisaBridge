# ---- Base image ----
FROM python:3.10-slim

# ---- System deps ----
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# ---- Environment ----
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# PaddleOCR model cache location
ENV PADDLEOCR_HOME=/models

# ---- Working directory ----
WORKDIR /app

# ---- Install dependencies ----
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# ---- Copy app ----
COPY app ./app

# ---- Expose port ----
EXPOSE 8000

# ---- Start server ----
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
