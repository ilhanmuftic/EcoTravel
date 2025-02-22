import logging

logger = logging.getLogger(__name__)

class WrapperException(Exception):
    def __init__(self, error_key, detail=None):
        self.error_key = error_key
        self.detail = detail
        super().__init__(error_key)
