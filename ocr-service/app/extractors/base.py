# app/extractors/base.py
from abc import ABC, abstractmethod

class BaseExtractor(ABC):
    @abstractmethod
    def extract(self, lines: list[str]) -> dict | None:
        """
        Return structured data or None if not applicable
        """
        pass
