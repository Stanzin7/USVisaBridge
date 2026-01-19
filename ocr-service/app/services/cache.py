from cachetools import TTLCache

OCR_CACHE = TTLCache(
    maxsize=5000,     # max images
    ttl=60 * 60       # 1 hour
)
